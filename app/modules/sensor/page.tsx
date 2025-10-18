"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Radio,
  ThermometerSun,
  Lightbulb,
  Activity,
  Eye,
  Volume2,
  Check,
  X,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import ProgressBar from "@/components/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";

interface Sensor {
  id: string;
  name: string;
  icon: any;
  description: string;
  application: string;
  workingPrinciple: string;
  color: string;
}

export default function SensorModule() {
  const { updateProgress } = useAuth();
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const sensors: Sensor[] = [
    {
      id: "temperature",
      name: "Sensor Suhu",
      icon: ThermometerSun,
      description: "Sensor yang mengukur suhu lingkungan",
      application: "AC otomatis, termostat, sistem pendingin",
      workingPrinciple:
        "Menggunakan perubahan resistansi atau tegangan terhadap suhu",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "light",
      name: "Sensor Cahaya (LDR)",
      icon: Lightbulb,
      description: "Sensor yang mendeteksi intensitas cahaya",
      application: "Lampu jalan otomatis, smartphone (brightness)",
      workingPrinciple:
        "Resistansi berubah sesuai intensitas cahaya yang diterima",
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: "ultrasonic",
      name: "Sensor Ultrasonik",
      icon: Radio,
      description: "Sensor yang mengukur jarak dengan gelombang suara",
      application: "Parkir sensor mobil, robot penghindaran rintangan",
      workingPrinciple:
        "Mengirim gelombang ultrasonik dan mengukur waktu pantulan",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "pir",
      name: "Sensor Gerak (PIR)",
      icon: Eye,
      description: "Sensor yang mendeteksi gerakan objek",
      application: "Alarm keamanan, lampu otomatis",
      workingPrinciple:
        "Mendeteksi perubahan radiasi inframerah dari objek bergerak",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "sound",
      name: "Sensor Suara",
      icon: Volume2,
      description: "Sensor yang mendeteksi tingkat suara",
      application: "Lampu musik, deteksi kebisingan",
      workingPrinciple: "Mengkonversi getaran suara menjadi sinyal listrik",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "accelerometer",
      name: "Sensor Akselerasi",
      icon: Activity,
      description: "Sensor yang mengukur percepatan dan orientasi",
      application: "Smartphone (rotasi layar), drone",
      workingPrinciple: "Mengukur perubahan kecepatan dan arah gravitasi",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const quizQuestions = [
    {
      question: "Sensor apa yang digunakan untuk mengukur jarak?",
      options: [
        "Sensor Suhu",
        "Sensor Ultrasonik",
        "Sensor Cahaya",
        "Sensor Suara",
      ],
      correct: 1,
    },
    {
      question: "Prinsip kerja LDR adalah?",
      options: [
        "Mengukur suhu",
        "Mendeteksi gerakan",
        "Resistansi berubah sesuai cahaya",
        "Mendeteksi suara",
      ],
      correct: 2,
    },
    {
      question: "Sensor PIR digunakan untuk mendeteksi?",
      options: ["Suhu", "Gerakan", "Cahaya", "Jarak"],
      correct: 1,
    },
    {
      question: "Aplikasi sensor suhu dalam kehidupan sehari-hari adalah?",
      options: ["Lampu jalan", "AC otomatis", "Parkir sensor", "Alarm rumah"],
      correct: 1,
    },
  ];

  // Save progress when quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      const finalScore = Math.round(
        (score / (quizQuestions.length * 20)) * 100
      );
      const passed = finalScore >= 70;
      updateProgress(5, finalScore, passed); // Level 5 = Sensor Module

      console.log("Progress saved:", {
        levelId: 4,
        score: finalScore,
        passed,
      });
    }
  }, [quizCompleted, score, updateProgress, quizQuestions.length]);

  const handleAnswerClick = (selectedIndex: number) => {
    if (answered) return;

    setAnswered(true);
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 20); // Each question worth 20 points (4 questions = 80 max)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
      } else {
        // Quiz selesai - mark as completed to trigger save
        setQuizCompleted(true);

        setTimeout(() => {
          setShowQuiz(false);
          setCurrentQuestion(0);
          setAnswered(false);
          // Reset for next attempt
          setTimeout(() => {
            setScore(0);
            setQuizCompleted(false);
          }, 500);
        }, 2000);
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎯 Modul Sensor
          </motion.h1>
          <Button onClick={() => setShowQuiz(true)}>📝 Kuis</Button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar
            progress={Math.round((score / 100) * 100)}
            label="Progress Belajar"
            color="bg-green-500"
          />
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">🔍 Apa itu Sensor?</h2>
          <p className="text-lg">
            Sensor adalah perangkat yang mendeteksi dan merespons sinyal dari
            lingkungan fisik. Sensor mengubah besaran fisik (suhu, cahaya,
            suara, dll) menjadi sinyal listrik yang dapat dibaca oleh sistem
            elektronik.
          </p>
        </motion.div>

        {/* Sensor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensors.map((sensor, index) => {
            const Icon = sensor.icon;
            return (
              <motion.div
                key={sensor.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  gradient={sensor.color}
                  onClick={() => setSelectedSensor(sensor)}
                  className="h-full"
                >
                  <Icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    {sensor.name}
                  </h3>
                  <p className="text-white/90 mb-4">{sensor.description}</p>
                  <div className="text-white font-semibold">Pelajari →</div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Detail Modal */}
        <Modal
          isOpen={selectedSensor !== null}
          onClose={() => setSelectedSensor(null)}
          title={selectedSensor?.name}
          size="lg"
        >
          {selectedSensor && (
            <div className="space-y-6">
              <div
                className={`bg-gradient-to-br ${selectedSensor.color} rounded-xl p-8 text-white`}
              >
                {(() => {
                  const Icon = selectedSensor.icon;
                  return <Icon className="w-20 h-20 mx-auto" />;
                })()}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  📝 Deskripsi
                </h3>
                <p className="text-gray-700">{selectedSensor.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  ⚙️ Prinsip Kerja
                </h3>
                <p className="text-gray-700">
                  {selectedSensor.workingPrinciple}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  🔧 Aplikasi
                </h3>
                <p className="text-gray-700">{selectedSensor.application}</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-900">
                  <strong>💡 Tahukah kamu?</strong>
                  <br />
                  Sensor {selectedSensor.name.toLowerCase()} sangat penting
                  dalam teknologi IoT (Internet of Things) untuk membuat
                  perangkat pintar!
                </p>
              </div>
            </div>
          )}
        </Modal>

        {/* Quiz Modal */}
        <Modal
          isOpen={showQuiz}
          onClose={() => {
            setShowQuiz(false);
            setCurrentQuestion(0);
            setScore(0);
            setAnswered(false);
          }}
          title="🎯 Kuis Sensor"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-xl border-2 border-purple-300">
              <span className="text-lg font-bold text-gray-900">
                Soal {currentQuestion + 1} dari {quizQuestions.length}
              </span>
              <span className="bg-green-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                Skor: {score}
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {quizQuestions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => {
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
                      className={`w-full p-5 rounded-xl text-left font-semibold transition-all text-lg ${
                        !showResult
                          ? "bg-white hover:bg-blue-100 border-2 border-blue-300 text-gray-900 hover:border-blue-500"
                          : isCorrect
                          ? "bg-green-500 text-white border-2 border-green-600 shadow-lg"
                          : "bg-gray-300 text-gray-700 border-2 border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isCorrect && (
                          <Check className="w-6 h-6" />
                        )}
                        {showResult && !isCorrect && answered && (
                          <X className="w-6 h-6" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {currentQuestion === quizQuestions.length - 1 && answered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl text-white text-center"
              >
                <h3 className="text-2xl font-bold mb-2">🎉 Kuis Selesai!</h3>
                <p className="text-xl">Skor Akhir: {score}/100</p>
                <p className="mt-2">
                  {score >= 75
                    ? "🏆 Luar biasa!"
                    : score >= 50
                    ? "👍 Cukup baik!"
                    : "💪 Terus belajar!"}
                </p>
              </motion.div>
            )}
          </div>
        </Modal>
      </div>
    </main>
  );
}
