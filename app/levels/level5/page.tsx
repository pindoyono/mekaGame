"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, X, Cpu, Zap } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

export default function Level5TransistorIC() {
  const { updateProgress, isAuthenticated } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const topics = [
    {
      id: "transistor",
      title: "Transistor NPN & PNP",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      content: {
        description:
          "Transistor adalah komponen semikonduktor dengan 3 terminal yang berfungsi sebagai saklar elektronik atau penguat sinyal.",
        structure: [
          "Basis (Base/B)",
          "Emitor (Emitter/E)",
          "Kolektor (Collector/C)",
        ],
        types: [
          {
            name: "NPN",
            description:
              "Arus mengalir dari Kolektor ke Emitor saat Basis diberi tegangan positif",
            svg: (
              <svg viewBox="0 0 200 200" className="w-full h-64">
                {/* Base line */}
                <line
                  x1="100"
                  y1="60"
                  x2="100"
                  y2="140"
                  stroke="#333"
                  strokeWidth="4"
                />
                {/* Collector */}
                <line
                  x1="100"
                  y1="80"
                  x2="150"
                  y2="50"
                  stroke="#333"
                  strokeWidth="3"
                />
                <line
                  x1="150"
                  y1="50"
                  x2="150"
                  y2="20"
                  stroke="#333"
                  strokeWidth="3"
                />
                {/* Emitter with arrow */}
                <line
                  x1="100"
                  y1="120"
                  x2="150"
                  y2="150"
                  stroke="#333"
                  strokeWidth="3"
                />
                <polygon points="145,145 155,155 150,150" fill="#333" />
                <line
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="180"
                  stroke="#333"
                  strokeWidth="3"
                />
                {/* Base terminal */}
                <line
                  x1="100"
                  y1="100"
                  x2="50"
                  y2="100"
                  stroke="#333"
                  strokeWidth="3"
                />
                {/* Labels */}
                <text
                  x="160"
                  y="20"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                >
                  C
                </text>
                <text
                  x="160"
                  y="185"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                >
                  E
                </text>
                <text
                  x="30"
                  y="105"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                >
                  B
                </text>
                <text
                  x="75"
                  y="30"
                  fill="#2563eb"
                  fontSize="20"
                  fontWeight="bold"
                >
                  NPN
                </text>
              </svg>
            ),
          },
          {
            name: "PNP",
            description:
              "Arus mengalir dari Emitor ke Kolektor saat Basis diberi tegangan negatif",
            svg: (
              <svg viewBox="0 0 200 200" className="w-full h-64">
                {/* Base line */}
                <line
                  x1="100"
                  y1="60"
                  x2="100"
                  y2="140"
                  stroke="#333"
                  strokeWidth="4"
                />
                {/* Collector */}
                <line
                  x1="100"
                  y1="120"
                  x2="150"
                  y2="150"
                  stroke="#333"
                  strokeWidth="3"
                />
                <line
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="180"
                  stroke="#333"
                  strokeWidth="3"
                />
                {/* Emitter with arrow pointing inward */}
                <line
                  x1="100"
                  y1="80"
                  x2="150"
                  y2="50"
                  stroke="#333"
                  strokeWidth="3"
                />
                <polygon points="105,82 95,75 100,80" fill="#333" />
                <line
                  x1="150"
                  y1="50"
                  x2="150"
                  y2="20"
                  stroke="#333"
                  strokeWidth="3"
                />
                {/* Base terminal */}
                <line
                  x1="100"
                  y1="100"
                  x2="50"
                  y2="100"
                  stroke="#333"
                  strokeWidth="3"
                />
                {/* Labels */}
                <text
                  x="160"
                  y="185"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                >
                  C
                </text>
                <text
                  x="160"
                  y="20"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                >
                  E
                </text>
                <text
                  x="30"
                  y="105"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                >
                  B
                </text>
                <text
                  x="75"
                  y="30"
                  fill="#ef4444"
                  fontSize="20"
                  fontWeight="bold"
                >
                  PNP
                </text>
              </svg>
            ),
          },
        ],
        applications: [
          "Saklar elektronik (switching)",
          "Penguat sinyal audio/radio",
          "Driver LED dan relay",
          "Regulator tegangan",
        ],
      },
    },
    {
      id: "ic555",
      title: "IC 555 Timer",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      content: {
        description:
          "IC 555 adalah integrated circuit serbaguna yang dapat digunakan sebagai timer, oscillator, dan pulse generator.",
        pinout: [
          { pin: 1, name: "GND", description: "Ground (0V)" },
          { pin: 2, name: "TRIGGER", description: "Input trigger (aktif low)" },
          { pin: 3, name: "OUTPUT", description: "Output sinyal" },
          { pin: 4, name: "RESET", description: "Reset (aktif low)" },
          { pin: 5, name: "CONTROL", description: "Control voltage" },
          { pin: 6, name: "THRESHOLD", description: "Input threshold" },
          { pin: 7, name: "DISCHARGE", description: "Discharge kapasitor" },
          { pin: 8, name: "VCC", description: "Power supply (+5V - +15V)" },
        ],
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-64">
            {/* IC Body */}
            <rect
              x="75"
              y="50"
              width="150"
              height="100"
              fill="#1a1a1a"
              stroke="#666"
              strokeWidth="2"
              rx="5"
            />
            {/* Notch */}
            <circle cx="150" cy="50" r="8" fill="#333" />
            {/* Pin labels */}
            {[
              { num: 1, name: "GND", x: 75, y: 70 },
              { num: 2, name: "TRIG", x: 75, y: 95 },
              { num: 3, name: "OUT", x: 75, y: 120 },
              { num: 4, name: "RST", x: 75, y: 145 },
              { num: 5, name: "CTRL", x: 225, y: 70 },
              { num: 6, name: "THR", x: 225, y: 95 },
              { num: 7, name: "DIS", x: 225, y: 120 },
              { num: 8, name: "VCC", x: 225, y: 145 },
            ].map((pin, index) => (
              <g key={index}>
                {pin.x === 75 ? (
                  <>
                    <line
                      x1="50"
                      y1={pin.y}
                      x2="75"
                      y2={pin.y}
                      stroke="#ffa500"
                      strokeWidth="3"
                    />
                    <text
                      x="35"
                      y={pin.y + 5}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="end"
                    >
                      {pin.num}
                    </text>
                    <text x="85" y={pin.y + 5} fill="white" fontSize="10">
                      {pin.name}
                    </text>
                  </>
                ) : (
                  <>
                    <line
                      x1="225"
                      y1={pin.y}
                      x2="250"
                      y2={pin.y}
                      stroke="#ffa500"
                      strokeWidth="3"
                    />
                    <text
                      x="265"
                      y={pin.y + 5}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {pin.num}
                    </text>
                    <text
                      x="215"
                      y={pin.y + 5}
                      fill="white"
                      fontSize="10"
                      textAnchor="end"
                    >
                      {pin.name}
                    </text>
                  </>
                )}
              </g>
            ))}
            {/* IC Label */}
            <text
              x="150"
              y="105"
              fill="white"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
            >
              555
            </text>
          </svg>
        ),
        modes: [
          {
            name: "Astable (Oscillator)",
            description:
              "Menghasilkan pulsa kotak berulang (blinking LED, buzzer)",
            formula: "f = 1.44 / ((R1 + 2×R2) × C)",
          },
          {
            name: "Monostable (Timer)",
            description: "Menghasilkan pulsa tunggal dengan durasi tertentu",
            formula: "T = 1.1 × R × C",
          },
          {
            name: "Bistable (Flip-Flop)",
            description: "Saklar elektronik ON/OFF dengan tombol",
          },
        ],
        applications: [
          "LED berkedip (flasher)",
          "Timer delay",
          "PWM generator",
          "Alarm/buzzer",
          "Pembangkit clock",
        ],
      },
    },
  ];

  const quizQuestions = [
    {
      question: "Berapa jumlah terminal pada transistor?",
      options: ["2 terminal", "3 terminal", "4 terminal", "5 terminal"],
      correct: 1,
      explanation:
        "Transistor memiliki 3 terminal: Basis (B), Emitor (E), dan Kolektor (C).",
    },
    {
      question: "Pada transistor NPN, arus mengalir dari?",
      options: [
        "Emitor ke Kolektor",
        "Kolektor ke Emitor",
        "Basis ke Emitor",
        "Emitor ke Basis",
      ],
      correct: 1,
      explanation:
        "Pada NPN, arus mengalir dari Kolektor ke Emitor saat Basis diberi tegangan positif.",
    },
    {
      question:
        "Pin nomor berapa pada IC 555 yang terhubung ke VCC (power supply)?",
      options: ["Pin 1", "Pin 3", "Pin 8", "Pin 4"],
      correct: 2,
      explanation:
        "Pin 8 adalah VCC yang terhubung ke power supply positif (+5V sampai +15V).",
    },
    {
      question: "Pin OUTPUT pada IC 555 adalah pin nomor?",
      options: ["Pin 1", "Pin 3", "Pin 5", "Pin 7"],
      correct: 1,
      explanation:
        "Pin 3 adalah OUTPUT yang mengeluarkan sinyal hasil dari IC 555.",
    },
    {
      question: "Mode IC 555 yang digunakan untuk membuat LED berkedip adalah?",
      options: ["Bistable", "Monostable", "Astable", "Tristable"],
      correct: 2,
      explanation:
        "Mode Astable menghasilkan pulsa berulang yang cocok untuk LED berkedip.",
    },
    {
      question: "Pin GND pada IC 555 adalah pin nomor?",
      options: ["Pin 1", "Pin 2", "Pin 4", "Pin 8"],
      correct: 0,
      explanation:
        "Pin 1 adalah GND (Ground/0V) yang terhubung ke ground power supply.",
    },
  ];

  const handleAnswerClick = (selectedIndex: number) => {
    if (answered) return;

    setAnswered(true);
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + Math.round(100 / quizQuestions.length));
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const passed = score >= 70;

  // Save progress when quiz is completed
  useEffect(() => {
    if (quizCompleted && isAuthenticated) {
      updateProgress(6, score, passed); // Level 6 = Transistor & IC
    }
  }, [quizCompleted, score, passed, isAuthenticated, updateProgress]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-2">
              <span className="text-pink-300 font-bold">Level 5 - Sulit</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              🔬 Transistor & IC
            </h1>
          </motion.div>
          <Button onClick={() => setShowQuiz(true)}>📝 Mulai Quiz</Button>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">🎯 Tujuan Pembelajaran</h2>
          <ul className="space-y-2 text-lg">
            <li>✅ Memahami struktur dan fungsi transistor NPN & PNP</li>
            <li>✅ Mengenal IC 555 Timer dan fungsi setiap pin</li>
            <li>
              ✅ Memahami mode operasi IC 555 (Astable, Monostable, Bistable)
            </li>
            <li>✅ Membaca datasheet komponen elektronika</li>
          </ul>
        </motion.div>

        {/* Topic Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card
                  gradient={topic.color}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <Icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-white/90 mb-4">
                    {topic.content.description.substring(0, 100)}...
                  </p>
                  <div className="text-white font-semibold">
                    Pelajari Detail →
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Modal */}
        <Modal
          isOpen={selectedTopic !== null}
          onClose={() => setSelectedTopic(null)}
          title={topics.find((t) => t.id === selectedTopic)?.title}
          size="xl"
        >
          {selectedTopic &&
            (() => {
              const topic = topics.find((t) => t.id === selectedTopic)!;
              return (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      📝 Deskripsi
                    </h3>
                    <p className="text-gray-700 text-lg">
                      {topic.content.description}
                    </p>
                  </div>

                  {topic.id === "transistor" && (
                    <>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          🔧 Struktur Terminal
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          {topic.content.structure?.map((terminal, i) => (
                            <div
                              key={i}
                              className="bg-blue-50 p-3 rounded-lg text-center"
                            >
                              <span className="font-bold text-blue-900">
                                {terminal}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          ⚡ Jenis Transistor
                        </h3>
                        {topic.content.types?.map((type, i) => (
                          <div
                            key={i}
                            className="mb-6 p-4 bg-gray-50 rounded-xl"
                          >
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                              {type.name}
                            </h4>
                            <p className="text-gray-700 mb-4">
                              {type.description}
                            </p>
                            <div className="bg-white p-4 rounded-lg">
                              {type.svg}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {topic.id === "ic555" && (
                    <>
                      <div className="bg-gray-900 p-6 rounded-xl">
                        {topic.content.svg}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          📌 Fungsi Pin
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {topic.content.pinout?.map((pin, i) => (
                            <div key={i} className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-orange-600">
                                  Pin {pin.pin}
                                </span>
                                <span className="font-bold text-gray-900">
                                  {pin.name}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {pin.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          🎛️ Mode Operasi
                        </h3>
                        {topic.content.modes?.map((mode, i) => (
                          <div
                            key={i}
                            className="mb-3 p-4 bg-purple-50 rounded-lg"
                          >
                            <h4 className="font-bold text-purple-900 mb-1">
                              {mode.name}
                            </h4>
                            <p className="text-gray-700 mb-2">
                              {mode.description}
                            </p>
                            {mode.formula && (
                              <code className="bg-purple-200 px-2 py-1 rounded text-sm font-mono">
                                {mode.formula}
                              </code>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      🔧 Aplikasi
                    </h3>
                    <ul className="space-y-2">
                      {topic.content.applications?.map((app, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
        </Modal>

        {/* Quiz Modal */}
        <Modal
          isOpen={showQuiz}
          onClose={() => {
            if (quizCompleted) {
              setShowQuiz(false);
              setCurrentQuestion(0);
              setScore(0);
              setAnswered(false);
              setQuizCompleted(false);
            }
          }}
          title="🎯 Quiz Level 5"
          size="lg"
        >
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-xl">
                <span className="text-lg font-bold text-white">
                  📝 Soal {currentQuestion + 1} dari {quizQuestions.length}
                </span>
                <span className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold text-lg">
                  Skor: {score}%
                </span>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => {
                      const isCorrect =
                        index === quizQuestions[currentQuestion].correct;
                      const showResult = answered;

                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: answered ? 1 : 1.02 }}
                          whileTap={{ scale: answered ? 1 : 0.98 }}
                          onClick={() => handleAnswerClick(index)}
                          disabled={answered}
                          className={`w-full p-4 rounded-lg text-left font-medium transition-all text-lg ${
                            !showResult
                              ? "bg-white hover:bg-purple-50 border-2 border-gray-300 text-gray-900"
                              : isCorrect
                              ? "bg-green-500 text-white border-2 border-green-600"
                              : "bg-gray-300 text-gray-800 border-2 border-gray-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{option}</span>
                            {showResult && isCorrect && (
                              <CheckCircle className="w-6 h-6" />
                            )}
                            {showResult && !isCorrect && answered && (
                              <X className="w-6 h-6" />
                            )}
                          </div>
                        </motion.button>
                      );
                    }
                  )}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-purple-100 rounded-lg border-l-4 border-purple-500"
                  >
                    <p className="text-purple-900 text-base">
                      <strong className="text-lg">💡 Penjelasan:</strong>{" "}
                      {quizQuestions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div
                className={`p-8 rounded-2xl ${
                  passed
                    ? "bg-gradient-to-r from-green-400 to-teal-500"
                    : "bg-gradient-to-r from-orange-400 to-red-500"
                }`}
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  {passed ? "🎉 Luar Biasa!" : "💪 Hampir Berhasil!"}
                </h2>
                <p className="text-2xl text-white mb-2">Skor Akhir</p>
                <p className="text-6xl font-bold text-white">{score}%</p>
              </div>

              <div className="space-y-4 text-left bg-gray-50 p-6 rounded-xl">
                <p className="text-xl text-gray-900">
                  <strong>🎯 Passing Grade:</strong> 70%
                </p>
                <p className="text-xl text-gray-900">
                  <strong>📊 Status:</strong>{" "}
                  <span
                    className={
                      passed
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {passed
                      ? "✅ LULUS - Level 6 Terbuka!"
                      : "❌ Belum Lulus - Pelajari Lagi Materi"}
                  </span>
                </p>
              </div>

              {passed && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-900">
                    <strong>🎓 Selanjutnya:</strong> Level 6 - Mikrokontroler &
                    Arduino
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </Modal>
      </div>
    </main>
  );
}
