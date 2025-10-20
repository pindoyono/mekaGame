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
  // Simpler non-canvas implementation
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(
    new Array(5).fill(false)
  );
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showTruthTable, setShowTruthTable] = useState(false);

  const levelProgress = getLevelProgress(4); // Level 4 - Logic Gates
  const bestScore = levelProgress?.score || 0;

  // Inputs for the current challenge (max 3 supported)
  const [inputStates, setInputStates] = useState<boolean[]>([false, false, false]);
  // For gates that have multiple outputs (like Half Adder previously), we use expectedOutputs shape
  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Challenge 1: Gerbang AND",
      description:
        "Buat rangkaian sederhana dengan gerbang AND",
      task: "Output ON hanya jika KEDUA input ON",
      inputs: 2,
      expectedOutputs: [
        [false, false, false], // 0,0 → 0
        [false, true, false], // 0,1 → 0
        [true, false, false], // 1,0 → 0
        [true, true, true], // 1,1 → 1
      ],
      hint: "Letakkan 2 INPUT → hubungkan ke 1 AND gate → hubungkan ke 1 OUTPUT",
    },
    {
      id: 2,
      name: "Challenge 2: Gerbang OR",
      description: "Buat rangkaian sederhana dengan gerbang OR",
      task: "Output ON jika SALAH SATU atau KEDUA input ON",
      inputs: 2,
      expectedOutputs: [
        [false, false, false], // 0,0 → 0
        [false, true, true], // 0,1 → 1
        [true, false, true], // 1,0 → 1
        [true, true, true], // 1,1 → 1
      ],
      hint: "Letakkan 2 INPUT → hubungkan ke 1 OR gate → hubungkan ke 1 OUTPUT",
    },
    {
      id: 3,
      name: "Challenge 3: Gerbang NOT",
      description: "Buat rangkaian dengan gerbang NOT (inverter)",
      task: "Output adalah KEBALIKAN dari input",
      inputs: 1,
      expectedOutputs: [
        [false, true], // 0 → 1
        [true, false], // 1 → 0
      ],
      hint: "Letakkan 1 INPUT → hubungkan ke 1 NOT gate → hubungkan ke 1 OUTPUT",
    },
    {
      id: 4,
      name: "Challenge 4: Gerbang NAND",
      description: "Buat rangkaian dengan gerbang NAND (NOT-AND)",
      task: "Output OFF hanya jika KEDUA input ON",
      inputs: 2,
      expectedOutputs: [
        [false, false, true], // 0,0 → 1
        [false, true, true], // 0,1 → 1
        [true, false, true], // 1,0 → 1
        [true, true, false], // 1,1 → 0
      ],
      hint: "Gunakan 2 INPUT → 1 NAND gate → 1 OUTPUT (atau AND + NOT)",
    },
    {
      id: 5,
      name: "Challenge 5: Gerbang XOR",
      description: "Buat rangkaian dengan gerbang XOR",
      task: "Output ON jika input BERBEDA (salah satu ON, bukan keduanya)",
      inputs: 2,
      expectedOutputs: [
        [false, false, false], // 0,0 → 0
        [false, true, true], // 0,1 → 1
        [true, false, true], // 1,0 → 1
        [true, true, false], // 1,1 → 0
      ],
      hint: "Gunakan 2 INPUT → 1 XOR gate → 1 OUTPUT (XOR = ON jika berbeda)",
    },
  ];

  // Evaluate current challenge using inputStates
  const evaluateCurrent = (inputs: boolean[]) => {
    const challenge = challenges[currentChallenge];
    const inVals = inputs.slice(0, challenge.inputs);

    // Convert inputs to numbers for indexing expectedOutputs
    const idx = inVals.reduce((acc, val, i) => acc + (val ? (1 << i) : 0), 0);
    const expectedRow = challenge.expectedOutputs[idx];
    // expectedRow may include inputs + outputs in some older shapes; outputs are after inputs
    const outputs = expectedRow.slice(challenge.inputs);
    return outputs;
  };

  const checkChallengeValidationSimple = () => {
    const expectedOutputsAll = challenges[currentChallenge].expectedOutputs;
    // Validate current inputStates against expected outputs for this input combination
    const curOutputs = evaluateCurrent(inputStates);
    // For single-output challenges, curOutputs will be [true/false]
    const isMatch = (() => {
      // Choose the expected outputs for current input combination
      const challenge = challenges[currentChallenge];
      const inVals = inputStates.slice(0, challenge.inputs);
      const idx = inVals.reduce((acc, val, i) => acc + (val ? (1 << i) : 0), 0);
      const expected = challenge.expectedOutputs[idx].slice(challenge.inputs);
      // Compare
      return JSON.stringify(curOutputs) === JSON.stringify(expected);
    })();

    if (isMatch && !completedChallenges[currentChallenge]) {
      const newCompleted = [...completedChallenges];
      newCompleted[currentChallenge] = true;
      setCompletedChallenges(newCompleted);
      setShowChallengeModal(true);

      if (newCompleted.every((c) => c)) {
        const score = 100;
        updateProgress(4, score, true);
        setShowCompleteModal(true);
      }
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setInputStates([false, false, false]);
      setShowChallengeModal(false);
    }
  };

  const calculateScore = () => {
    const completed = completedChallenges.filter((c) => c).length;
    return (completed / challenges.length) * 100;
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
                      setInputStates([false, false, false]);
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

            {/* Info: Challenge selector */}
            <Card gradient="from-blue-600 to-cyan-600">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Pilih Challenge</h3>
              <div className="space-y-3">
                {challenges.map((challenge, idx) => (
                  <button
                    key={challenge.id}
                    onClick={() => {
                      setCurrentChallenge(idx);
                      setInputStates([false, false, false]);
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
                      <span className="text-sm font-semibold">{challenge.name}</span>
                      {completedChallenges[idx] && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-xs text-white/80 mt-1">{challenge.task}</p>
                  </button>
                ))}
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
              <h3 className="text-xl font-bold text-white mb-4">🧩 Simulator Sederhana</h3>
              <p className="text-white text-sm mb-4">Toggle input dan klik "Periksa" untuk melihat apakah challenge selesai.</p>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: challenges[currentChallenge].inputs }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const next = [...inputStates];
                        next[idx] = !next[idx];
                        setInputStates(next);
                      }}
                      className={`p-3 rounded-md font-mono ${inputStates[idx] ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                      {String.fromCharCode(65 + idx)}: {inputStates[idx] ? '1' : '0'}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button onClick={checkChallengeValidationSimple} variant="primary">Periksa</Button>
                  <Button onClick={() => setInputStates([false, false, false])} variant="secondary">Reset</Button>
                  <Button onClick={() => setShowTruthTable(true)} variant="secondary">Truth Table</Button>
                </div>

                <div className="p-3 bg-white/5 rounded text-sm text-white">
                  Output saat ini:
                  <div className="mt-2 font-mono text-lg">
                    {evaluateCurrent(inputStates).map((o, i) => (
                      <span key={i} className={`inline-block mr-3 p-1 px-2 rounded ${o ? 'bg-green-600' : 'bg-gray-700'}`}>
                        Out{i + 1}: {o ? '1' : '0'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Legend & Help */}
          <div className="lg:col-span-1 space-y-6">
            {/* Gate Legend */}
            <Card gradient="from-purple-600 to-indigo-600">
              <h3 className="text-xl font-bold text-white mb-4">� Gate Legend</h3>
              <div className="text-white space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">AND:</span>
                  <span className="font-mono">A · B</span>
                </div>
                <p className="text-xs text-white/70 mb-3">Output ON hanya jika SEMUA input ON</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">OR:</span>
                  <span className="font-mono">A + B</span>
                </div>
                <p className="text-xs text-white/70 mb-3">Output ON jika SALAH SATU input ON</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">NOT:</span>
                  <span className="font-mono">Ā</span>
                </div>
                <p className="text-xs text-white/70 mb-3">Output KEBALIKAN dari input</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">NAND:</span>
                  <span className="font-mono">!(A · B)</span>
                </div>
                <p className="text-xs text-white/70 mb-3">Output OFF hanya jika SEMUA input ON</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold">XOR:</span>
                  <span className="font-mono">A ⊕ B</span>
                </div>
                <p className="text-xs text-white/70">Output ON jika input BERBEDA</p>
              </div>
            </Card>

            {/* Quick Tips */}
            <Card gradient="from-blue-600 to-indigo-600">
              <h3 className="text-xl font-bold text-white mb-4">� Tips Cepat</h3>
              <div className="text-white space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-400">1.</span>
                  <p>Toggle input dengan klik tombol A, B, atau C</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">2.</span>
                  <p>Hijau = ON (1), Abu = OFF (0)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">3.</span>
                  <p>Klik "Periksa" untuk validasi jawaban</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">4.</span>
                  <p>Gunakan "Truth Table" untuk melihat semua kombinasi</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400">5.</span>
                  <p>Challenge harus diselesaikan berurutan</p>
                </div>
              </div>
            </Card>

            {/* Progress */}
            <Card gradient="from-green-600 to-emerald-600">
              <h3 className="text-xl font-bold text-white mb-4">� Progress</h3>
              <div className="space-y-3">
                <div className="text-white">
                  <p className="text-sm mb-2">Challenge Selesai:</p>
                  <p className="text-3xl font-bold">
                    {completedChallenges.filter(c => c).length}/{challenges.length}
                  </p>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedChallenges.filter(c => c).length / challenges.length) * 100}%` }}
                  />
                </div>
                <div className="text-white text-sm">
                  <p>Best Score: <span className="font-bold text-yellow-300">{bestScore}%</span></p>
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
