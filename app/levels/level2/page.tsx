'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, X, RefreshCw } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/contexts/AuthContext'

export default function Level2ResistorColor() {
  const { updateProgress, isAuthenticated } = useAuth()
  const [selectedBands, setSelectedBands] = useState<number[]>([0, 0, 0, 0])
  const [calculatedValue, setCalculatedValue] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<string[]>(['', '', ''])
  const [quizScore, setQuizScore] = useState<number | null>(null)

  const colorCodes = [
    { color: 'Hitam', hex: '#000000', value: 0, multiplier: 1 },
    { color: 'Coklat', hex: '#8B4513', value: 1, multiplier: 10 },
    { color: 'Merah', hex: '#FF0000', value: 2, multiplier: 100 },
    { color: 'Oranye', hex: '#FFA500', value: 3, multiplier: 1000 },
    { color: 'Kuning', hex: '#FFD700', value: 4, multiplier: 10000 },
    { color: 'Hijau', hex: '#008000', value: 5, multiplier: 100000 },
    { color: 'Biru', hex: '#0000FF', value: 6, multiplier: 1000000 },
    { color: 'Ungu', hex: '#800080', value: 7, multiplier: 10000000 },
    { color: 'Abu-abu', hex: '#808080', value: 8, multiplier: 100000000 },
    { color: 'Putih', hex: '#FFFFFF', value: 9, multiplier: 1000000000 }
  ]

  const toleranceCodes = [
    { color: 'Emas', hex: '#FFD700', value: '±5%' },
    { color: 'Perak', hex: '#C0C0C0', value: '±10%' },
    { color: 'Coklat', hex: '#8B4513', value: '±1%' },
    { color: 'Merah', hex: '#FF0000', value: '±2%' }
  ]

  const quizQuestions = [
    {
      question: 'Berapa nilai resistor dengan warna: Coklat-Hitam-Merah-Emas?',
      colors: [1, 0, 2, 11], // Emas = index 11
      answer: '1000',
      unit: 'Ω'
    },
    {
      question: 'Berapa nilai resistor dengan warna: Kuning-Ungu-Oranye-Emas?',
      colors: [4, 7, 3, 11],
      answer: '47000',
      unit: 'Ω'
    },
    {
      question: 'Berapa nilai resistor dengan warna: Merah-Merah-Coklat-Perak?',
      colors: [2, 2, 1, 12], // Perak = index 12
      answer: '220',
      unit: 'Ω'
    }
  ]

  const calculateResistance = () => {
    const digit1 = colorCodes[selectedBands[0]].value
    const digit2 = colorCodes[selectedBands[1]].value
    const multiplier = colorCodes[selectedBands[2]].multiplier
    
    const resistance = (digit1 * 10 + digit2) * multiplier
    
    let unit = 'Ω'
    let displayValue = resistance
    
    if (resistance >= 1000000) {
      displayValue = resistance / 1000000
      unit = 'MΩ'
    } else if (resistance >= 1000) {
      displayValue = resistance / 1000
      unit = 'kΩ'
    }
    
    const tolerance = selectedBands[3] === 10 ? '±5%' : selectedBands[3] === 11 ? '±10%' : '±5%'
    
    setCalculatedValue(`${displayValue} ${unit} ${tolerance}`)
  }

  const handleQuizSubmit = () => {
    let correct = 0
    quizQuestions.forEach((q, index) => {
      const userAnswer = quizAnswers[index].replace(/\s/g, '')
      if (userAnswer === q.answer) {
        correct++
      }
    })
    
    const scorePercent = Math.round((correct / quizQuestions.length) * 100)
    setQuizScore(scorePercent)
    
    // Save progress
    if (isAuthenticated) {
      const passed = scorePercent >= 70
      updateProgress(2, scorePercent, passed)
    }
  }

  const ResistorSVG = ({ bands }: { bands: number[] }) => (
    <svg viewBox="0 0 300 100" className="w-full max-w-md mx-auto">
      {/* Resistor body */}
      <rect x="80" y="35" width="140" height="30" fill="#D4A574" stroke="#8B6914" strokeWidth="2" rx="3"/>
      
      {/* Color bands */}
      {bands.map((bandIndex, index) => {
        const x = 95 + (index * 30)
        const color = index < 3 
          ? colorCodes[bandIndex]?.hex || '#808080'
          : index === 3 && bandIndex === 10 
            ? '#FFD700' 
            : bandIndex === 11 
              ? '#C0C0C0' 
              : '#FFD700'
        
        return (
          <rect
            key={index}
            x={x}
            y="33"
            width="10"
            height="34"
            fill={color}
            stroke="#000"
            strokeWidth="1"
          />
        )
      })}
      
      {/* Leads */}
      <line x1="10" y1="50" x2="80" y2="50" stroke="#666" strokeWidth="4"/>
      <line x1="220" y1="50" x2="290" y2="50" stroke="#666" strokeWidth="4"/>
      <circle cx="10" cy="50" r="4" fill="#666"/>
      <circle cx="290" cy="50" r="4" fill="#666"/>
      
      {/* Labels */}
      <text x="95" y="85" fontSize="10" fill="#333">Digit1</text>
      <text x="125" y="85" fontSize="10" fill="#333">Digit2</text>
      <text x="150" y="85" fontSize="10" fill="#333">Multi</text>
      <text x="180" y="85" fontSize="10" fill="#333">Tol</text>
    </svg>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 py-8 px-4">
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
              <span className="text-yellow-300 font-bold">Level 2 - Sedang</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              🎨 Kode Warna Resistor
            </h1>
          </motion.div>
          <Button onClick={() => setShowQuiz(!showQuiz)}>
            {showQuiz ? '🔧 Kalkulator' : '📝 Quiz'}
          </Button>
        </div>

        {!showQuiz ? (
          <>
            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-3">📚 Cara Membaca Kode Warna</h2>
              <div className="space-y-2 text-lg">
                <p>1️⃣ <strong>Gelang 1 & 2:</strong> Digit pertama dan kedua</p>
                <p>2️⃣ <strong>Gelang 3:</strong> Multiplier (pengali)</p>
                <p>3️⃣ <strong>Gelang 4:</strong> Toleransi</p>
                <p className="mt-4 bg-white/20 p-3 rounded-lg">
                  <strong>Rumus:</strong> (Digit1 × 10 + Digit2) × Multiplier
                </p>
              </div>
            </motion.div>

            {/* Color Code Table */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card gradient="from-white to-gray-50" hover={false}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎨 Kode Warna Digit</h3>
                <div className="space-y-2">
                  {colorCodes.map((code) => (
                    <div key={code.color} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-8 rounded border-2 border-gray-300"
                          style={{ backgroundColor: code.hex }}
                        />
                        <span className="font-medium">{code.color}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{code.value}</div>
                        <div className="text-xs text-gray-600">×{code.multiplier}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card gradient="from-white to-gray-50" hover={false}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📏 Kode Toleransi</h3>
                <div className="space-y-3">
                  {toleranceCodes.map((code) => (
                    <div key={code.color} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-8 rounded border-2 border-gray-300"
                          style={{ backgroundColor: code.hex }}
                        />
                        <span className="font-medium">{code.color}</span>
                      </div>
                      <span className="font-bold text-green-600">{code.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">💡 Contoh:</h4>
                  <p className="text-gray-700 mb-2">
                    <strong>Coklat-Hitam-Merah-Emas</strong>
                  </p>
                  <p className="text-gray-700">
                    = (1 × 10 + 0) × 100 = 1000Ω = 1kΩ ±5%
                  </p>
                </div>
              </Card>
            </div>

            {/* Interactive Calculator */}
            <Card gradient="from-yellow-400 to-orange-500" hover={false}>
              <h3 className="text-2xl font-bold text-white mb-6">🧮 Kalkulator Resistor</h3>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <ResistorSVG bands={selectedBands} />
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {['Gelang 1', 'Gelang 2', 'Multiplier', 'Toleransi'].map((label, bandIndex) => (
                  <div key={label}>
                    <label className="block text-white font-bold mb-2">{label}</label>
                    <select
                      value={selectedBands[bandIndex]}
                      onChange={(e) => {
                        const newBands = [...selectedBands]
                        newBands[bandIndex] = parseInt(e.target.value)
                        setSelectedBands(newBands)
                      }}
                      className="w-full p-2 rounded border-2 border-white/30 bg-white/90 text-gray-900 font-medium"
                    >
                      {bandIndex < 3
                        ? colorCodes.map((code, index) => (
                            <option key={index} value={index}>
                              {code.color} ({code.value})
                            </option>
                          ))
                        : [
                            <option key="gold" value={10}>Emas (±5%)</option>,
                            <option key="silver" value={11}>Perak (±10%)</option>
                          ]
                      }
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Button onClick={calculateResistance} size="lg" className="flex-1">
                  Hitung Nilai
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedBands([0, 0, 0, 10])
                    setCalculatedValue('')
                  }}
                >
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>

              {calculatedValue && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-6 bg-white rounded-xl text-center"
                >
                  <p className="text-gray-600 mb-2">Nilai Resistor:</p>
                  <p className="text-4xl font-bold text-blue-600">{calculatedValue}</p>
                </motion.div>
              )}
            </Card>
          </>
        ) : (
          /* Quiz Section */
          <Card gradient="from-white to-gray-50" hover={false}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📝 Quiz Kode Warna</h3>

            <div className="space-y-6">
              {quizQuestions.map((q, index) => (
                <div key={index} className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="font-bold text-gray-900 mb-4 text-lg">
                    {index + 1}. {q.question}
                  </p>
                  
                  <div className="mb-4">
                    <ResistorSVG bands={q.colors} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={quizAnswers[index]}
                      onChange={(e) => {
                        const newAnswers = [...quizAnswers]
                        newAnswers[index] = e.target.value
                        setQuizAnswers(newAnswers)
                      }}
                      placeholder="Masukkan nilai (contoh: 1000)"
                      className="flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg text-gray-900 bg-white"
                      disabled={quizScore !== null}
                    />
                    <span className="font-bold text-gray-900 text-lg">{q.unit}</span>
                  </div>

                  {quizScore !== null && (
                    <div className="mt-3">
                      {quizAnswers[index].replace(/\s/g, '') === q.answer ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-bold">Benar!</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center text-red-600">
                            <X className="w-5 h-5 mr-2" />
                            <span className="font-bold">Salah!</span>
                          </div>
                          <p className="text-gray-700">
                            Jawaban yang benar: <strong>{q.answer} {q.unit}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {quizScore === null ? (
              <Button onClick={handleQuizSubmit} size="lg" className="w-full mt-6">
                Submit Jawaban
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-6 rounded-xl text-center ${
                  quizScore >= 70
                    ? 'bg-gradient-to-r from-green-400 to-teal-500'
                    : 'bg-gradient-to-r from-orange-400 to-red-500'
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {quizScore >= 70 ? '🎉 Lulus!' : '💪 Coba Lagi!'}
                </h3>
                <p className="text-4xl font-bold text-white mb-4">{quizScore}%</p>
                <p className="text-white">
                  {quizScore >= 70
                    ? '✅ Level 3 telah terbuka!'
                    : '❌ Skor minimal 70% untuk lanjut'}
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuizScore(null)
                    setQuizAnswers(['', '', ''])
                  }}
                  className="mt-4"
                >
                  <RefreshCw className="w-5 h-5 mr-2 inline" />
                  Ulangi Quiz
                </Button>
              </motion.div>
            )}
          </Card>
        )}
      </div>
    </main>
  )
}
