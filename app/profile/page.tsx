"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Trophy,
  Star,
  Target,
  TrendingUp,
  CheckCircle,
  Lock,
  LogOut,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Show loading or return null while checking auth
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = () => {
    if (confirm("Yakin ingin logout?")) {
      logout();
      router.push("/");
    }
  };

  // Calculate statistics
  const totalLevels = 10;
  const completionRate = Math.round((user.levelsCompleted / totalLevels) * 100);
  const averageScore =
    user.progress.length > 0
      ? Math.round(
          user.progress.reduce((sum, p) => sum + p.bestScore, 0) /
            user.progress.length
        )
      : 0;

  // Sort progress by level
  const sortedProgress = [...user.progress].sort(
    (a, b) => a.levelId - b.levelId
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600"
          >
            <LogOut className="w-5 h-5 mr-2 inline" />
            Logout
          </Button>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 p-1 rounded-full mb-4">
            <div className="bg-white p-6 rounded-full">
              <User className="w-20 h-20 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {user.displayName}
          </h1>
          <p className="text-purple-200 text-lg">@{user.username}</p>
          <p className="text-purple-300 text-sm mt-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Bergabung sejak {formatDate(user.createdAt)}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card gradient="from-yellow-400 to-orange-500" hover={false}>
              <div className="text-center">
                <Trophy className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Total Skor</p>
                <p className="text-white text-3xl font-bold">
                  {user.totalScore}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card gradient="from-green-400 to-teal-500" hover={false}>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Level Selesai</p>
                <p className="text-white text-3xl font-bold">
                  {user.levelsCompleted}/{totalLevels}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card gradient="from-blue-400 to-indigo-500" hover={false}>
              <div className="text-center">
                <Star className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Rata-rata Skor</p>
                <p className="text-white text-3xl font-bold">{averageScore}%</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card gradient="from-purple-400 to-pink-500" hover={false}>
              <div className="text-center">
                <Target className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Progress</p>
                <p className="text-white text-3xl font-bold">
                  {completionRate}%
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card gradient="from-white to-gray-50" hover={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📋 Informasi Akun
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-bold text-gray-900">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-bold text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card gradient="from-white to-gray-50" hover={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <TrendingUp className="w-6 h-6 inline mr-2" />
              Progress Level
            </h2>

            {sortedProgress.length === 0 ? (
              <div className="text-center py-12">
                <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Belum ada progress</p>
                <p className="text-gray-400">
                  Mulai main untuk melihat progress!
                </p>
                <Link href="/">
                  <Button className="mt-4">Mulai Bermain</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProgress.map((progress) => (
                  <motion.div
                    key={progress.levelId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gray-200 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            progress.completed
                              ? "bg-gradient-to-r from-green-400 to-teal-500"
                              : "bg-gradient-to-r from-gray-400 to-gray-500"
                          }`}
                        >
                          <span className="text-white font-bold">
                            {progress.levelId}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            Level {progress.levelId}
                          </p>
                          <p className="text-sm text-gray-600">
                            {progress.attempts} percobaan • Best:{" "}
                            {progress.bestScore}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {progress.completed ? (
                          <div className="flex items-center text-green-600 font-bold">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            LULUS
                          </div>
                        ) : (
                          <div className="text-orange-600 font-bold">
                            Belum Lulus
                          </div>
                        )}
                        {progress.completedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(progress.completedAt)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${progress.bestScore}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Continue Learning */}
            {sortedProgress.length > 0 && (
              <div className="mt-6 text-center">
                <Link href="/">
                  <Button size="lg">
                    <Target className="w-5 h-5 mr-2 inline" />
                    Lanjutkan Belajar
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid md:grid-cols-2 gap-4"
        >
          <Link href="/leaderboard">
            <Card gradient="from-yellow-400 to-orange-500" hover={true}>
              <div className="text-center text-white">
                <Trophy className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold text-lg">Lihat Leaderboard</p>
                <p className="text-sm opacity-90">
                  Bandingkan skormu dengan yang lain
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/">
            <Card gradient="from-blue-400 to-purple-500" hover={true}>
              <div className="text-center text-white">
                <Target className="w-12 h-12 mx-auto mb-2" />
                <p className="font-bold text-lg">Pilih Level</p>
                <p className="text-sm opacity-90">Kembali ke halaman utama</p>
              </div>
            </Card>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
