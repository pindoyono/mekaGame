"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Play, RotateCcw, Code, CheckCircle } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";

export default function ArduinoModule() {
  const { updateProgress, getLevelProgress } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set()
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const levelProgress = getLevelProgress(9);
  const isModuleCompleted = levelProgress?.completed || false;

  const lessons = [
    {
      id: 1,
      title: "Blink LED",
      difficulty: "Pemula",
      description: "Belajar membuat LED berkedip",
      starterCode: `// Program Blink LED
void setup() {
  pinMode(13, OUTPUT);  // Set pin 13 sebagai output
}

void loop() {
  digitalWrite(13, HIGH);  // Nyalakan LED
  delay(1000);             // Tunggu 1 detik
  digitalWrite(13, LOW);   // Matikan LED
  delay(1000);             // Tunggu 1 detik
}`,
      expectedOutput: ["LED ON", "Delay 1s", "LED OFF", "Delay 1s"],
      explanation:
        "Pin 13 dikonfigurasi sebagai OUTPUT, lalu LED dinyalakan dan dimatikan secara bergantian setiap 1 detik.",
    },
    {
      id: 2,
      title: "Serial Monitor",
      difficulty: "Pemula",
      description: "Mengirim data ke serial monitor",
      starterCode: `// Program Serial Monitor
void setup() {
  Serial.begin(9600);  // Inisialisasi serial 9600 bps
}

void loop() {
  Serial.println("Hello Arduino!");
  delay(1000);
}`,
      expectedOutput: ["Serial Begin: 9600", "Hello Arduino!", "Delay 1s"],
      explanation:
        "Serial.begin() menginisialisasi komunikasi serial dengan komputer pada baudrate 9600.",
    },
    {
      id: 3,
      title: "Baca Sensor",
      difficulty: "Menengah",
      description: "Membaca nilai dari sensor analog",
      starterCode: `// Program Baca Sensor
void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);  // Set A0 sebagai input
}

void loop() {
  int sensorValue = analogRead(A0);
  Serial.print("Nilai Sensor: ");
  Serial.println(sensorValue);
  delay(500);
}`,
      expectedOutput: ["Serial Begin: 9600", "Nilai Sensor: 523", "Delay 0.5s"],
      explanation:
        "analogRead() membaca nilai tegangan pada pin analog (0-1023) dari sensor.",
    },
    {
      id: 4,
      title: "Kontrol Motor",
      difficulty: "Lanjutan",
      description: "Mengontrol kecepatan motor dengan PWM",
      starterCode: `// Program Kontrol Motor
void setup() {
  pinMode(9, OUTPUT);  // Pin PWM untuk motor
}

void loop() {
  // Percepat motor
  for(int speed = 0; speed <= 255; speed++) {
    analogWrite(9, speed);
    delay(10);
  }
  // Perlambat motor
  for(int speed = 255; speed >= 0; speed--) {
    analogWrite(9, speed);
    delay(10);
  }
}`,
      expectedOutput: ["Motor Speed: 0 → 255", "Motor Speed: 255 → 0"],
      explanation:
        "analogWrite() menghasilkan sinyal PWM (0-255) untuk mengontrol kecepatan motor DC.",
    },
  ];

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    const lesson = lessons[selectedLesson];

    // Simulasi output
    let i = 0;
    const interval = setInterval(() => {
      if (i < lesson.expectedOutput.length) {
        setOutput((prev) => [...prev, lesson.expectedOutput[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        // Mark lesson as completed when successfully run
        setCompletedLessons(
          (prev) => new Set(Array.from(prev).concat(selectedLesson))
        );
      }
    }, 800);
  };

  const handleComplete = () => {
    // Require at least 3 out of 4 lessons completed
    if (completedLessons.size >= 3) {
      const score = Math.round((completedLessons.size / lessons.length) * 100);
      updateProgress(9, score, true);
      setShowCompleteModal(true);
    } else {
      alert(
        `Selesaikan minimal 3 pelajaran untuk menyelesaikan modul ini!\nSaat ini: ${completedLessons.size}/4 pelajaran`
      );
    }
  };

  const resetCode = () => {
    setCode(lessons[selectedLesson].starterCode);
    setOutput([]);
    setIsRunning(false);
  };

  useEffect(() => {
    setCode(lessons[0].starterCode);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white">💻 Modul Arduino</h1>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border-2 border-white/30">
              <div className="text-white text-center">
                <div className="text-3xl font-bold">
                  {completedLessons.size}/{lessons.length}
                </div>
                <div className="text-sm opacity-80">Pelajaran</div>
              </div>
            </div>
            {isModuleCompleted && (
              <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg">
                <CheckCircle className="w-6 h-6" />
                Selesai!
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">
            🎓 Belajar Pemrograman Arduino
          </h2>
          <p className="text-lg">
            Arduino adalah platform elektronik open-source yang mudah digunakan.
            Mari belajar coding dengan contoh program yang interaktif!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lesson List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              📚 Daftar Pelajaran
            </h3>
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  gradient={
                    lesson.difficulty === "Pemula"
                      ? "from-green-500 to-teal-500"
                      : lesson.difficulty === "Menengah"
                      ? "from-yellow-500 to-orange-500"
                      : "from-red-500 to-pink-500"
                  }
                  onClick={() => {
                    setSelectedLesson(index);
                    setCode(lesson.starterCode);
                    setOutput([]);
                  }}
                  className={`cursor-pointer ${
                    selectedLesson === index ? "ring-4 ring-white" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl font-bold text-white">
                      {lesson.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {completedLessons.has(index) && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                        {lesson.difficulty}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {lesson.title}
                  </h4>
                  <p className="text-white/90 text-sm">{lesson.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Code className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-bold">
                    {lessons[selectedLesson].title}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={runCode} disabled={isRunning}>
                    <Play className="w-4 h-4 mr-1 inline" />
                    Run
                  </Button>
                  <Button size="sm" variant="secondary" onClick={resetCode}>
                    <RotateCcw className="w-4 h-4 mr-1 inline" />
                    Reset
                  </Button>
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* Output Console */}
            <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Output Console
              </h3>
              <div className="bg-black rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
                {output.length === 0 ? (
                  <p className="text-gray-500">
                    Klik "Run" untuk menjalankan program...
                  </p>
                ) : (
                  output.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400 mb-1"
                    >
                      &gt; {line}
                    </motion.div>
                  ))
                )}
                {isRunning && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-yellow-400"
                  >
                    Running...
                  </motion.div>
                )}
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-3">💡 Penjelasan</h3>
              <p className="text-lg leading-relaxed">
                {lessons[selectedLesson].explanation}
              </p>
            </div>

            {/* Arduino Board Visualization */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                🔧 Arduino Board
              </h3>
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-8 relative">
                <div className="grid grid-cols-2 gap-8">
                  {/* Digital Pins */}
                  <div>
                    <h4 className="text-white font-bold mb-4">Digital Pins</h4>
                    <div className="space-y-2">
                      {[13, 12, 11, 10, 9, 8].map((pin) => (
                        <motion.div
                          key={pin}
                          className={`bg-white/20 backdrop-blur-sm p-2 rounded flex items-center justify-between ${
                            (pin === 13 && selectedLesson === 0) ||
                            (pin === 9 && selectedLesson === 3)
                              ? "ring-2 ring-yellow-400"
                              : ""
                          }`}
                          animate={
                            isRunning && pin === 13 && selectedLesson === 0
                              ? {
                                  backgroundColor: [
                                    "rgba(255,255,255,0.2)",
                                    "rgba(255,255,0,0.8)",
                                    "rgba(255,255,255,0.2)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <span className="text-white font-mono">
                            Pin {pin}
                          </span>
                          <div className="w-3 h-3 bg-gray-300 rounded-full" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Analog Pins */}
                  <div>
                    <h4 className="text-white font-bold mb-4">Analog Pins</h4>
                    <div className="space-y-2">
                      {["A0", "A1", "A2", "A3", "A4", "A5"].map((pin) => (
                        <div
                          key={pin}
                          className={`bg-white/20 backdrop-blur-sm p-2 rounded flex items-center justify-between ${
                            pin === "A0" && selectedLesson === 2
                              ? "ring-2 ring-green-400"
                              : ""
                          }`}
                        >
                          <span className="text-white font-mono">
                            Pin {pin}
                          </span>
                          <div className="w-3 h-3 bg-gray-300 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 inline-block">
                    <p className="text-white font-bold text-lg">Arduino UNO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        {!isModuleCompleted && completedLessons.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <Button
              size="lg"
              variant={completedLessons.size >= 3 ? "success" : "secondary"}
              onClick={handleComplete}
              className="text-lg px-8 py-4"
            >
              <CheckCircle className="w-6 h-6 mr-2 inline" />
              Tandai Modul Selesai ({completedLessons.size}/{lessons.length}{" "}
              Pelajaran)
            </Button>
            {completedLessons.size < 3 && (
              <p className="text-white/70 mt-3 text-sm">
                Selesaikan minimal 3 pelajaran untuk menyelesaikan modul ini
              </p>
            )}
          </motion.div>
        )}

        {/* Completion Modal */}
        <Modal
          isOpen={showCompleteModal}
          onClose={() => setShowCompleteModal(false)}
          title="🎉 Modul Selesai!"
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
                Kamu telah menyelesaikan Modul Arduino dengan{" "}
                {completedLessons.size} pelajaran!
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-400">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {Math.round((completedLessons.size / lessons.length) * 100)}%
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-3">
                {completedLessons.size}/{lessons.length} Pelajaran Selesai
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-400">
              <p className="text-gray-800 font-semibold">
                ✨ Kamu sekarang memahami dasar pemrograman Arduino!
              </p>
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
