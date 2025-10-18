'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, X, RefreshCw, Trophy } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/contexts/AuthContext'

interface Symbol {
  id: string
  name: string
  category: string
  svg: JSX.Element
}

export default function Level3TechnicalSymbols() {
  const { updateProgress, isAuthenticated } = useAuth()
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [matches, setMatches] = useState<string[]>([])
  const [mistakes, setMistakes] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [score, setScore] = useState(0)

  const symbols: Symbol[] = [
    {
      id: 'motor-dc',
      name: 'Motor DC',
      category: 'Aktuator',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3"/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="25" x2="50" y2="15" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="75" x2="50" y2="85" stroke="currentColor" strokeWidth="2"/>
          <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="bold">M</text>
        </svg>
      )
    },
    {
      id: 'switch',
      name: 'Saklar',
      category: 'Komponen',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="20" cy="50" r="5" fill="currentColor"/>
          <circle cx="80" cy="35" r="5" fill="currentColor"/>
          <line x1="25" y1="50" x2="75" y2="38" stroke="currentColor" strokeWidth="3"/>
          <line x1="10" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="2"/>
          <line x1="80" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'relay',
      name: 'Relay',
      category: 'Komponen',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="30" y="40" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="2" rx="3"/>
          <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="2"/>
          <line x1="35" y1="30" x2="35" y2="20" stroke="currentColor" strokeWidth="2"/>
          <line x1="65" y1="30" x2="65" y2="20" stroke="currentColor" strokeWidth="2"/>
          <circle cx="40" cy="55" r="3" fill="currentColor"/>
          <circle cx="60" cy="55" r="3" fill="currentColor"/>
          <line x1="43" y1="55" x2="57" y2="55" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'battery',
      name: 'Baterai',
      category: 'Sumber',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="40" y1="30" x2="40" y2="70" stroke="currentColor" strokeWidth="4"/>
          <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="3"/>
          <line x1="60" y1="30" x2="60" y2="70" stroke="currentColor" strokeWidth="4"/>
          <text x="32" y="25" fill="currentColor" fontSize="16" fontWeight="bold">+</text>
          <text x="64" y="25" fill="currentColor" fontSize="16" fontWeight="bold">-</text>
        </svg>
      )
    },
    {
      id: 'lamp',
      name: 'Lampu',
      category: 'Beban',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
          <line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="2"/>
          <line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'ground',
      name: 'Ground (GND)',
      category: 'Referensi',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="50" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="2"/>
          <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="3"/>
          <line x1="35" y1="60" x2="65" y2="60" stroke="currentColor" strokeWidth="3"/>
          <line x1="40" y1="70" x2="60" y2="70" stroke="currentColor" strokeWidth="3"/>
        </svg>
      )
    },
    {
      id: 'fuse',
      name: 'Sekering (Fuse)',
      category: 'Proteksi',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="30" y="40" width="40" height="20" fill="none" stroke="currentColor" strokeWidth="2" rx="5"/>
          <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="2"/>
          <line x1="70" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2"/>
          <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="3"/>
        </svg>
      )
    },
    {
      id: 'transformer',
      name: 'Transformator',
      category: 'Pengubah',
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="35" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="35" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="65" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="65" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ]

  const symbolNames = symbols.map(s => s.name)
  const [shuffledNames, setShuffledNames] = useState<string[]>([])

  useEffect(() => {
    setShuffledNames([...symbolNames].sort(() => Math.random() - 0.5))
  }, [])

  const handleSymbolClick = (symbolId: string) => {
    if (matches.includes(symbolId)) return
    setSelectedSymbol(symbolId)
  }

  const handleNameClick = (name: string) => {
    if (matches.includes(symbols.find(s => s.name === name)?.id || '')) return
    setSelectedName(name)
  }

  useEffect(() => {
    if (selectedSymbol && selectedName) {
      const symbol = symbols.find(s => s.id === selectedSymbol)
      
      if (symbol && symbol.name === selectedName) {
        // Correct match
        setMatches([...matches, selectedSymbol])
        setScore(score + 100)
        
        if (matches.length + 1 === symbols.length) {
          setGameComplete(true)
        }
      } else {
        // Wrong match
        setMistakes(mistakes + 1)
        setTimeout(() => {
          setScore(Math.max(0, score - 25))
        }, 500)
      }
      
      setTimeout(() => {
        setSelectedSymbol(null)
        setSelectedName(null)
      }, 500)
    }
  }, [selectedSymbol, selectedName])

  const resetGame = () => {
    setMatches([])
    setMistakes(0)
    setScore(0)
    setGameComplete(false)
    setSelectedSymbol(null)
    setSelectedName(null)
    setShuffledNames([...symbolNames].sort(() => Math.random() - 0.5))
  }

  const finalScore = Math.max(0, Math.min(100, Math.round((matches.length / symbols.length) * 100 - (mistakes * 5))))
  const passed = finalScore >= 70

  // Save progress when game is completed
  useEffect(() => {
    if (gameComplete && isAuthenticated) {
      updateProgress(3, finalScore, passed)
    }
  }, [gameComplete, finalScore, passed, isAuthenticated, updateProgress])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
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
              <span className="text-purple-300 font-bold">Level 3 - Sedang</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              🔌 Simbol Gambar Teknik
            </h1>
          </motion.div>
          <Button onClick={resetGame}>
            <RefreshCw className="w-5 h-5 mr-2 inline" />
            Reset
          </Button>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">🎯 Cara Bermain</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-lg">1️⃣ Klik simbol di sebelah kiri</p>
            </div>
            <div>
              <p className="text-lg">2️⃣ Klik nama yang sesuai di kanan</p>
            </div>
            <div>
              <p className="text-lg">3️⃣ Cocokkan semua simbol!</p>
            </div>
          </div>
        </motion.div>

        {/* Score Board */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card gradient="from-green-500 to-teal-500" hover={false}>
            <div className="text-center text-white">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{matches.length}/{symbols.length}</p>
              <p className="text-sm">Benar</p>
            </div>
          </Card>
          <Card gradient="from-red-500 to-pink-500" hover={false}>
            <div className="text-center text-white">
              <X className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{mistakes}</p>
              <p className="text-sm">Salah</p>
            </div>
          </Card>
          <Card gradient="from-yellow-500 to-orange-500" hover={false}>
            <div className="text-center text-white">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{score}</p>
              <p className="text-sm">Poin</p>
            </div>
          </Card>
        </div>

        {!gameComplete ? (
          /* Game Board */
          <div className="grid md:grid-cols-2 gap-8">
            {/* Symbols Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                🔣 Simbol
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {symbols.map((symbol, index) => (
                  <motion.button
                    key={symbol.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSymbolClick(symbol.id)}
                    disabled={matches.includes(symbol.id)}
                    className={`p-6 rounded-2xl transition-all ${
                      matches.includes(symbol.id)
                        ? 'bg-green-500 cursor-not-allowed opacity-50'
                        : selectedSymbol === symbol.id
                        ? 'bg-yellow-400 scale-105 shadow-2xl'
                        : 'bg-white hover:bg-blue-50 hover:scale-105'
                    }`}
                  >
                    <div className="text-gray-800 mb-3">
                      {symbol.svg}
                    </div>
                    {matches.includes(symbol.id) && (
                      <div className="flex items-center justify-center text-white">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Names Column */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                📝 Nama Komponen
              </h3>
              <div className="space-y-3">
                {shuffledNames.map((name, index) => {
                  const symbolId = symbols.find(s => s.name === name)?.id
                  const isMatched = symbolId && matches.includes(symbolId)
                  
                  return (
                    <motion.button
                      key={name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNameClick(name)}
                      disabled={isMatched || false}
                      className={`w-full p-4 rounded-xl text-left font-bold text-lg transition-all ${
                        isMatched
                          ? 'bg-green-500 text-white cursor-not-allowed opacity-50'
                          : selectedName === name
                          ? 'bg-yellow-400 text-gray-900 scale-105 shadow-2xl'
                          : 'bg-white text-gray-900 hover:bg-blue-50 hover:scale-102'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{name}</span>
                        {isMatched && <CheckCircle className="w-6 h-6" />}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Game Complete */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card
              gradient={passed ? 'from-green-400 to-teal-500' : 'from-orange-400 to-red-500'}
              hover={false}
            >
              <div className="text-center text-white space-y-6">
                <div className="text-6xl mb-4">
                  {passed ? '🎉' : '💪'}
                </div>
                <h2 className="text-4xl font-bold">
                  {passed ? 'Selamat!' : 'Coba Lagi!'}
                </h2>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-2xl mb-2">Skor Akhir</p>
                  <p className="text-6xl font-bold">{finalScore}%</p>
                </div>
                
                <div className="space-y-2 text-lg">
                  <p>✅ Cocok Benar: {matches.length}/{symbols.length}</p>
                  <p>❌ Kesalahan: {mistakes}</p>
                  <p>🎯 Passing Grade: 70%</p>
                </div>

                {passed ? (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="font-bold text-xl">
                      🎓 Level 4 telah terbuka!
                    </p>
                  </div>
                ) : (
                  <p className="text-lg">
                    Kamu perlu skor minimal 70% untuk lanjut ke level berikutnya
                  </p>
                )}

                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button variant="secondary" size="lg">
                      Kembali ke Home
                    </Button>
                  </Link>
                  <Button onClick={resetGame} size="lg">
                    <RefreshCw className="w-5 h-5 mr-2 inline" />
                    Main Lagi
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  )
}
