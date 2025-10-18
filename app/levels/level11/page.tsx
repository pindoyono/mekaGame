"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
}

export default function Level11() {
  const { updateProgress, getLevelProgress } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const levelProgress = getLevelProgress(12); // Level 12 = Final Assessment
  const bestScore = levelProgress?.score || 0;

  const questions: Question[] = [
    {
      id: 1,
      question:
        "Komponen elektronika pasif yang berfungsi menyimpan muatan listrik adalah?",
      options: ["Resistor", "Kapasitor", "Dioda", "Transistor"],
      correctAnswer: 1,
      category: "Level 1: Komponen Dasar",
      explanation:
        "Kapasitor adalah komponen yang dapat menyimpan energi dalam bentuk muatan listrik.",
    },
    {
      id: 2,
      question:
        "Resistor dengan gelang warna Coklat-Hitam-Merah-Emas memiliki nilai?",
      options: ["100Ω ±5%", "1kΩ ±5%", "10Ω ±5%", "1MΩ ±5%"],
      correctAnswer: 1,
      category: "Level 2: Kode Warna",
      explanation:
        "Coklat (1), Hitam (0), Merah (×100) = 10 × 100 = 1000Ω = 1kΩ, Emas = ±5%",
    },
    {
      id: 3,
      question: "Simbol berikut menunjukkan komponen apa? ──|>|──",
      options: ["LED", "Dioda", "Kapasitor", "Resistor"],
      correctAnswer: 1,
      category: "Level 3: Simbol Teknik",
      explanation: "Simbol ──|>|── adalah simbol standar untuk dioda.",
    },
    {
      id: 4,
      question:
        "Sensor LDR (Light Dependent Resistor) berfungsi untuk mendeteksi?",
      options: ["Suhu", "Cahaya", "Jarak", "Gerakan"],
      correctAnswer: 1,
      category: "Level 4: Sensor",
      explanation:
        "LDR adalah sensor yang resistansinya berubah sesuai intensitas cahaya.",
    },
    {
      id: 5,
      question: "Transistor NPN memiliki urutan kaki?",
      options: [
        "Emitor-Basis-Kolektor",
        "Basis-Kolektor-Emitor",
        "Kolektor-Basis-Emitor",
        "Emitor-Kolektor-Basis",
      ],
      correctAnswer: 0,
      category: "Level 5: Transistor",
      explanation:
        "Urutan kaki transistor NPN adalah E-B-C (Emitor-Basis-Kolektor).",
    },
    {
      id: 6,
      question: "Motor servo dapat dikontrol dengan sinyal?",
      options: ["DC", "AC", "PWM", "Digital"],
      correctAnswer: 2,
      category: "Level 6: Aktuator",
      explanation:
        "Motor servo dikontrol menggunakan sinyal PWM (Pulse Width Modulation).",
    },
    {
      id: 7,
      question:
        "Dalam rangkaian paralel dengan 2 LED dan 2 resistor, total arus adalah?",
      options: [
        "Sama dengan 1 cabang",
        "Setengah dari total",
        "Penjumlahan semua cabang",
        "Rata-rata semua cabang",
      ],
      correctAnswer: 2,
      category: "Level 7: Rangkaian",
      explanation:
        "Dalam rangkaian paralel, total arus adalah penjumlahan arus semua cabang.",
    },
    {
      id: 8,
      question: "Fungsi pinMode(13, OUTPUT) pada Arduino adalah?",
      options: [
        "Membaca pin 13",
        "Menulis ke pin 13",
        "Set pin 13 sebagai output",
        "Set pin 13 sebagai input",
      ],
      correctAnswer: 2,
      category: "Level 8: Arduino",
      explanation:
        "pinMode(pin, OUTPUT) mengkonfigurasi pin sebagai output untuk mengeluarkan sinyal.",
    },
    {
      id: 9,
      question: "Sistem kontrol PID terdiri dari tiga komponen utama yaitu?",
      options: [
        "Power, Input, Display",
        "Proportional, Integral, Derivative",
        "Processor, Interface, Device",
        "Pulse, Interrupt, Data",
      ],
      correctAnswer: 1,
      category: "Level 9: Sistem Kontrol",
      explanation:
        "PID adalah singkatan dari Proportional, Integral, Derivative - tiga komponen pengontrol utama.",
    },
    {
      id: 10,
      question: "Dalam ladder logic PLC, simbol ─┤ ├─ mewakili?",
      options: [
        "Normally Open (NO) contact",
        "Normally Closed (NC) contact",
        "Output coil",
        "Timer",
      ],
      correctAnswer: 0,
      category: "Level 10: PLC & SCADA",
      explanation:
        "Simbol ─┤ ├─ adalah contact Normally Open (NO) yang akan 'close' ketika energized.",
    },
    {
      id: 11,
      question: "Hukum Ohm menyatakan hubungan antara?",
      options: ["V = I × R", "P = V × I", "Q = C × V", "F = m × a"],
      correctAnswer: 0,
      category: "Fundamental",
      explanation: "Hukum Ohm: Tegangan (V) = Arus (I) × Resistansi (R)",
    },
    {
      id: 12,
      question: "Dalam sistem kontrol feedback, sensor berfungsi untuk?",
      options: [
        "Memberikan setpoint",
        "Mengukur output aktual",
        "Mengatur power supply",
        "Menampilkan data",
      ],
      correctAnswer: 1,
      category: "Sistem Kontrol",
      explanation:
        "Sensor mengukur nilai aktual output untuk dibandingkan dengan setpoint dalam loop feedback.",
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);

    if (isCorrect) {
      setScore(score + 10); // 10 points per correct answer
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const finalScore =
        score +
        (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 : 0);
      const passed = finalScore >= 70; // 70% passing grade

      updateProgress(12, finalScore, passed); // Level 12 = Final Assessment
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white">
            🏆 Level 11: Final Assessment
          </h1>
          <div className="w-24"></div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">
            📝 Ujian Akhir Mekatronika
          </h2>
          <p className="text-lg mb-4">
            Uji pemahamanmu dengan {questions.length} soal yang mencakup semua
            materi dari Level 1-10!
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Best Score: {bestScore}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Passing Grade: 70%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{questions.length} Soal</span>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {!showResult && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 text-white">
              <span className="text-sm font-semibold">
                Soal {currentQuestion + 1} dari {questions.length}
              </span>
              <span className="text-sm font-semibold">Score: {score}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Question Card */}
        {!showResult && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card gradient="from-purple-600 to-pink-600">
                <div className="mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                    {questions[currentQuestion].category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect =
                      index === questions[currentQuestion].correctAnswer;
                    const showFeedback = selectedAnswer !== null;

                    return (
                      <motion.button
                        key={index}
                        whileHover={{
                          scale: selectedAnswer === null ? 1.02 : 1,
                        }}
                        whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                          showFeedback
                            ? isCorrect
                              ? "bg-green-500 text-white"
                              : isSelected
                              ? "bg-red-500 text-white"
                              : "bg-white/10 text-white/50"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showFeedback && isCorrect && (
                            <CheckCircle className="w-5 h-5" />
                          )}
                          {showFeedback && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-900/50 backdrop-blur-sm p-4 rounded-xl mb-4"
                  >
                    <p className="text-white text-sm">
                      <strong>💡 Penjelasan:</strong>{" "}
                      {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}

                {selectedAnswer !== null && (
                  <Button
                    onClick={nextQuestion}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    {currentQuestion < questions.length - 1
                      ? "Soal Berikutnya →"
                      : "Lihat Hasil"}
                  </Button>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Result Modal */}
        <Modal
          isOpen={showResult}
          onClose={() => setShowResult(false)}
          title="🎉 Quiz Selesai!"
          size="lg"
        >
          <div className="text-center space-y-6 p-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {score >= 70 ? (
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto" />
              ) : (
                <XCircle className="w-24 h-24 text-red-500 mx-auto" />
              )}
            </motion.div>

            <div>
              <h3 className="text-3xl font-bold mb-3">
                {score >= 70 ? "Luar Biasa! 🎊" : "Hampir Berhasil!"}
              </h3>
              <p className="text-lg text-gray-700">
                Kamu menjawab benar{" "}
                <strong>
                  {answers.filter((a) => a).length}/{questions.length}
                </strong>{" "}
                soal
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-4 border-purple-400">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {score}%
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {score >= 90
                  ? "⭐⭐⭐ Perfect!"
                  : score >= 70
                  ? "⭐⭐ Bagus!"
                  : "⭐ Coba Lagi!"}
              </div>
            </div>

            {score >= 70 ? (
              <div className="bg-green-50 p-4 rounded-xl border-2 border-green-400">
                <p className="text-green-800 font-semibold">
                  ✅ Selamat! Kamu telah menyelesaikan semua level MekaGame!
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-400">
                <p className="text-yellow-800 font-semibold">
                  Passing grade: 70%. Coba lagi untuk lulus!
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={restartQuiz}
                variant="secondary"
                className="w-full"
              >
                Ulangi Quiz
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
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
