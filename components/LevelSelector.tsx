'use client'

import { motion } from 'framer-motion'
import { Lock, CheckCircle, Star } from 'lucide-react'

interface Level {
  id: number
  title: string
  difficulty: 'Mudah' | 'Sedang' | 'Sulit' | 'Sangat Sulit'
  isUnlocked: boolean
  isCompleted: boolean
  score: number
  passingGrade: number
  href: string
}

interface LevelSelectorProps {
  levels: Level[]
  onLevelClick: (level: Level) => void
}

export default function LevelSelector({ levels, onLevelClick }: LevelSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah':
        return 'from-green-500 to-teal-500'
      case 'Sedang':
        return 'from-yellow-500 to-orange-500'
      case 'Sulit':
        return 'from-orange-500 to-red-500'
      case 'Sangat Sulit':
        return 'from-red-500 to-pink-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {levels.map((level, index) => (
        <motion.div
          key={level.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={level.isUnlocked ? { scale: 1.05, y: -10 } : {}}
          whileTap={level.isUnlocked ? { scale: 0.95 } : {}}
        >
          <button
            onClick={() => level.isUnlocked && onLevelClick(level)}
            disabled={!level.isUnlocked}
            className={`w-full p-6 rounded-2xl shadow-xl text-left transition-all ${
              level.isUnlocked
                ? `bg-gradient-to-br ${getDifficultyColor(level.difficulty)} cursor-pointer hover:shadow-2xl`
                : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                  {level.id}
                </div>
                {level.isCompleted && (
                  <CheckCircle className="w-6 h-6 text-white" />
                )}
                {!level.isUnlocked && (
                  <Lock className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-semibold">
                {level.difficulty}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {level.title}
            </h3>

            {level.isCompleted && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        level.score >= star * 33
                          ? 'text-yellow-300 fill-yellow-300'
                          : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-bold">
                  {level.score}%
                </span>
              </div>
            )}

            {!level.isUnlocked && (
              <p className="text-white/80 text-sm mt-4">
                Selesaikan level sebelumnya dengan skor minimal {level.passingGrade}%
              </p>
            )}
          </button>
        </motion.div>
      ))}
    </div>
  )
}
