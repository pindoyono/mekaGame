"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Radio,
  Lightbulb,
  Trophy,
  PlayCircle,
  BookOpen,
  Lock,
  Star,
  Layers,
  Wrench,
  Code,
  Gauge,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, getLevelProgress } = useAuth();

  // Function to check if level should be unlocked
  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true; // Level 1 always unlocked
    if (!isAuthenticated || !user) return false; // Guest users can't access locked levels

    // Check if previous level is completed
    const prevLevelProgress = getLevelProgress(levelId - 1);
    return prevLevelProgress ? prevLevelProgress.completed : false;
  };

  const levels = [
    {
      id: 1,
      title: "Komponen Elektronika Dasar",
      description: "Resistor, Kapasitor, Dioda",
      difficulty: "Mudah",
      icon: Wrench,
      color: "from-green-500 to-teal-500",
      href: "/levels/level1",
      isUnlocked: true,
      passingGrade: 70,
    },
    {
      id: 2,
      title: "Kode Warna Resistor",
      description: "Membaca dan menghitung nilai resistor",
      difficulty: "Sedang",
      icon: Layers,
      color: "from-yellow-500 to-orange-500",
      href: "/levels/level2",
      isUnlocked: isLevelUnlocked(2),
      passingGrade: 70,
    },
    {
      id: 3,
      title: "Simbol Gambar Teknik",
      description: "Matching game simbol komponen",
      difficulty: "Sedang",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      href: "/levels/level3",
      isUnlocked: isLevelUnlocked(3),
      passingGrade: 70,
    },
    {
      id: 4,
      title: "Gerbang Logika Digital",
      description: "AND, OR, NOT, XOR, Half Adder",
      difficulty: "Sedang",
      icon: Zap,
      color: "from-indigo-600 to-purple-600",
      href: "/modules/logic-gates",
      isUnlocked: isLevelUnlocked(4),
      passingGrade: 70,
    },
    {
      id: 5,
      title: "Sensor & Transduser",
      description: "LDR, Ultrasonik, PIR, Suhu",
      difficulty: "Sedang",
      icon: Radio,
      color: "from-blue-500 to-cyan-500",
      href: "/modules/sensor",
      isUnlocked: isLevelUnlocked(5),
      passingGrade: 70,
    },
    {
      id: 6,
      title: "Transistor & IC",
      description: "NPN, PNP, IC 555 Timer",
      difficulty: "Sulit",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500",
      href: "/levels/level5", // File masih bernama level5 untuk backward compatibility
      isUnlocked: isLevelUnlocked(6),
      passingGrade: 70,
    },
    {
      id: 7,
      title: "Aktuator & Motor",
      description: "Motor DC, Servo, Relay",
      difficulty: "Sulit",
      icon: Gauge,
      color: "from-pink-500 to-red-500",
      href: "/modules/actuator",
      isUnlocked: isLevelUnlocked(7),
      passingGrade: 70,
    },
    {
      id: 8,
      title: "Rangkaian Elektronika",
      description: "Simulasi dan desain rangkaian",
      difficulty: "Sulit",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      href: "/modules/circuit",
      isUnlocked: isLevelUnlocked(8),
      passingGrade: 75,
    },
    {
      id: 9,
      title: "Mikrokontroler Arduino",
      description: "Pemrograman & interface",
      difficulty: "Sangat Sulit",
      icon: Lightbulb,
      color: "from-teal-500 to-green-500",
      href: "/modules/arduino",
      isUnlocked: isLevelUnlocked(9),
      passingGrade: 75,
    },
    {
      id: 10,
      title: "Sistem Kontrol PID",
      description: "PID Controller & Feedback System",
      difficulty: "Sangat Sulit",
      icon: Gauge,
      color: "from-blue-600 to-indigo-700",
      href: "/levels/level9", // File masih bernama level9 untuk backward compatibility
      isUnlocked: isLevelUnlocked(10),
      passingGrade: 80,
    },
    {
      id: 11,
      title: "PLC & SCADA",
      description: "Ladder Logic & Industrial Control",
      difficulty: "Sangat Sulit",
      icon: Cpu,
      color: "from-yellow-600 to-orange-600",
      href: "/levels/level10", // File masih bernama level10 untuk backward compatibility
      isUnlocked: isLevelUnlocked(11),
      passingGrade: 80,
    },
    {
      id: 12,
      title: "Final Assessment",
      description: "Ujian akhir semua materi Level 1-11",
      difficulty: "Sangat Sulit",
      icon: Trophy,
      color: "from-purple-700 to-pink-700",
      href: "/levels/level11", // File masih bernama level11 untuk backward compatibility
      isUnlocked: isLevelUnlocked(12),
      passingGrade: 70,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "text-green-400";
      case "Sedang":
        return "text-yellow-400";
      case "Sulit":
        return "text-orange-400";
      case "Sangat Sulit":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Top Navigation Bar */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎮</span>
              <span className="text-white font-bold text-xl">MekaGame</span>
            </div>
            <div className="flex items-center space-x-3">
              {/* Panduan Button - Always visible */}
              <Link href="/panduan">
                <Button variant="secondary" className="hidden sm:flex">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Panduan
                </Button>
              </Link>
              
              {isAuthenticated && user ? (
                <>
                  <Link href="/leaderboard">
                    <Button variant="secondary" className="hidden md:flex">
                      <Trophy className="w-4 h-4 mr-2" />
                      Leaderboard
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button>
                      <User className="w-4 h-4 mr-2" />
                      {user.displayName}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="secondary">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline">Daftar</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-6xl font-bold text-white mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮 MekaGame
          </motion.h1>
          <p className="text-2xl text-purple-200 mb-2">
            Belajar Mekatronika & Elektronika Jadi Lebih Seru!
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
            <p className="text-yellow-300 font-bold">
              🎓 12 Level Pembelajaran Progresif
            </p>
          </div>
          {isAuthenticated && user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <p className="text-green-300 font-bold">
                👋 Selamat datang kembali, {user.displayName}!
              </p>
            </motion.div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center"
          >
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xl">
              {isAuthenticated && user ? user.totalScore : 0}
            </p>
            <p className="text-purple-200 text-sm">Poin</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center"
          >
            <Layers className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xl">
              {isAuthenticated && user ? user.levelsCompleted : 0}/12
            </p>
            <p className="text-purple-200 text-sm">Level</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center"
          >
            <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xl">
              {isAuthenticated && user ? user.levelsCompleted : 0}/12
            </p>
            <p className="text-purple-200 text-sm">Selesai</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center"
          >
            <PlayCircle className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-bold text-xl">0%</p>
            <p className="text-purple-200 text-sm">Progress</p>
          </motion.div>
        </div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center">
            <Layers className="w-7 h-7 mr-2" />
            Jalur Pembelajaran Progresif
          </h2>
          <p className="text-purple-200 text-center text-lg">
            Selesaikan setiap level dengan skor minimal{" "}
            <strong className="text-yellow-300">
              {levels[0].passingGrade}%
            </strong>{" "}
            untuk membuka level berikutnya!
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white">Mudah</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-white">Sedang</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-white">Sulit</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-white">Sangat Sulit</span>
            </div>
          </div>
        </motion.div>

        {/* Level Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isLocked = !level.isUnlocked;
            const levelProgress =
              isAuthenticated && user ? getLevelProgress(level.id) : null;
            const isCompleted = levelProgress?.completed || false;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={!isLocked ? { scale: 1.05, y: -10 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
              >
                <Link
                  href={isLocked ? "#" : level.href}
                  className={isLocked ? "pointer-events-none" : ""}
                >
                  <div
                    className={`rounded-2xl p-6 shadow-2xl transform transition-all duration-300 relative overflow-hidden ${
                      isLocked
                        ? "bg-gray-700 opacity-60 cursor-not-allowed"
                        : `bg-gradient-to-br ${level.color} cursor-pointer hover:shadow-purple-500/50`
                    }`}
                  >
                    {/* Level Number Badge */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {level.id}
                      </span>
                    </div>

                    {/* Completed Badge */}
                    {isCompleted && !isLocked && (
                      <div className="absolute top-4 left-4 bg-green-500 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-white fill-white" />
                        <span className="text-white font-bold text-sm">
                          {levelProgress?.bestScore}%
                        </span>
                      </div>
                    )}

                    {/* Lock Icon */}
                    {isLocked && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Lock className="w-16 h-16 text-white/50" />
                      </div>
                    )}

                    <Icon
                      className={`w-12 h-12 mb-4 ${
                        isLocked ? "text-white/50" : "text-white"
                      }`}
                    />

                    <div className="mb-3">
                      <h3
                        className={`text-xl font-bold mb-1 ${
                          isLocked ? "text-white/50" : "text-white"
                        }`}
                      >
                        {level.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isLocked ? "text-white/40" : "text-white/90"
                        }`}
                      >
                        {level.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-bold ${
                          isLocked
                            ? "text-white/50"
                            : getDifficultyColor(level.difficulty)
                        }`}
                      >
                        {level.difficulty}
                      </span>
                      {!isLocked && (
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                          Min {level.passingGrade}%
                        </span>
                      )}
                    </div>

                    {isLocked && (
                      <div className="mt-3 text-white/60 text-xs">
                        {!isAuthenticated ? (
                          <>🔒 Login untuk membuka level ini</>
                        ) : (
                          <>
                            🔒 Selesaikan Level {level.id - 1} terlebih dahulu
                          </>
                        )}
                      </div>
                    )}

                    {!isLocked && !isCompleted && (
                      <motion.div
                        className="mt-4 flex items-center text-white font-semibold"
                        whileHover={{ x: 10 }}
                      >
                        Mulai Level →
                      </motion.div>
                    )}

                    {!isLocked && isCompleted && (
                      <motion.div
                        className="mt-4 flex items-center text-white font-semibold"
                        whileHover={{ x: 10 }}
                      >
                        Main Lagi →
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Link href="/leaderboard">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-full text-xl shadow-lg"
            >
              🏆 Lihat Leaderboard
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
