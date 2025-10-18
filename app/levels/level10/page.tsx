"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Square,
  Trash2,
  CheckCircle,
  Circle,
  Clock,
  Hash,
  Zap,
  Info,
  Target,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

// PLC Component Types
type ComponentType = "NO" | "NC" | "COIL" | "TON" | "CTU" | "EMPTY";

interface LadderComponent {
  id: string;
  type: ComponentType;
  address: string;
  position: { rung: number; col: number };
  preset?: number; // For timer/counter
  accum?: number; // Current value
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  task: string;
  inputs: string[];
  outputs: string[];
  hint: string;
  validation: (
    components: LadderComponent[],
    inputStates: Record<string, boolean>,
    outputStates: Record<string, boolean>
  ) => boolean;
}

export default function Level10() {
  const { updateProgress, getLevelProgress } = useAuth();

  // Ladder Logic Editor
  const [ladder, setLadder] = useState<LadderComponent[]>([]);
  const [selectedTool, setSelectedTool] = useState<ComponentType>("NO");
  const [isRunning, setIsRunning] = useState(false);
  const [scanCycle, setScanCycle] = useState(0);

  // PLC I/O States
  const [inputStates, setInputStates] = useState<Record<string, boolean>>({
    I0_0: false,
    I0_1: false,
    I0_2: false,
    I0_3: false,
  });
  const [outputStates, setOutputStates] = useState<Record<string, boolean>>({
    Q0_0: false,
    Q0_1: false,
    Q0_2: false,
  });

  // Challenge System
  const levelProgress = getLevelProgress(11); // Level 11 = PLC & SCADA
  const bestScore = levelProgress?.score || 0;

  // ✅ Calculate initial state based on saved progress
  const getInitialChallengeState = () => {
    if (!levelProgress || levelProgress.score === 0) {
      return {
        currentChallenge: 0,
        completedChallenges: new Array(5).fill(false),
      };
    }

    // Calculate how many challenges completed based on score
    const completedCount = Math.floor((levelProgress.score / 100) * 5);
    const completed = new Array(5).fill(false);

    // Mark challenges as completed
    for (let i = 0; i < completedCount; i++) {
      completed[i] = true;
    }

    // Set current challenge to the next uncompleted one
    const nextChallenge = completedCount >= 5 ? 4 : completedCount;

    return {
      currentChallenge: nextChallenge,
      completedChallenges: completed,
    };
  };

  const initialState = getInitialChallengeState();
  const [currentChallenge, setCurrentChallenge] = useState(
    initialState.currentChallenge
  );
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(
    initialState.completedChallenges
  );
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Challenge 1: Lampu Sederhana",
      description: "Buat program agar lampu Q0.0 menyala ketika switch I0.0 ON",
      task: "Gunakan 1 NO contact (I0.0) dan 1 coil (Q0.0)",
      inputs: ["I0.0"],
      outputs: ["Q0.0"],
      hint: "─┤I0.0├────(Q0.0)─",
      validation: (components, inputs, outputs) => {
        // Must have at least 1 NO and 1 COIL
        const hasNO = components.some(
          (c) => c.type === "NO" && c.address === "I0.0"
        );
        const hasCoil = components.some(
          (c) => c.type === "COIL" && c.address === "Q0.0"
        );
        const outputCorrect = outputs["Q0_0"] === inputs["I0_0"];
        return hasNO && hasCoil && outputCorrect;
      },
    },
    {
      id: 2,
      name: "Challenge 2: Start/Stop Motor",
      description: "Motor start dengan I0.0, stop dengan I0.1 (NC)",
      task: "Gunakan I0.0 (NO), I0.1 (NC), Q0.0 (self-hold) untuk latching",
      inputs: ["I0.0", "I0.1"],
      outputs: ["Q0.0"],
      hint: "Start button (I0.0) parallel dengan Q0.0, series dengan NC stop (I0.1)",
      validation: (components, inputs, outputs) => {
        const hasStartNO = components.some(
          (c) => c.type === "NO" && c.address === "I0.0"
        );
        const hasStopNC = components.some(
          (c) => c.type === "NC" && c.address === "I0.1"
        );
        const hasCoil = components.some(
          (c) => c.type === "COIL" && c.address === "Q0.0"
        );
        return hasStartNO && hasStopNC && hasCoil;
      },
    },
    {
      id: 3,
      name: "Challenge 3: Timer ON Delay",
      description: "Lampu Q0.0 menyala 3 detik setelah I0.0 ON",
      task: "Gunakan Timer TON dengan preset 3 detik",
      inputs: ["I0.0"],
      outputs: ["Q0.0"],
      hint: "I0.0 trigger timer T1, output timer T1 nyalakan Q0.0",
      validation: (components, inputs, outputs) => {
        const hasTimer = components.some(
          (c) => c.type === "TON" && c.address === "T1"
        );
        const hasCoil = components.some(
          (c) => c.type === "COIL" && c.address === "Q0.0"
        );
        return hasTimer && hasCoil;
      },
    },
    {
      id: 4,
      name: "Challenge 4: Counter Produk",
      description: "Hitung 5 produk dengan sensor I0.0, output Q0.0",
      task: "Gunakan Counter CTU dengan preset 5",
      inputs: ["I0.0"],
      outputs: ["Q0.0"],
      hint: "Sensor I0.0 trigger counter C1, saat count=5 nyalakan Q0.0",
      validation: (components, inputs, outputs) => {
        const hasCounter = components.some(
          (c) => c.type === "CTU" && c.address === "C1"
        );
        const hasCoil = components.some(
          (c) => c.type === "COIL" && c.address === "Q0.0"
        );
        return hasCounter && hasCoil;
      },
    },
    {
      id: 5,
      name: "Challenge 5: Traffic Light",
      description: "Lampu lalu lintas 3 fase dengan timer",
      task: "Red(Q0.0)-5s → Yellow(Q0.1)-2s → Green(Q0.2)-5s → loop",
      inputs: ["I0.0"],
      outputs: ["Q0.0", "Q0.1", "Q0.2"],
      hint: "Gunakan 3 timer dan interlock antar output",
      validation: (components, inputs, outputs) => {
        const timerCount = components.filter((c) => c.type === "TON").length;
        const coilCount = components.filter((c) => c.type === "COIL").length;
        return timerCount >= 2 && coilCount >= 3;
      },
    },
  ];

  // PLC Scan Cycle Simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setScanCycle((c) => c + 1);
      executeLadderLogic();
    }, 200); // 200ms scan cycle

    return () => clearInterval(interval);
  }, [isRunning, ladder, inputStates]);

  const executeLadderLogic = () => {
    const newOutputs = { ...outputStates };
    const timerStates: Record<string, { enabled: boolean; accum: number }> = {};
    const counterStates: Record<string, { count: number; done: boolean }> = {};

    // Group components by rung
    const rungs: Record<number, LadderComponent[]> = {};
    ladder.forEach((comp) => {
      const rung = comp.position.rung;
      if (!rungs[rung]) rungs[rung] = [];
      rungs[rung].push(comp);
    });

    // Execute each rung
    Object.keys(rungs).forEach((rungNum) => {
      const rung = rungs[parseInt(rungNum)].sort(
        (a, b) => a.position.col - b.position.col
      );

      let rungState = true; // Start with TRUE

      rung.forEach((comp) => {
        switch (comp.type) {
          case "NO": // Normally Open
            const noInput =
              inputStates[comp.address.replace(".", "_")] || false;
            rungState = rungState && noInput;
            break;

          case "NC": // Normally Closed
            const ncInput =
              inputStates[comp.address.replace(".", "_")] || false;
            rungState = rungState && !ncInput;
            break;

          case "COIL": // Output Coil
            if (rungState) {
              newOutputs[comp.address.replace(".", "_")] = true;
            } else {
              newOutputs[comp.address.replace(".", "_")] = false;
            }
            break;

          case "TON": // Timer ON Delay
            if (rungState && comp.preset) {
              if (!timerStates[comp.address]) {
                timerStates[comp.address] = { enabled: true, accum: 0 };
              }
              timerStates[comp.address].accum += 0.2; // 200ms
              if (timerStates[comp.address].accum >= comp.preset) {
                rungState = true; // Timer done
              } else {
                rungState = false;
              }
            } else {
              if (timerStates[comp.address]) {
                timerStates[comp.address].accum = 0;
              }
              rungState = false;
            }
            break;

          case "CTU": // Counter Up
            if (rungState && comp.preset) {
              if (!counterStates[comp.address]) {
                counterStates[comp.address] = { count: 0, done: false };
              }
              // Count on rising edge (simplified)
              counterStates[comp.address].count += 1;
              if (counterStates[comp.address].count >= comp.preset) {
                counterStates[comp.address].done = true;
                rungState = true;
              }
            }
            break;
        }
      });
    });

    setOutputStates(newOutputs);
    checkChallengeValidation();
  };

  const checkChallengeValidation = () => {
    const challenge = challenges[currentChallenge];
    const isValid = challenge.validation(ladder, inputStates, outputStates);

    if (isValid && !completedChallenges[currentChallenge]) {
      const newCompleted = [...completedChallenges];
      newCompleted[currentChallenge] = true;
      setCompletedChallenges(newCompleted);
      setShowChallengeModal(true);
      setIsRunning(false);
      setValidationMessage("✅ Challenge selesai!");

      // ✅ AUTO-SAVE: Save progress after EACH challenge completion
      const completedCount = newCompleted.filter((c) => c).length;
      const score = (completedCount / challenges.length) * 100;
      const allCompleted = newCompleted.every((c) => c);
      updateProgress(11, score, allCompleted); // Level 11 = PLC & SCADA

      // Check if all completed
      if (allCompleted) {
        setShowCompleteModal(true);
      }
    }
  };

  // ✅ NEW: Function to save and exit
  const handleSaveAndExit = () => {
    const completedCount = completedChallenges.filter((c) => c).length;
    const score = (completedCount / challenges.length) * 100;
    const allCompleted = completedChallenges.every((c) => c);
    updateProgress(11, score, allCompleted);
    window.location.href = "/";
  };

  const addComponent = (rung: number, col: number) => {
    if (selectedTool === "EMPTY") return;

    // Prompt for address
    const defaultAddr = getDefaultAddress(selectedTool);
    let addressPrompt = "";

    if (selectedTool === "NO" || selectedTool === "NC") {
      addressPrompt = `Masukkan address input (I0.0, I0.1, I0.2, I0.3, T1, C1):`;
    } else if (selectedTool === "COIL") {
      addressPrompt = `Masukkan address output (Q0.0, Q0.1, Q0.2):`;
    } else if (selectedTool === "TON") {
      addressPrompt = `Masukkan address timer (T1, T2, T3):`;
    } else if (selectedTool === "CTU") {
      addressPrompt = `Masukkan address counter (C1, C2, C3):`;
    }

    const address = window.prompt(addressPrompt, defaultAddr);
    if (!address) return; // User cancelled

    // Prompt for preset if timer or counter
    let preset = undefined;
    if (selectedTool === "TON") {
      const presetStr = window.prompt("Masukkan preset timer (detik):", "3");
      preset = presetStr ? parseInt(presetStr) : 3;
    } else if (selectedTool === "CTU") {
      const presetStr = window.prompt("Masukkan preset counter:", "5");
      preset = presetStr ? parseInt(presetStr) : 5;
    }

    const newComponent: LadderComponent = {
      id: `comp_${Date.now()}`,
      type: selectedTool,
      address: address.trim(),
      position: { rung, col },
      preset: preset,
      accum: 0,
    };

    setLadder([...ladder, newComponent]);
  };

  const removeComponent = (id: string) => {
    setLadder(ladder.filter((c) => c.id !== id));
  };

  const editComponent = (id: string) => {
    const component = ladder.find((c) => c.id === id);
    if (!component) return;

    // Prompt for new address
    let addressPrompt = "";
    if (component.type === "NO" || component.type === "NC") {
      addressPrompt = `Edit address input (I0.0, I0.1, I0.2, I0.3, T1, C1):`;
    } else if (component.type === "COIL") {
      addressPrompt = `Edit address output (Q0.0, Q0.1, Q0.2):`;
    } else if (component.type === "TON") {
      addressPrompt = `Edit address timer (T1, T2, T3):`;
    } else if (component.type === "CTU") {
      addressPrompt = `Edit address counter (C1, C2, C3):`;
    }

    const newAddress = window.prompt(addressPrompt, component.address);
    if (newAddress === null) return; // User cancelled

    // Prompt for preset if timer or counter
    let newPreset = component.preset;
    if (component.type === "TON" || component.type === "CTU") {
      const presetStr = window.prompt(
        `Edit preset ${component.type === "TON" ? "(detik)" : "(count)"}:`,
        component.preset?.toString() || "3"
      );
      newPreset = presetStr ? parseInt(presetStr) : component.preset;
    }

    // Update component
    setLadder(
      ladder.map((c) =>
        c.id === id
          ? { ...c, address: newAddress.trim(), preset: newPreset }
          : c
      )
    );
  };

  const getDefaultAddress = (type: ComponentType): string => {
    switch (type) {
      case "NO":
      case "NC":
        return "I0.0";
      case "COIL":
        return "Q0.0";
      case "TON":
        return "T1";
      case "CTU":
        return "C1";
      default:
        return "";
    }
  };

  const toggleInput = (address: string) => {
    setInputStates({
      ...inputStates,
      [address]: !inputStates[address],
    });
  };

  const clearLadder = () => {
    setLadder([]);
    setIsRunning(false);
    setScanCycle(0);
    setOutputStates({
      Q0_0: false,
      Q0_1: false,
      Q0_2: false,
    });
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      // ✅ Close modal first
      setShowChallengeModal(false);

      // ✅ Reset all states
      setIsRunning(false);
      setScanCycle(0);
      setValidationMessage("");

      // ✅ Move to next challenge
      setCurrentChallenge(currentChallenge + 1);

      // ✅ Clear ladder and reset I/O
      clearLadder();
    }
  };

  const getComponentIcon = (type: ComponentType) => {
    switch (type) {
      case "NO":
        return "┤ ├";
      case "NC":
        return "┤/├";
      case "COIL":
        return "( )";
      case "TON":
        return "TON";
      case "CTU":
        return "CTU";
      default:
        return "";
    }
  };

  const calculateScore = () => {
    const completed = completedChallenges.filter((c) => c).length;
    return (completed / challenges.length) * 100;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-yellow-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="secondary" onClick={handleSaveAndExit}>
            <ArrowLeft className="w-5 h-5 mr-2 inline" />
            Simpan & Keluar
          </Button>
          <h1 className="text-4xl font-bold text-white">
            🏭 Level 10: PLC & SCADA
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2">
            <div className="text-sm text-gray-300">Challenge Selesai</div>
            <div className="text-2xl font-bold text-green-400">
              {completedChallenges.filter((c) => c).length} /{" "}
              {challenges.length}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                📐 Ladder Logic Simulator
              </h2>
              <p className="text-lg mb-3">
                Belajar pemrograman PLC dengan Ladder Logic untuk kontrol
                industri!
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span>Best Score: {bestScore}%</span>
                <span>|</span>
                <span>
                  Challenges: {completedChallenges.filter((c) => c).length}/
                  {challenges.length}
                </span>
                <span>|</span>
                <span>Scan Cycle: {scanCycle}</span>
              </div>
            </div>
            <div className="bg-orange-500/20 p-4 rounded-xl">
              <Info className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Toolbox */}
          <div className="lg:col-span-1 space-y-6">
            {/* Challenge Selection */}
            <Card gradient="from-orange-600 to-red-600">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Challenge {currentChallenge + 1}
              </h3>
              <div className="space-y-3">
                {challenges.map((challenge, idx) => (
                  <button
                    key={challenge.id}
                    onClick={() => {
                      setCurrentChallenge(idx);
                      clearLadder();
                    }}
                    disabled={idx > 0 && !completedChallenges[idx - 1]}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      currentChallenge === idx
                        ? "bg-white text-orange-600 font-bold"
                        : completedChallenges[idx]
                        ? "bg-green-500/30 text-white"
                        : idx > 0 && !completedChallenges[idx - 1]
                        ? "bg-gray-600/30 text-gray-400 cursor-not-allowed"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{challenge.name}</span>
                      {completedChallenges[idx] && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Toolbox */}
            <Card gradient="from-blue-600 to-cyan-600">
              <h3 className="text-xl font-bold text-white mb-4">🔧 Toolbox</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTool("NO")}
                  className={`w-full p-3 rounded-lg font-mono text-lg ${
                    selectedTool === "NO"
                      ? "bg-white text-blue-600 font-bold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  ─┤ ├─ NO Contact
                </button>
                <button
                  onClick={() => setSelectedTool("NC")}
                  className={`w-full p-3 rounded-lg font-mono text-lg ${
                    selectedTool === "NC"
                      ? "bg-white text-blue-600 font-bold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  ─┤/├─ NC Contact
                </button>
                <button
                  onClick={() => setSelectedTool("COIL")}
                  className={`w-full p-3 rounded-lg font-mono text-lg ${
                    selectedTool === "COIL"
                      ? "bg-white text-blue-600 font-bold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  ─( )─ Output Coil
                </button>
                <button
                  onClick={() => setSelectedTool("TON")}
                  className={`w-full p-3 rounded-lg font-mono text-sm ${
                    selectedTool === "TON"
                      ? "bg-white text-blue-600 font-bold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  TON Timer
                </button>
                <button
                  onClick={() => setSelectedTool("CTU")}
                  className={`w-full p-3 rounded-lg font-mono text-sm ${
                    selectedTool === "CTU"
                      ? "bg-white text-blue-600 font-bold"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Hash className="w-4 h-4 inline mr-2" />
                  CTU Counter
                </button>
              </div>
            </Card>

            {/* Controls */}
            <Card gradient="from-green-600 to-teal-600">
              <h3 className="text-xl font-bold text-white mb-4">⚡ Controls</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  variant={isRunning ? "secondary" : "primary"}
                  className="w-full"
                >
                  {isRunning ? (
                    <>
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Run PLC
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearLadder}
                  variant="secondary"
                  className="w-full"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Clear All
                </Button>
              </div>
            </Card>

            {/* Challenge Info */}
            <Card gradient="from-purple-600 to-pink-600">
              <h3 className="text-xl font-bold text-white mb-3">
                📋 Challenge Info
              </h3>
              <div className="text-white space-y-2 text-sm">
                <p>
                  <strong>Task:</strong>{" "}
                  {challenges[currentChallenge].description}
                </p>
                <p>
                  <strong>Detail:</strong> {challenges[currentChallenge].task}
                </p>
                <p className="bg-white/10 p-2 rounded font-mono text-xs">
                  {challenges[currentChallenge].hint}
                </p>
              </div>
            </Card>
          </div>

          {/* Center - Ladder Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card gradient="from-slate-700 to-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">
                📝 Ladder Logic Editor
              </h3>
              <div className="bg-slate-900 rounded-lg p-4 min-h-[500px]">
                {/* Ladder Rungs */}
                {[0, 1, 2, 3, 4].map((rungNum) => (
                  <div key={rungNum} className="flex items-center mb-4">
                    {/* Left Power Rail */}
                    <div className="w-8 h-12 border-l-4 border-green-500"></div>

                    {/* Rung Slots */}
                    <div className="flex-1 flex items-center gap-2">
                      {[0, 1, 2, 3, 4].map((colNum) => {
                        const component = ladder.find(
                          (c) =>
                            c.position.rung === rungNum &&
                            c.position.col === colNum
                        );

                        return (
                          <div key={colNum} className="relative">
                            {component ? (
                              <div className="relative group">
                                <div
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-mono text-sm cursor-pointer hover:bg-blue-700"
                                  onClick={() => editComponent(component.id)}
                                  onContextMenu={(e) => {
                                    e.preventDefault();
                                    removeComponent(component.id);
                                  }}
                                >
                                  {getComponentIcon(component.type)}
                                  <br />
                                  <span className="text-xs font-bold">
                                    {component.address}
                                  </span>
                                  {component.preset && (
                                    <div className="text-xs">
                                      PT: {component.preset}
                                      {component.type === "TON" ? "s" : ""}
                                    </div>
                                  )}
                                </div>
                                <div className="absolute -top-10 left-0 bg-blue-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                  Click: Edit | Right-click: Remove
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => addComponent(rungNum, colNum)}
                                className="w-20 h-12 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-900/20 transition-all"
                              >
                                <span className="text-gray-500 text-xs">+</span>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Power Rail */}
                    <div className="w-8 h-12 border-r-4 border-green-500"></div>
                  </div>
                ))}
              </div>

              {validationMessage && (
                <div className="mt-4 bg-green-500/20 text-green-300 p-3 rounded-lg">
                  {validationMessage}
                </div>
              )}
            </Card>
          </div>

          {/* Right Panel - I/O & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Inputs */}
            <Card gradient="from-yellow-600 to-amber-600">
              <h3 className="text-xl font-bold text-white mb-4">
                📥 Inputs (Physical)
              </h3>
              <div className="space-y-3">
                {Object.keys(inputStates).map((input) => (
                  <button
                    key={input}
                    onClick={() => toggleInput(input)}
                    className={`w-full p-3 rounded-lg font-mono transition-all ${
                      inputStates[input]
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{input.replace("_", ".")}</span>
                      <Circle
                        className={`w-5 h-5 ${
                          inputStates[input] ? "fill-white" : ""
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Outputs */}
            <Card gradient="from-green-600 to-emerald-600">
              <h3 className="text-xl font-bold text-white mb-4">
                📤 Outputs (Status)
              </h3>
              <div className="space-y-3">
                {Object.keys(outputStates).map((output) => (
                  <div
                    key={output}
                    className={`p-3 rounded-lg font-mono transition-all ${
                      outputStates[output]
                        ? "bg-green-400 text-gray-900"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{output.replace("_", ".")}</span>
                      <Zap
                        className={`w-5 h-5 ${
                          outputStates[output]
                            ? "text-yellow-500 animate-pulse"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Status */}
            <Card gradient="from-indigo-600 to-purple-600">
              <h3 className="text-xl font-bold text-white mb-4">📊 Status</h3>
              <div className="text-white space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>PLC Mode:</span>
                  <span className="font-bold">
                    {isRunning ? "🟢 RUN" : "🔴 STOP"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Scan Cycle:</span>
                  <span className="font-mono">{scanCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Components:</span>
                  <span className="font-mono">{ladder.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Challenge:</span>
                  <span className="font-bold">
                    {currentChallenge + 1}/{challenges.length}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Challenge Complete Modal */}
        <Modal
          isOpen={showChallengeModal}
          onClose={() => setShowChallengeModal(false)}
          title="✅ Challenge Selesai!"
        >
          <div className="text-center space-y-4 p-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold">
              {challenges[currentChallenge].name} Berhasil!
            </h3>
            <p className="text-gray-700">
              Program ladder logic kamu bekerja dengan benar!
            </p>
            {currentChallenge < challenges.length - 1 ? (
              <Button
                onClick={nextChallenge}
                variant="primary"
                className="w-full"
              >
                Challenge Berikutnya →
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowChallengeModal(false);
                  setShowCompleteModal(true);
                }}
                variant="primary"
                className="w-full"
              >
                Lihat Hasil
              </Button>
            )}
          </div>
        </Modal>

        {/* Complete Modal */}
        <Modal
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          title="🎉 Level 10 Selesai!"
          size="lg"
        >
          <div className="text-center space-y-6 p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl">🏭</span>
              </div>
            </motion.div>

            <div>
              <h3 className="text-3xl font-bold mb-3">
                Selamat! Master PLC! 🎊
              </h3>
              <p className="text-lg text-gray-700">
                Kamu telah menyelesaikan semua 5 challenge Ladder Logic!
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl border-4 border-orange-400">
              <div className="text-6xl font-bold text-orange-600 mb-2">
                {calculateScore()}%
              </div>
              <div className="text-lg font-semibold text-gray-800">
                ⭐⭐⭐ PLC Programmer!
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-400">
              <p className="text-green-800 font-semibold">
                ✅ Kamu sekarang memahami konsep Ladder Logic dan PLC
                programming!
              </p>
            </div>

            <Button
              onClick={() => (window.location.href = "/")}
              variant="primary"
              className="w-full"
            >
              Kembali ke Home
            </Button>
          </div>
        </Modal>
      </div>
    </main>
  );
}
