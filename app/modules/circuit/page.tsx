"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Power,
  Trash2,
  Check,
  X,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

interface Component {
  id: string;
  type: string;
  x: number;
  y: number;
  value?: number;
  rotation?: number;
  connections?: string[]; // IDs of connected components
}

interface Wire {
  id: string;
  from: string;
  to: string;
  fromPort: "pos" | "neg";
  toPort: "pos" | "neg";
}

interface CircuitChallenge {
  id: number;
  name: string;
  description: string;
  target: {
    components: { type: string; count: number }[];
    voltage: number;
    current: number;
  };
  hint: string;
  wiring: string[]; // Step-by-step wiring instructions
  circuitType: "series" | "parallel"; // NEW: Define circuit type explicitly
}

export default function CircuitModule() {
  const { updateProgress, getLevelProgress } = useAuth();
  const [components, setComponents] = useState<Component[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [circuitPower, setCircuitPower] = useState(false);
  const [connecting, setConnecting] = useState<{
    id: string;
    port: "pos" | "neg";
  } | null>(null);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<number>(0);
  const [completedList, setCompletedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const levelProgress = getLevelProgress(8); // Level 8 = Circuit
  const isModuleCompleted = levelProgress?.completed || false;

  // Auto-start challenge mode on mount
  useEffect(() => {
    if (!showChallenge && completedChallenges === 0) {
      setShowChallenge(true);
      setCurrentChallenge(0);
    }
  }, []);

  const challenges: CircuitChallenge[] = [
    {
      id: 1,
      name: "Challenge 1: LED Sederhana",
      description:
        "Buat rangkaian LED dasar dengan 1 baterai, 1 resistor, dan 1 LED",
      target: {
        components: [
          { type: "battery", count: 1 },
          { type: "resistor", count: 1 },
          { type: "led", count: 1 },
        ],
        voltage: 9,
        current: 0.0158, // 9V / (470 + 100) ohm = exactly 0.0158 A (15.8mA)
      },
      hint: "🔌 Seri sederhana: Baterai (+) → Resistor → LED → Baterai (-)",
      circuitType: "series",
      wiring: [
        "1️⃣ Hubungkan Battery (+) ke Resistor (+)",
        "2️⃣ Hubungkan Resistor (-) ke LED (+)",
        "3️⃣ Hubungkan LED (-) ke Battery (-)",
        "4️⃣ Nyalakan Power untuk validasi",
      ],
    },
    {
      id: 2,
      name: "Challenge 2: Rangkaian Paralel",
      description: "Buat 2 LED menyala paralel dengan masing-masing resistor",
      target: {
        components: [
          { type: "battery", count: 1 },
          { type: "resistor", count: 2 },
          { type: "led", count: 2 },
        ],
        voltage: 9,
        current: 0.0316, // 2 branches * 0.0158 A = 0.0316 A (31.6mA)
      },
      hint: "💡 2 cabang paralel dari baterai, masing-masing: Resistor → LED",
      circuitType: "parallel",
      wiring: [
        "CABANG 1:",
        "1️⃣ Battery (+) → Resistor1 (+)",
        "2️⃣ Resistor1 (-) → LED1 (+)",
        "3️⃣ LED1 (-) → Battery (-)",
        "",
        "CABANG 2 (Paralel):",
        "4️⃣ Battery (+) → Resistor2 (+)  ⚠️ DARI BATTERY YANG SAMA!",
        "5️⃣ Resistor2 (-) → LED2 (+)",
        "6️⃣ LED2 (-) → Battery (-)  ⚠️ KE BATTERY YANG SAMA!",
        "7️⃣ Nyalakan Power untuk validasi",
      ],
    },
    {
      id: 3,
      name: "Challenge 3: Rangkaian dengan Switch",
      description: "Tambahkan saklar untuk mengontrol LED",
      target: {
        components: [
          { type: "battery", count: 1 },
          { type: "switch", count: 1 },
          { type: "resistor", count: 1 },
          { type: "led", count: 1 },
        ],
        voltage: 9,
        current: 0.0158, // Same as challenge 1 (15.8mA)
      },
      hint: "🔘 Baterai (+) → Switch → Resistor → LED → Baterai (-)",
      circuitType: "series",
      wiring: [
        "1️⃣ Battery (+) → Switch (+)",
        "2️⃣ Switch (-) → Resistor (+)",
        "3️⃣ Resistor (-) → LED (+)",
        "4️⃣ LED (-) → Battery (-)",
        "5️⃣ Nyalakan Power untuk validasi",
      ],
    },
    {
      id: 4,
      name: "Challenge 4: LED + Kapasitor",
      description: "Rangkaian LED dengan kapasitor sebagai penstabil tegangan",
      target: {
        components: [
          { type: "battery", count: 1 },
          { type: "resistor", count: 1 },
          { type: "capacitor", count: 1 },
          { type: "led", count: 1 },
        ],
        voltage: 9,
        current: 0.0158, // Same as challenge 1 (15.8mA)
      },
      hint: "⚡ Kapasitor paralel dengan LED untuk stabilisasi",
      circuitType: "series",
      wiring: [
        "JALUR UTAMA (Seri):",
        "1️⃣ Battery (+) → Resistor (+)",
        "2️⃣ Resistor (-) → LED (+)",
        "3️⃣ LED (-) → Battery (-)",
        "",
        "KAPASITOR (Paralel dengan LED):",
        "4️⃣ Resistor (-) → Capacitor (+)  ⚠️ TITIK YANG SAMA dengan LED (+)",
        "5️⃣ Capacitor (-) → Battery (-)  ⚠️ TITIK YANG SAMA dengan LED (-)",
        "6️⃣ Nyalakan Power untuk validasi",
      ],
    },
    {
      id: 5,
      name: "Challenge 5: Rangkaian Kompleks",
      description:
        "Buat rangkaian dengan 3 LED paralel, masing-masing dengan resistor",
      target: {
        components: [
          { type: "battery", count: 1 },
          { type: "resistor", count: 3 },
          { type: "led", count: 3 },
          { type: "switch", count: 1 },
        ],
        voltage: 9,
        current: 0.0474, // 3 branches * 0.0158 A = 0.0474 A (47.4mA)
      },
      hint: "🎯 Switch → 3 cabang paralel (masing-masing: Resistor + LED)",
      circuitType: "parallel",
      wiring: [
        "KONTROL:",
        "1️⃣ Battery (+) → Switch (+)",
        "",
        "CABANG 1:",
        "2️⃣ Switch (-) → Resistor1 (+)",
        "3️⃣ Resistor1 (-) → LED1 (+)",
        "4️⃣ LED1 (-) → Battery (-)",
        "",
        "CABANG 2 (Paralel):",
        "5️⃣ Switch (-) → Resistor2 (+)  ⚠️ DARI SWITCH YANG SAMA!",
        "6️⃣ Resistor2 (-) → LED2 (+)",
        "7️⃣ LED2 (-) → Battery (-)  ⚠️ KE BATTERY YANG SAMA!",
        "",
        "CABANG 3 (Paralel):",
        "8️⃣ Switch (-) → Resistor3 (+)  ⚠️ DARI SWITCH YANG SAMA!",
        "9️⃣ Resistor3 (-) → LED3 (+)",
        "🔟 LED3 (-) → Battery (-)  ⚠️ KE BATTERY YANG SAMA!",
        "1️⃣1️⃣ Nyalakan Power untuk validasi",
      ],
    },
  ];

  const tools = [
    {
      id: "battery",
      name: "Baterai",
      icon: "🔋",
      color: "from-green-500 to-teal-500",
      value: 9,
    },
    {
      id: "resistor",
      name: "Resistor",
      icon: "🔶",
      color: "from-yellow-500 to-orange-500",
      value: 470,
    },
    {
      id: "led",
      name: "LED",
      icon: "💡",
      color: "from-red-500 to-pink-500",
      value: 2,
    },
    {
      id: "switch",
      name: "Saklar",
      icon: "🔘",
      color: "from-blue-500 to-cyan-500",
      value: 0,
    },
    {
      id: "capacitor",
      name: "Kapasitor",
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      value: 100,
    },
    {
      id: "wire",
      name: "Kabel",
      icon: "〰️",
      color: "from-gray-400 to-gray-600",
      value: 0,
    },
  ];

  // Calculate circuit voltage and current
  useEffect(() => {
    if (!circuitPower) {
      setVoltage(0);
      setCurrent(0);
      return;
    }

    const batteries = components.filter((c) => c.type === "battery");
    const resistors = components.filter((c) => c.type === "resistor");
    const leds = components.filter((c) => c.type === "led");
    const switches = components.filter((c) => c.type === "switch");

    if (batteries.length === 0) return;

    const totalVoltage = batteries.reduce((sum, b) => sum + (b.value || 9), 0);

    // Calculate current based on challenge's circuit type
    let calculatedCurrent = 0;
    const currentChallengeType =
      challenges[currentChallenge]?.circuitType || "series";

    if (
      currentChallengeType === "parallel" &&
      resistors.length === leds.length &&
      resistors.length > 0
    ) {
      // PARALLEL circuit: each branch has 1 resistor + 1 LED
      // Total current = sum of all branch currents
      // Each branch: I = V / (R + LED_R)
      const branchResistance = 470 + 100; // resistor (470Ω) + LED internal (100Ω)
      const branchCurrent = totalVoltage / branchResistance;
      calculatedCurrent = branchCurrent * resistors.length; // I_total = I1 + I2 + I3 + ...

      console.log("🔀 PARALLEL Circuit:", {
        branches: resistors.length,
        branchResistance,
        branchCurrent: branchCurrent.toFixed(4),
        totalCurrent: calculatedCurrent.toFixed(4),
      });
    } else {
      // SERIES circuit (default)
      // Total current = V / R_total
      // R_total = R1 + R2 + ... + LED1 + LED2 + ...
      const totalResistance = resistors.reduce(
        (sum, r) => sum + (r.value || 470),
        0
      );
      const ledResistance = leds.length * 100;
      const totalR = totalResistance + ledResistance;
      calculatedCurrent = totalR > 0 ? totalVoltage / totalR : 0;

      console.log("➡️ SERIES Circuit:", {
        totalResistance,
        ledResistance,
        totalR,
        current: calculatedCurrent.toFixed(4),
      });
    }

    setVoltage(totalVoltage);
    setCurrent(calculatedCurrent);

    console.log("⚙️ Circuit State:", {
      power: circuitPower,
      voltage: totalVoltage.toFixed(2),
      current: calculatedCurrent.toFixed(4),
      components: components.length,
      showChallenge,
      challengeCompleted,
    });

    // Check challenge completion - use FRESH values from this calculation!
    if (showChallenge && !challengeCompleted) {
      console.log("🔄 Calling validation with FRESH values...");

      const challenge = challenges[currentChallenge];
      let allMatch = true;

      console.log("📊 Component Check:", {
        batteries: batteries.length,
        resistors: resistors.length,
        leds: leds.length,
        switches: switches.length,
        required: challenge.target.components,
      });

      // Check component counts
      for (const req of challenge.target.components) {
        const count = components.filter((c) => c.type === req.type).length;
        if (count !== req.count) {
          allMatch = false;
          console.log(
            `❌ Component mismatch: ${req.type} need ${req.count}, got ${count}`
          );
          break;
        } else {
          console.log(
            `✅ Component match: ${req.type} need ${req.count}, got ${count}`
          );
        }
      }

      // Check voltage and current (with tolerance) - using FRESH calculated values!
      const voltageDiff = Math.abs(totalVoltage - challenge.target.voltage);
      const currentDiff = Math.abs(
        calculatedCurrent - challenge.target.current
      );

      console.log("🔍 Validation Check:", {
        componentsMatch: allMatch,
        voltage: totalVoltage.toFixed(2),
        targetVoltage: challenge.target.voltage,
        voltageDiff: voltageDiff.toFixed(2),
        voltagePass: voltageDiff < 1,
        current: calculatedCurrent.toFixed(4),
        targetCurrent: challenge.target.current.toFixed(4),
        currentDiff: currentDiff.toFixed(4),
        currentPass: currentDiff < 0.01,
        powerOn: circuitPower,
        willPass: allMatch && voltageDiff < 1 && currentDiff < 0.01,
      });

      if (allMatch && voltageDiff < 1 && currentDiff < 0.01) {
        console.log("✅ ALL CONDITIONS MET! Setting challengeCompleted = true");
        // Only mark complete if not already completed
        if (!completedList[currentChallenge]) {
          console.log("🎉 MARKING CHALLENGE AS COMPLETED!");
          setChallengeCompleted(true);
          setShowSuccessToast(true);

          // Update completed list
          const newCompletedList = [...completedList];
          newCompletedList[currentChallenge] = true;
          setCompletedList(newCompletedList);

          // Count total completed
          const newCompleted = newCompletedList.filter((c) => c).length;
          setCompletedChallenges(newCompleted);

          // Save progress incrementally based on completed challenges
          const score = Math.round((newCompleted / challenges.length) * 100);
          const passed = score >= 75; // Need 75% (4/5 challenges) to pass
          updateProgress(8, score, passed); // Level 8 = Circuit Module

          console.log("Challenge completed!", {
            challenge: currentChallenge + 1,
            totalCompleted: newCompleted,
            score,
            passed,
          });

          // Auto-hide toast after 5 seconds
          setTimeout(() => setShowSuccessToast(false), 5000);

          // Show completion modal if all challenges done
          if (newCompleted >= challenges.length) {
            setTimeout(() => setShowCompleteModal(true), 1000);
          }
        } else {
          console.log("⚠️ Already in completedList:", {
            inCompletedList: completedList[currentChallenge],
          });
        }
      } else {
        console.log("❌ Validation FAILED - conditions not met");
      }
    }
  }, [
    components,
    circuitPower,
    wires,
    showChallenge,
    challengeCompleted,
    currentChallenge,
    completedList,
  ]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool || selectedTool === "wire") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tool = tools.find((t) => t.id === selectedTool);
    const newComponent: Component = {
      id: Date.now().toString(),
      type: selectedTool,
      x,
      y,
      value: tool?.value || 0,
      rotation: 0,
      connections: [],
    };

    setComponents([...components, newComponent]);
  };

  const handleComponentClick = (
    id: string,
    port: "pos" | "neg",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (selectedTool !== "wire") return;

    if (!connecting) {
      setConnecting({ id, port });
    } else {
      if (connecting.id !== id) {
        const newWire: Wire = {
          id: Date.now().toString(),
          from: connecting.id,
          to: id,
          fromPort: connecting.port,
          toPort: port,
        };
        setWires([...wires, newWire]);
      }
      setConnecting(null);
    }
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
    setWires(wires.filter((w) => w.from !== id && w.to !== id));
  };

  const removeWire = (id: string) => {
    setWires(wires.filter((w) => w.id !== id));
  };

  const clearCircuit = () => {
    setComponents([]);
    setWires([]);
    setCircuitPower(false);
    setConnecting(null);
    setChallengeCompleted(false);
  };

  const loadChallenge = (index: number) => {
    clearCircuit();
    setCurrentChallenge(index);
    setShowChallenge(true);
    setChallengeCompleted(false);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      clearCircuit();
      setCurrentChallenge(currentChallenge + 1);
      setChallengeCompleted(false);
      setShowSuccessToast(false); // Hide toast when moving to next challenge
    } else {
      setShowChallenge(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white">
            ⚡ Modul Rangkaian Elektronika
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border-2 border-white/30">
              <div className="text-white text-center">
                <div className="text-3xl font-bold">
                  {completedChallenges}/{challenges.length}
                </div>
                <div className="text-sm opacity-80">Challenge</div>
              </div>
            </div>
            {isModuleCompleted && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
                <CheckCircle className="w-6 h-6" />
                Module Selesai!
              </div>
            )}
          </div>
        </div>

        {/* Challenge Banner */}
        {showChallenge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-6 rounded-xl border-4 ${
              challengeCompleted
                ? "bg-green-500/20 border-green-400"
                : "bg-blue-500/20 border-blue-400"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">
                    Challenge {currentChallenge + 1}/{challenges.length}
                  </h3>
                  {challengeCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Selesai!
                    </motion.div>
                  )}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {challenges[currentChallenge].name}
                </h4>
                <p className="text-white/90 mb-3">
                  {challenges[currentChallenge].description}
                </p>
                <div className="bg-white/10 rounded-lg p-3 mb-3">
                  <div className="text-white/70 text-xs mb-2">Target:</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-white">
                      ⚡ {challenges[currentChallenge].target.voltage}V
                    </div>
                    <div className="text-white">
                      🔌{" "}
                      {(
                        challenges[currentChallenge].target.current * 1000
                      ).toFixed(1)}
                      mA
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-300 mb-3">
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm">
                    {challenges[currentChallenge].hint}
                  </span>
                </div>

                {/* Wiring Instructions */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-orange-300" />
                    <h5 className="text-white font-bold">Panduan Wiring:</h5>
                  </div>
                  <div className="space-y-1">
                    {challenges[currentChallenge].wiring.map((step, idx) => (
                      <div
                        key={idx}
                        className={`text-sm ${
                          step === ""
                            ? "h-2"
                            : step.includes("CABANG") ||
                              step.includes("KONTROL") ||
                              step.includes("JALUR") ||
                              step.includes("KAPASITOR")
                            ? "text-cyan-300 font-bold mt-2"
                            : step.includes("⚠️")
                            ? "text-yellow-300 font-semibold"
                            : "text-white/90"
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                {/* Validation Status Debug Panel */}
                {!challengeCompleted && circuitPower && (
                  <div className="bg-blue-900/50 border-2 border-blue-400 rounded-lg p-3 mb-2 text-xs">
                    <div className="text-white font-bold mb-2">
                      Status Validasi:
                    </div>
                    <div className="space-y-1 text-white/80">
                      <div>
                        Voltage: {voltage.toFixed(1)}V /{" "}
                        {challenges[currentChallenge].target.voltage}V{" "}
                        {Math.abs(
                          voltage - challenges[currentChallenge].target.voltage
                        ) < 1
                          ? "✅"
                          : "❌"}
                      </div>
                      <div>
                        Current: {(current * 1000).toFixed(1)}mA /{" "}
                        {(
                          challenges[currentChallenge].target.current * 1000
                        ).toFixed(1)}
                        mA{" "}
                        {Math.abs(
                          current - challenges[currentChallenge].target.current
                        ) < 0.01
                          ? "✅"
                          : "❌"}
                      </div>
                      <div>Komponen: {components.length} buah</div>
                    </div>
                  </div>
                )}

                {/* Debug info - remove later */}
                <div className="text-xs text-white/60 mb-2">
                  Debug: challengeCompleted ={" "}
                  {challengeCompleted ? "✅ TRUE" : "❌ FALSE"}
                </div>

                <Button
                  onClick={nextChallenge}
                  variant={challengeCompleted ? "success" : "secondary"}
                  size="lg"
                  disabled={!challengeCompleted}
                  className={
                    challengeCompleted
                      ? "shadow-lg animate-pulse"
                      : "opacity-60"
                  }
                >
                  {currentChallenge < challenges.length - 1
                    ? "Challenge Berikutnya →"
                    : "Lihat Hasil 🎉"}
                </Button>

                {!challengeCompleted && (
                  <div className="text-sm text-white/80 mt-2 text-right">
                    Selesaikan rangkaian sesuai target lalu nyalakan power untuk
                    unlock tombol berikutnya.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Toolbox */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">🧰 Toolbox</h3>
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  gradient={tool.color}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`cursor-pointer ${
                    selectedTool === tool.id ? "ring-4 ring-white" : ""
                  }`}
                >
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <div className="text-white font-bold">{tool.name}</div>
                </Card>
              </motion.div>
            ))}

            <Button variant="danger" className="w-full" onClick={clearCircuit}>
              <Trash2 className="w-5 h-5 mr-2 inline" />
              Hapus Semua
            </Button>

            <Button
              variant={circuitPower ? "success" : "primary"}
              className="w-full"
              onClick={() => setCircuitPower(!circuitPower)}
            >
              <Power className="w-5 h-5 mr-2 inline" />
              {circuitPower ? "Matikan" : "Nyalakan"}
            </Button>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  📐 Canvas Rangkaian
                </h3>
                {circuitPower && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center text-green-600 font-bold"
                  >
                    <Zap className="w-6 h-6 mr-2" />
                    AKTIF
                  </motion.div>
                )}
              </div>

              <div
                className="relative w-full h-[600px] bg-gray-50 border-4 border-gray-200 rounded-xl overflow-hidden"
                onClick={handleCanvasClick}
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ddd 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {components.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xl">
                    Klik untuk menambahkan komponen
                  </div>
                )}

                {/* Draw Wires */}
                {wires.map((wire) => {
                  const fromComp = components.find((c) => c.id === wire.from);
                  const toComp = components.find((c) => c.id === wire.to);
                  if (!fromComp || !toComp) return null;

                  const fromX = fromComp.x;
                  const fromY =
                    fromComp.y + (wire.fromPort === "pos" ? -20 : 20);
                  const toX = toComp.x;
                  const toY = toComp.y + (wire.toPort === "pos" ? -20 : 20);

                  return (
                    <svg
                      key={wire.id}
                      className="absolute inset-0 pointer-events-none"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <motion.line
                        x1={fromX}
                        y1={fromY}
                        x2={toX}
                        y2={toY}
                        stroke={circuitPower ? "#fbbf24" : "#6b7280"}
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: 1,
                          stroke: circuitPower
                            ? ["#fbbf24", "#f59e0b", "#fbbf24"]
                            : "#6b7280",
                        }}
                        transition={{
                          pathLength: { duration: 0.5 },
                          stroke: { duration: 1, repeat: Infinity },
                        }}
                      />
                      <circle
                        cx={fromX}
                        cy={fromY}
                        r="6"
                        fill={circuitPower ? "#10b981" : "#6b7280"}
                        className="cursor-pointer pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeWire(wire.id);
                        }}
                      />
                      <circle
                        cx={toX}
                        cy={toY}
                        r="6"
                        fill={circuitPower ? "#10b981" : "#6b7280"}
                      />
                    </svg>
                  );
                })}

                {/* Draw Components */}
                {components.map((component) => {
                  const tool = tools.find((t) => t.id === component.type);
                  if (!tool) return null;

                  const isLedOn =
                    circuitPower &&
                    component.type === "led" &&
                    wires.some(
                      (w) => w.from === component.id || w.to === component.id
                    );
                  const isResistorHot =
                    circuitPower &&
                    component.type === "resistor" &&
                    wires.some(
                      (w) => w.from === component.id || w.to === component.id
                    );

                  return (
                    <motion.div
                      key={component.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      drag
                      dragMomentum={false}
                      className={`absolute w-24 h-24 rounded-xl flex flex-col items-center justify-center cursor-move bg-gradient-to-br ${tool.color} shadow-lg border-4 border-white/30`}
                      style={{ left: component.x - 48, top: component.y - 48 }}
                      onDragEnd={(e, info) => {
                        const newComponents = components.map((c) =>
                          c.id === component.id
                            ? {
                                ...c,
                                x: c.x + info.offset.x,
                                y: c.y + info.offset.y,
                              }
                            : c
                        );
                        setComponents(newComponents);
                      }}
                    >
                      {/* Connection Points */}
                      <motion.div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-white cursor-pointer z-10"
                        whileHover={{ scale: 1.3 }}
                        onClick={(e) =>
                          handleComponentClick(component.id, "pos", e)
                        }
                        title="Positive"
                      >
                        <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                          +
                        </span>
                      </motion.div>

                      <motion.div
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white cursor-pointer z-10"
                        whileHover={{ scale: 1.3 }}
                        onClick={(e) =>
                          handleComponentClick(component.id, "neg", e)
                        }
                        title="Negative"
                      >
                        <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                          -
                        </span>
                      </motion.div>

                      {/* Component Icon and Info */}
                      <div className="text-4xl mb-1">{tool.icon}</div>
                      <div className="text-white text-xs font-bold">
                        {tool.name}
                      </div>
                      <div className="text-white text-[10px] opacity-75">
                        {component.type === "battery" && `${component.value}V`}
                        {component.type === "resistor" && `${component.value}Ω`}
                        {component.type === "capacitor" &&
                          `${component.value}µF`}
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeComponent(component.id);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-red-600 z-10"
                      >
                        ×
                      </button>

                      {/* LED Light Effect */}
                      {isLedOn && (
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute inset-0 bg-yellow-400 rounded-xl opacity-60 blur-sm"
                          style={{
                            boxShadow: "0 0 30px rgba(251, 191, 36, 0.8)",
                          }}
                        />
                      )}

                      {/* Resistor Heat Effect */}
                      {isResistorHot && (
                        <motion.div
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 bg-red-600 rounded-xl opacity-30"
                        />
                      )}

                      {/* Connecting Indicator */}
                      {connecting?.id === component.id && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="absolute inset-0 border-4 border-yellow-400 rounded-xl"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Measurement Panel */}
            <div className="grid md:grid-cols-5 gap-4 mt-6">
              <Card gradient="from-blue-500 to-cyan-500" hover={false}>
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">{components.length}</div>
                  <div className="text-sm">Komponen</div>
                </div>
              </Card>
              <Card gradient="from-green-500 to-teal-500" hover={false}>
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">{wires.length}</div>
                  <div className="text-sm">Koneksi</div>
                </div>
              </Card>
              <Card gradient="from-yellow-500 to-orange-500" hover={false}>
                <div className="text-white text-center">
                  <Zap className="w-8 h-8 mx-auto mb-1" />
                  <div className="text-2xl font-bold">
                    {voltage.toFixed(1)}V
                  </div>
                  <div className="text-xs">Tegangan</div>
                </div>
              </Card>
              <Card gradient="from-purple-500 to-pink-500" hover={false}>
                <div className="text-white text-center">
                  <Power className="w-8 h-8 mx-auto mb-1" />
                  <div className="text-2xl font-bold">
                    {(current * 1000).toFixed(1)}mA
                  </div>
                  <div className="text-xs">Arus</div>
                </div>
              </Card>
              <Card gradient="from-red-500 to-pink-500" hover={false}>
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">
                    {completedChallenges}
                  </div>
                  <div className="text-sm">Challenge</div>
                </div>
              </Card>
            </div>

            {/* Instructions */}
            {selectedTool === "wire" && !connecting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-500/20 border-2 border-blue-400 rounded-xl"
              >
                <p className="text-white text-center">
                  <strong>Mode Kabel:</strong> Klik pada titik koneksi (+/-)
                  komponen untuk menghubungkan
                </p>
              </motion.div>
            )}

            {connecting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-yellow-500/20 border-2 border-yellow-400 rounded-xl"
              >
                <p className="text-white text-center">
                  <strong>Menghubungkan...</strong> Klik titik koneksi komponen
                  tujuan atau klik di sini untuk membatalkan
                </p>
                <Button
                  variant="secondary"
                  className="w-full mt-2"
                  onClick={() => setConnecting(null)}
                >
                  Batalkan
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Success Toast - appears when challenge completed */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-6 rounded-2xl shadow-2xl border-4 border-white max-w-md">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ rotate: 0, scale: 1 }}
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="w-12 h-12" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">
                      Challenge {currentChallenge + 1} Selesai! 🎉
                    </h3>
                    <p className="text-white/90 text-lg">
                      Klik tombol "Challenge Berikutnya" untuk lanjut!
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-white/20 rounded-lg p-2 text-center">
                  <p className="text-sm font-semibold">
                    Progress: {completedChallenges + 1}/{challenges.length}{" "}
                    Challenge
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Modal */}
        <Modal
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          title="🎉 Module Selesai!"
          size="lg"
        >
          <div className="text-center space-y-6 p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>

            <div>
              <h3 className="text-3xl font-bold mb-3">Selamat! 🎊</h3>
              <p className="text-lg text-gray-700">
                Kamu telah menyelesaikan semua {challenges.length} challenge
                rangkaian elektronika!
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-400">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {completedChallenges}/{challenges.length}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-3">
                Challenge Completed
              </div>
              <div className="text-4xl font-bold text-blue-600">
                {Math.round((completedChallenges / challenges.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-400">
              <p className="text-gray-800 font-semibold">
                ✨ Level 8 (Mikrokontroler Arduino) telah terbuka!
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {challenges.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className="bg-green-500 text-white p-3 rounded-lg flex flex-col items-center"
                >
                  <Check className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 space-y-2">
              <Button
                onClick={() => {
                  setShowCompleteModal(false);
                  window.location.href = "/";
                }}
                variant="primary"
                className="w-full"
              >
                Kembali ke Home
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
