"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Crown,
  Star,
  TrendingUp,
  User as UserIcon,
  Target,
  Award,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useAuth, User } from "@/contexts/AuthContext";

export default function LeaderboardPage() {
  const { getAllUsers, user: currentUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    // Get all users and sort by total score
    const users = getAllUsers();
    const sorted = users.sort((a, b) => {
      // First sort by total score
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      // If same score, sort by levels completed
      if (b.levelsCompleted !== a.levelsCompleted) {
        return b.levelsCompleted - a.levelsCompleted;
      }
      // If still same, sort by registration date (earlier is better)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setLeaderboard(sorted);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-orange-600" />;
      default:
        return (
          <div className="w-8 h-8 flex items-center justify-center">
            <span className="text-gray-600 font-bold">#{rank}</span>
          </div>
        );
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-orange-500";
      case 2:
        return "from-gray-300 to-gray-400";
      case 3:
        return "from-orange-400 to-orange-600";
      default:
        return "from-blue-400 to-purple-500";
    }
  };

  const getCurrentUserRank = () => {
    if (!currentUser) return null;
    return leaderboard.findIndex((u) => u.id === currentUser.id) + 1;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              Kembali
            </Button>
          </Link>
          {currentUser && (
            <Link href="/profile">
              <Button>
                <UserIcon className="w-5 h-5 mr-2 inline" />
                Profile
              </Button>
            </Link>
          )}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full mb-4">
            <Trophy className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            🏆 Leaderboard
          </h1>
          <p className="text-yellow-200 text-lg">Top Players MekaGame</p>
          {currentUser && getCurrentUserRank() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full"
            >
              <p className="text-white font-bold">
                Peringkatmu:{" "}
                <span className="text-yellow-300">#{getCurrentUserRank()}</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card gradient="from-blue-400 to-indigo-500" hover={false}>
              <div className="text-center text-white">
                <UserIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Total Players</p>
                <p className="text-3xl font-bold">{leaderboard.length}</p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card gradient="from-green-400 to-teal-500" hover={false}>
              <div className="text-center text-white">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Highest Score</p>
                <p className="text-3xl font-bold">
                  {leaderboard[0]?.totalScore || 0}
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card gradient="from-purple-400 to-pink-500" hover={false}>
              <div className="text-center text-white">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Champion</p>
                <p className="text-lg font-bold truncate px-2">
                  {leaderboard[0]?.displayName || "-"}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Leaderboard List */}
        <Card gradient="from-white to-gray-50" hover={false}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <TrendingUp className="w-6 h-6 inline mr-2" />
            Ranking
          </h2>

          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Belum ada player</p>
              <p className="text-gray-400 mb-4">Jadilah yang pertama!</p>
              <Link href="/register">
                <Button>Daftar Sekarang</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((player, index) => {
                const rank = index + 1;
                const isCurrentUser = currentUser?.id === player.id;
                const completionRate = Math.round(
                  (player.levelsCompleted / 12) * 100
                );

                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl transition-all ${
                      isCurrentUser
                        ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 shadow-lg"
                        : rank <= 3
                        ? "bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Rank Icon */}
                        <div className="flex-shrink-0">{getRankIcon(rank)}</div>

                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-bold text-gray-900 truncate">
                              {player.displayName}
                            </p>
                            {isCurrentUser && (
                              <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                                YOU
                              </span>
                            )}
                            {rank === 1 && (
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                CHAMPION
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            @{player.username}
                          </p>

                          {/* Progress Bar (mobile view) */}
                          <div className="mt-2 md:hidden">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`bg-gradient-to-r ${getRankBgColor(
                                  rank
                                )} h-2 rounded-full transition-all`}
                                style={{ width: `${completionRate}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 ml-4">
                        <div className="text-center hidden md:block">
                          <p className="text-xs text-gray-600">Level</p>
                          <p className="font-bold text-gray-900">
                            {player.levelsCompleted}/12
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-600">Skor</p>
                          <p
                            className={`font-bold text-xl ${
                              rank === 1
                                ? "text-yellow-600"
                                : rank === 2
                                ? "text-gray-600"
                                : rank === 3
                                ? "text-orange-600"
                                : "text-blue-600"
                            }`}
                          >
                            {player.totalScore}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Call to Action */}
        {!currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card
              gradient="from-gradient-to-r from-blue-500 to-purple-600"
              hover={false}
            >
              <div className="text-center text-white">
                <Target className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">
                  Ingin Masuk Leaderboard?
                </h3>
                <p className="mb-4 opacity-90">
                  Daftar sekarang dan mulai kumpulkan poin!
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/register">
                    <Button variant="secondary">Daftar Gratis</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
