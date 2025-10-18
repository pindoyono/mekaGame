"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Trash2,
  CheckCircle,
  Info,
  Target,
  Play,
  Square,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

type GateType =
  | "AND"
  | "OR"
  | "NOT"
  | "NAND"
  | "NOR"
  | "XOR"
  | "XNOR"
  | "INPUT"
  | "OUTPUT";

interface LogicGate {
  id: string;
  type: GateType;
  x: number;
  y: number;
  inputs: string[]; // IDs of connected gates
  output: boolean;
  label?: string;
}

interface Wire {
  id: string;
  from: string;
  to: string;
  fromPort: number;
  toPort: number;
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  task: string;
  inputs: number;
  expectedOutputs: boolean[][];
  hint: string;
}

export default function LogicGatesModule() {
  const { updateProgress, getLevelProgress } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gates and Wires
  const [gates, setGates] = useState<LogicGate[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [selectedGateType, setSelectedGateType] = useState<GateType>("AND");
  const [isSimulating, setIsSimulating] = useState(false);

  // Input states
  const [inputStates, setInputStates] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  // Challenge System
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(
    new Array(5).fill(false)
  );
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showTruthTable, setShowTruthTable] = useState(false);

  const levelProgress = getLevelProgress(4); // Level 4 - Logic Gates
  const bestScore = levelProgress?.score || 0;

  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Challenge 1: Gerbang AND",
      description:
        "Buat rangkaian dengan 2 input dan 1 output menggunakan gerbang AND",
      task: "Output ON hanya jika KEDUA input ON",
      inputs: 2,
      expectedOutputs: [
        [false, false, false], // 0,0 → 0
        [false, true, false], // 0,1 → 0
        [true, false, false], // 1,0 → 0
        [true, true, true], // 1,1 → 1
      ],
      hint: "Gunakan 2 INPUT nodes, 1 AND gate, dan 1 OUTPUT node",
    },
    {
      id: 2,
      name: "Challenge 2: Gerbang OR dan NOT",
      description: "Buat rangkaian OR dengan hasil yang di-invert (NOT)",
      task: "Output = NOT(A OR B) → sama dengan NOR",
      inputs: 2,
      expectedOutputs: [
        [false, false, true], // 0,0 → 1
        [false, true, false], // 0,1 → 0
        [true, false, false], // 1,0 → 0
        [true, true, false], // 1,1 → 0
      ],
      hint: "OR gate → NOT gate → OUTPUT",
    },
    {
      id: 3,
      name: "Challenge 3: XOR (Exclusive OR)",
      description: "Buat rangkaian XOR atau gunakan gerbang XOR langsung",
      task: "Output ON jika input BERBEDA",
      inputs: 2,
      expectedOutputs: [
        [false, false, false], // 0,0 → 0
        [false, true, true], // 0,1 → 1
        [true, false, true], // 1,0 → 1
        [true, true, false], // 1,1 → 0
      ],
      hint: "Gunakan XOR gate atau kombinasi AND, OR, NOT",
    },
    {
      id: 4,
      name: "Challenge 4: Half Adder",
      description: "Buat Half Adder untuk penjumlahan 1-bit",
      task: "2 output: SUM (XOR) dan CARRY (AND)",
      inputs: 2,
      expectedOutputs: [
        [false, false, false, false], // 0+0 = 0, carry 0
        [false, true, true, false], // 0+1 = 1, carry 0
        [true, false, true, false], // 1+0 = 1, carry 0
        [true, true, false, true], // 1+1 = 0, carry 1
      ],
      hint: "SUM = A XOR B, CARRY = A AND B",
    },
    {
      id: 5,
      name: "Challenge 5: Full Adder",
      description: "Buat Full Adder dengan carry input",
      task: "3 input (A, B, Cin), 2 output (SUM, Cout)",
      inputs: 3,
      expectedOutputs: [
        [false, false, false, false, false], // 0+0+0
        [false, false, true, true, false], // 0+0+1
        [false, true, false, true, false], // 0+1+0
        [false, true, true, false, true], // 0+1+1
        [true, false, false, true, false], // 1+0+0
        [true, false, true, false, true], // 1+0+1
        [true, true, false, false, true], // 1+1+0
        [true, true, true, true, true], // 1+1+1
      ],
      hint: "Gunakan 2 Half Adders atau kombinasi XOR + AND + OR",
    },
  ];

  // Logic Gate Evaluation
  const evaluateGate = (
    gate: LogicGate,
    gateMap: Map<string, LogicGate>
  ): boolean => {
    switch (gate.type) {
      case "INPUT":
        return gate.output;

      case "OUTPUT":
        if (gate.inputs.length > 0) {
          const inputGate = gateMap.get(gate.inputs[0]);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        }
        return false;

      case "NOT":
        if (gate.inputs.length > 0) {
          const inputGate = gateMap.get(gate.inputs[0]);
          return inputGate ? !evaluateGate(inputGate, gateMap) : false;
        }
        return false;

      case "AND":
        if (gate.inputs.length < 2) return false;
        return gate.inputs.every((id) => {
          const inputGate = gateMap.get(id);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        });

      case "OR":
        if (gate.inputs.length < 2) return false;
        return gate.inputs.some((id) => {
          const inputGate = gateMap.get(id);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        });

      case "NAND":
        if (gate.inputs.length < 2) return true;
        return !gate.inputs.every((id) => {
          const inputGate = gateMap.get(id);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        });

      case "NOR":
        if (gate.inputs.length < 2) return true;
        return !gate.inputs.some((id) => {
          const inputGate = gateMap.get(id);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        });

      case "XOR":
        if (gate.inputs.length < 2) return false;
        const trueCount = gate.inputs.filter((id) => {
          const inputGate = gateMap.get(id);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        }).length;
        return trueCount === 1;

      case "XNOR":
        if (gate.inputs.length < 2) return true;
        const trueCountXNOR = gate.inputs.filter((id) => {
          const inputGate = gateMap.get(id);
          return inputGate ? evaluateGate(inputGate, gateMap) : false;
        }).length;
        return trueCountXNOR !== 1;

      default:
        return false;
    }
  };

  // Simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      simulateCircuit();
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating, gates, inputStates]);

  const simulateCircuit = () => {
    const gateMap = new Map<string, LogicGate>();
    gates.forEach((g) => gateMap.set(g.id, g));

    // Update input gates
    const inputGates = gates.filter((g) => g.type === "INPUT");
    inputGates.forEach((gate, idx) => {
      gate.output = inputStates[idx] || false;
    });

    // Evaluate all gates
    const newGates = gates.map((gate) => ({
      ...gate,
      output: evaluateGate(gate, gateMap),
    }));

    setGates(newGates);
    checkChallengeValidation(newGates);
  };

  // Draw gates on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw wires
    wires.forEach((wire) => {
      const fromGate = gates.find((g) => g.id === wire.from);
      const toGate = gates.find((g) => g.id === wire.to);
      if (!fromGate || !toGate) return;

      const isActive = fromGate.output;
      ctx.strokeStyle = isActive ? "#10b981" : "#64748b";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(fromGate.x + 60, fromGate.y + 30);
      ctx.lineTo(toGate.x, toGate.y + 15 + wire.toPort * 20);
      ctx.stroke();
    });

    // Draw gates
    gates.forEach((gate) => {
      drawLogicGate(ctx, gate);
    });
  }, [gates, wires]);

  const drawLogicGate = (ctx: CanvasRenderingContext2D, gate: LogicGate) => {
    const { x, y, type, output } = gate;
    const width = 60;
    const height = 60;

    // Gate color based on output
    const fillColor = output ? "#10b981" : "#475569";
    const strokeColor = output ? "#22c55e" : "#64748b";

    ctx.save();
    ctx.translate(x, y);

    switch (type) {
      case "INPUT":
        // Circle for input
        ctx.beginPath();
        ctx.arc(30, 30, 20, 0, Math.PI * 2);
        ctx.fillStyle = output ? "#3b82f6" : "#64748b";
        ctx.fill();
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(gate.label || "IN", 30, 35);
        break;

      case "OUTPUT":
        // Square for output
        ctx.fillStyle = output ? "#ef4444" : "#64748b";
        ctx.fillRect(10, 10, 40, 40);
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 3;
        ctx.strokeRect(10, 10, 40, 40);

        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("OUT", 30, 35);
        break;

      case "AND":
        // AND gate shape (D-shape)
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(30, 10);
        ctx.arc(30, 30, 20, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(0, 50);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "10px Arial";
        ctx.fillText("&", 20, 35);
        break;

      case "OR":
        // OR gate shape (curved)
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.quadraticCurveTo(20, 10, 30, 15);
        ctx.quadraticCurveTo(45, 30, 30, 45);
        ctx.quadraticCurveTo(20, 50, 0, 50);
        ctx.quadraticCurveTo(10, 30, 0, 10);
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "10px Arial";
        ctx.fillText("≥1", 18, 35);
        break;

      case "NOT":
        // NOT gate (triangle + circle)
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(0, 50);
        ctx.lineTo(40, 30);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inverter bubble
        ctx.beginPath();
        ctx.arc(45, 30, 5, 0, Math.PI * 2);
        ctx.fillStyle = output ? "#22c55e" : "#64748b";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "10px Arial";
        ctx.fillText("1", 15, 33);
        break;

      case "NAND":
        // NAND = AND + bubble
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(30, 10);
        ctx.arc(30, 30, 20, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(0, 50);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(55, 30, 5, 0, Math.PI * 2);
        ctx.fillStyle = output ? "#22c55e" : "#64748b";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "8px Arial";
        ctx.fillText("&", 20, 33);
        break;

      case "NOR":
        // NOR = OR + bubble
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.quadraticCurveTo(20, 10, 30, 15);
        ctx.quadraticCurveTo(45, 30, 30, 45);
        ctx.quadraticCurveTo(20, 50, 0, 50);
        ctx.quadraticCurveTo(10, 30, 0, 10);
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(55, 30, 5, 0, Math.PI * 2);
        ctx.fillStyle = output ? "#22c55e" : "#64748b";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "8px Arial";
        ctx.fillText("≥1", 16, 33);
        break;

      case "XOR":
        // XOR = OR with extra line
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(5, 10);
        ctx.quadraticCurveTo(25, 10, 35, 15);
        ctx.quadraticCurveTo(50, 30, 35, 45);
        ctx.quadraticCurveTo(25, 50, 5, 50);
        ctx.quadraticCurveTo(15, 30, 5, 10);
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Extra curved line
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.quadraticCurveTo(5, 30, 0, 50);
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "8px Arial";
        ctx.fillText("=1", 20, 33);
        break;

      case "XNOR":
        // XNOR = XOR + bubble
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(5, 10);
        ctx.quadraticCurveTo(25, 10, 35, 15);
        ctx.quadraticCurveTo(50, 30, 35, 45);
        ctx.quadraticCurveTo(25, 50, 5, 50);
        ctx.quadraticCurveTo(15, 30, 5, 10);
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.quadraticCurveTo(5, 30, 0, 50);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(55, 30, 5, 0, Math.PI * 2);
        ctx.fillStyle = output ? "#22c55e" : "#64748b";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.font = "8px Arial";
        ctx.fillText("=1", 20, 33);
        break;
    }

    ctx.restore();
  };

  const addGate = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 40) * 40;
    const y = Math.floor((e.clientY - rect.top) / 40) * 40;

    const newGate: LogicGate = {
      id: `gate_${Date.now()}`,
      type: selectedGateType,
      x,
      y,
      inputs: [],
      output: false,
      label:
        selectedGateType === "INPUT"
          ? `IN${gates.filter((g) => g.type === "INPUT").length}`
          : undefined,
    };

    setGates([...gates, newGate]);
  };

  const checkChallengeValidation = (currentGates: LogicGate[]) => {
    const challenge = challenges[currentChallenge];
    const outputGates = currentGates.filter((g) => g.type === "OUTPUT");

    if (outputGates.length === 0) return;

    // Test all input combinations
    const numInputs = challenge.inputs;
    let allMatch = true;

    for (let i = 0; i < Math.pow(2, numInputs); i++) {
      const testInputs: boolean[] = [];
      for (let j = 0; j < numInputs; j++) {
        testInputs.push((i >> j) & 1 ? true : false);
      }

      // Set inputs and simulate
      const inputGates = currentGates
        .filter((g) => g.type === "INPUT")
        .slice(0, numInputs);
      inputGates.forEach((gate, idx) => {
        gate.output = testInputs[idx];
      });

      // Check outputs
      const outputs = outputGates.map((g) => g.output);
      const expected = challenge.expectedOutputs[i].slice(numInputs);

      if (JSON.stringify(outputs) !== JSON.stringify(expected)) {
        allMatch = false;
        break;
      }
    }

    if (allMatch && !completedChallenges[currentChallenge]) {
      const newCompleted = [...completedChallenges];
      newCompleted[currentChallenge] = true;
      setCompletedChallenges(newCompleted);
      setShowChallengeModal(true);
      setIsSimulating(false);

      if (newCompleted.every((c) => c)) {
        const score = 100;
        updateProgress(4, score, true);
        setShowCompleteModal(true);
      }
    }
  };

  const clearCircuit = () => {
    setGates([]);
    setWires([]);
    setIsSimulating(false);
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      clearCircuit();
      setShowChallengeModal(false);
    }
  };

  const calculateScore = () => {
    const completed = completedChallenges.filter((c) => c).length;
    return (completed / challenges.length) * 100;
  };

  const toggleInput = (index: number) => {
    const newInputs = [...inputStates];
    newInputs[index] = !newInputs[index];
    setInputStates(newInputs);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white">
            ⚡ Gerbang Logika Digital
          </h1>
          <div className="w-24"></div>
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
                🔌 Logic Gates Simulator
              </h2>
              <p className="text-lg mb-3">
                Belajar gerbang logika dengan simulasi interaktif dan real-time!
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span>Best Score: {bestScore}%</span>
                <span>|</span>
                <span>
                  Challenges: {completedChallenges.filter((c) => c).length}/
                  {challenges.length}
                </span>
              </div>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-xl">
              <Info className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Challenge Selection */}
            <Card gradient="from-purple-600 to-pink-600">
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
                      clearCircuit();
                    }}
                    disabled={idx > 0 && !completedChallenges[idx - 1]}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      currentChallenge === idx
                        ? "bg-white text-purple-600 font-bold"
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

            {/* Gate Toolbox */}
            <Card gradient="from-blue-600 to-cyan-600">
              <h3 className="text-xl font-bold text-white mb-4">🔧 Gates</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "INPUT",
                  "OUTPUT",
                  "AND",
                  "OR",
                  "NOT",
                  "NAND",
                  "NOR",
                  "XOR",
                  "XNOR",
                ].map((gate) => (
                  <button
                    key={gate}
                    onClick={() => setSelectedGateType(gate as GateType)}
                    className={`p-2 rounded-lg text-sm font-bold ${
                      selectedGateType === gate
                        ? "bg-white text-blue-600"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {gate}
                  </button>
                ))}
              </div>
            </Card>

            {/* Controls */}
            <Card gradient="from-green-600 to-teal-600">
              <h3 className="text-xl font-bold text-white mb-4">⚡ Controls</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSimulating(!isSimulating)}
                  variant={isSimulating ? "secondary" : "primary"}
                  className="w-full"
                >
                  {isSimulating ? (
                    <>
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Simulate
                    </>
                  )}
                </Button>
                <Button
                  onClick={clearCircuit}
                  variant="secondary"
                  className="w-full"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Clear
                </Button>
                <Button
                  onClick={() => setShowTruthTable(true)}
                  variant="secondary"
                  className="w-full"
                >
                  📊 Truth Table
                </Button>
              </div>
            </Card>

            {/* Challenge Info */}
            <Card gradient="from-yellow-600 to-orange-600">
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
                <p className="bg-white/10 p-2 rounded text-xs">
                  💡 {challenges[currentChallenge].hint}
                </p>
              </div>
            </Card>
          </div>

          {/* Center - Canvas */}
          <div className="lg:col-span-2 space-y-6">
            <Card gradient="from-slate-700 to-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">
                🎨 Circuit Designer
              </h3>
              <p className="text-white text-sm mb-4">
                Klik canvas untuk menempatkan gate yang dipilih
              </p>
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={addGate}
                className="w-full rounded-lg border-2 border-white/20 cursor-crosshair"
              />
            </Card>
          </div>

          {/* Right Panel - Inputs */}
          <div className="lg:col-span-1 space-y-6">
            {/* Input Controls */}
            <Card gradient="from-blue-600 to-indigo-600">
              <h3 className="text-xl font-bold text-white mb-4">📥 Inputs</h3>
              <div className="space-y-3">
                {inputStates
                  .slice(0, challenges[currentChallenge].inputs)
                  .map((state, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleInput(idx)}
                      className={`w-full p-3 rounded-lg font-mono transition-all ${
                        state
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Input {String.fromCharCode(65 + idx)}</span>
                        <Zap
                          className={`w-5 h-5 ${
                            state ? "text-yellow-300 animate-pulse" : ""
                          }`}
                        />
                      </div>
                    </button>
                  ))}
              </div>
            </Card>

            {/* Gate Legend */}
            <Card gradient="from-purple-600 to-indigo-600">
              <h3 className="text-xl font-bold text-white mb-4">📖 Legend</h3>
              <div className="text-white space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>AND:</span>
                  <span>A · B</span>
                </div>
                <div className="flex justify-between">
                  <span>OR:</span>
                  <span>A + B</span>
                </div>
                <div className="flex justify-between">
                  <span>NOT:</span>
                  <span>Ā</span>
                </div>
                <div className="flex justify-between">
                  <span>NAND:</span>
                  <span>!(A · B)</span>
                </div>
                <div className="flex justify-between">
                  <span>NOR:</span>
                  <span>!(A + B)</span>
                </div>
                <div className="flex justify-between">
                  <span>XOR:</span>
                  <span>A ⊕ B</span>
                </div>
                <div className="flex justify-between">
                  <span>XNOR:</span>
                  <span>!(A ⊕ B)</span>
                </div>
              </div>
            </Card>

            {/* Output Status */}
            <Card gradient="from-green-600 to-emerald-600">
              <h3 className="text-xl font-bold text-white mb-4">📤 Outputs</h3>
              <div className="space-y-3">
                {gates
                  .filter((g) => g.type === "OUTPUT")
                  .map((gate, idx) => (
                    <div
                      key={gate.id}
                      className={`p-3 rounded-lg font-mono ${
                        gate.output
                          ? "bg-red-500 text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      Output {idx + 1}: {gate.output ? "1" : "0"}
                    </div>
                  ))}
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
            <p className="text-gray-700">Circuit logic kamu benar!</p>
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
          title="🎉 Module Selesai!"
          size="lg"
        >
          <div className="text-center space-y-6 p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl">⚡</span>
              </div>
            </motion.div>

            <div>
              <h3 className="text-3xl font-bold mb-3">
                Master Logic Gates! 🎊
              </h3>
              <p className="text-lg text-gray-700">
                Kamu telah menyelesaikan semua challenge gerbang logika!
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-4 border-purple-400">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {calculateScore()}%
              </div>
              <div className="text-lg font-semibold text-gray-800">
                ⭐⭐⭐ Digital Logic Expert!
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-400">
              <p className="text-green-800 font-semibold">
                ✅ Kamu sekarang memahami gerbang logika digital!
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

        {/* Truth Table Modal */}
        <Modal
          isOpen={showTruthTable}
          onClose={() => setShowTruthTable(false)}
          title="📊 Truth Table"
          size="lg"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {challenges[currentChallenge].name}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-purple-600">
                    {Array.from({
                      length: challenges[currentChallenge].inputs,
                    }).map((_, i) => (
                      <th
                        key={i}
                        className="border-2 border-purple-700 px-6 py-3 text-white font-bold text-lg"
                      >
                        {String.fromCharCode(65 + i)}
                      </th>
                    ))}
                    {Array.from({
                      length:
                        challenges[currentChallenge].expectedOutputs[0].length -
                        challenges[currentChallenge].inputs,
                    }).map((_, i) => (
                      <th
                        key={i}
                        className="border-2 border-green-700 px-6 py-3 bg-green-600 text-white font-bold text-lg"
                      >
                        Out{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {challenges[currentChallenge].expectedOutputs.map(
                    (row, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        {row.map((val, i) => (
                          <td
                            key={i}
                            className={`border-2 border-gray-300 px-6 py-4 text-center font-mono text-xl font-bold ${
                              i >= challenges[currentChallenge].inputs
                                ? "bg-green-100 text-green-800"
                                : "text-gray-800"
                            }`}
                          >
                            {val ? "1" : "0"}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Input:</strong> Kolom ungu (A, B, C)
              </p>
              <p>
                <strong>Output:</strong> Kolom hijau (Out1, Out2)
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  );
}
