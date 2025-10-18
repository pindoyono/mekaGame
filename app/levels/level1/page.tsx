'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, X } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import { useAuth } from '@/contexts/AuthContext'

interface Component {
  id: string
  name: string
  symbol: string
  description: string
  function: string
  applications: string[]
  image: JSX.Element
}

export default function Level1Electronics() {
  const { updateProgress, isAuthenticated } = useAuth()
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const components: Component[] = [
    {
      id: 'resistor',
      name: 'Resistor',
      symbol: 'R',
      description: 'Komponen pasif yang menghambat arus listrik',
      function: 'Membatasi arus listrik yang mengalir dalam rangkaian',
      applications: ['Pembagi tegangan', 'Pembatas arus LED', 'Pull-up/Pull-down'],
      image: (
        <svg viewBox="0 0 200 80" className="w-full h-32">
          {/* Resistor body */}
          <rect x="60" y="30" width="80" height="20" fill="#D4A574" stroke="#8B6914" strokeWidth="2" rx="2"/>
          {/* Color bands */}
          <rect x="70" y="28" width="6" height="24" fill="#8B4513"/>
          <rect x="85" y="28" width="6" height="24" fill="#FF0000"/>
          <rect x="100" y="28" width="6" height="24" fill="#FFD700"/>
          <rect x="115" y="28" width="6" height="24" fill="#C0C0C0"/>
          {/* Leads */}
          <line x1="10" y1="40" x2="60" y2="40" stroke="#666" strokeWidth="3"/>
          <line x1="140" y1="40" x2="190" y2="40" stroke="#666" strokeWidth="3"/>
          <circle cx="10" cy="40" r="3" fill="#666"/>
          <circle cx="190" cy="40" r="3" fill="#666"/>
        </svg>
      )
    },
    {
      id: 'capacitor',
      name: 'Kapasitor',
      symbol: 'C',
      description: 'Komponen yang menyimpan muatan listrik sementara',
      function: 'Menyimpan dan melepaskan energi listrik',
      applications: ['Filter noise', 'Coupling sinyal', 'Power supply smoothing'],
      image: (
        <svg viewBox="0 0 200 80" className="w-full h-32">
          {/* Capacitor body */}
          <rect x="75" y="20" width="50" height="40" fill="#4169E1" stroke="#000080" strokeWidth="2" rx="3"/>
          <line x1="100" y1="20" x2="100" y2="60" stroke="white" strokeWidth="2"/>
          {/* Polarity mark */}
          <text x="85" y="50" fill="white" fontSize="24" fontWeight="bold">+</text>
          {/* Leads */}
          <line x1="10" y1="40" x2="75" y2="40" stroke="#666" strokeWidth="3"/>
          <line x1="125" y1="40" x2="190" y2="40" stroke="#666" strokeWidth="3"/>
          <circle cx="10" cy="40" r="3" fill="#666"/>
          <circle cx="190" cy="40" r="3" fill="#666"/>
          {/* Label */}
          <text x="85" y="75" fill="#333" fontSize="12">100µF</text>
        </svg>
      )
    },
    {
      id: 'diode',
      name: 'Dioda',
      symbol: 'D',
      description: 'Komponen semikonduktor yang mengalirkan arus satu arah',
      function: 'Menyearahkan arus AC menjadi DC',
      applications: ['Penyearah arus', 'Proteksi polaritas', 'LED'],
      image: (
        <svg viewBox="0 0 200 80" className="w-full h-32">
          {/* Diode body */}
          <rect x="70" y="25" width="60" height="30" fill="#1a1a1a" stroke="#666" strokeWidth="2" rx="2"/>
          {/* Cathode mark (silver band) */}
          <rect x="120" y="23" width="8" height="34" fill="#C0C0C0"/>
          {/* Leads */}
          <line x1="10" y1="40" x2="70" y2="40" stroke="#666" strokeWidth="3"/>
          <line x1="130" y1="40" x2="190" y2="40" stroke="#666" strokeWidth="3"/>
          <circle cx="10" cy="40" r="3" fill="#666"/>
          <circle cx="190" cy="40" r="3" fill="#666"/>
          {/* Anode/Cathode labels */}
          <text x="30" y="70" fill="#666" fontSize="12">Anoda</text>
          <text x="145" y="70" fill="#666" fontSize="12">Katoda</text>
        </svg>
      )
    }
  ]

  const quizQuestions = [
    {
      question: 'Fungsi utama resistor dalam rangkaian elektronika adalah?',
      options: [
        'Menyimpan muatan listrik',
        'Menghambat dan membatasi arus listrik',
        'Menyearahkan arus',
        'Menguatkan sinyal'
      ],
      correct: 1,
      explanation: 'Resistor berfungsi untuk menghambat dan membatasi arus listrik yang mengalir dalam rangkaian.'
    },
    {
      question: 'Kapasitor digunakan untuk?',
      options: [
        'Menyearahkan arus AC',
        'Membatasi arus',
        'Menyimpan muatan listrik sementara',
        'Menghasilkan cahaya'
      ],
      correct: 2,
      explanation: 'Kapasitor menyimpan muatan listrik sementara dan dapat melepaskannya saat dibutuhkan.'
    },
    {
      question: 'Dioda mengalirkan arus listrik ke arah?',
      options: [
        'Dua arah (bolak-balik)',
        'Satu arah saja (dari anoda ke katoda)',
        'Tidak mengalirkan arus',
        'Tergantung tegangan'
      ],
      correct: 1,
      explanation: 'Dioda hanya mengalirkan arus satu arah, dari anoda (positif) ke katoda (negatif).'
    },
    {
      question: 'Simbol resistor pada skema rangkaian adalah?',
      options: [
        'Dua garis paralel',
        'Segitiga dengan garis',
        'Garis zigzag atau kotak',
        'Lingkaran dengan garis'
      ],
      correct: 2,
      explanation: 'Resistor disimbolkan dengan garis zigzag (standar Amerika) atau kotak (standar Eropa).'
    },
    {
      question: 'Satuan kapasitansi kapasitor adalah?',
      options: [
        'Ohm (Ω)',
        'Farad (F)',
        'Henry (H)',
        'Watt (W)'
      ],
      correct: 1,
      explanation: 'Satuan kapasitansi adalah Farad (F), umumnya dalam mikrofarad (µF) atau pikofarad (pF).'
    }
  ]

  const handleAnswerClick = (selectedIndex: number) => {
    if (answered) return
    
    setAnswered(true)
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 20)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setAnswered(false)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const finalScore = Math.round((score / quizQuestions.length) * 5)
  const passed = finalScore >= 70

  // Save progress when quiz is completed
  useEffect(() => {
    if (quizCompleted && isAuthenticated) {
      updateProgress(1, finalScore, passed)
    }
  }, [quizCompleted, finalScore, passed, isAuthenticated, updateProgress])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 py-8 px-4">
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
              <span className="text-green-300 font-bold">Level 1 - Mudah</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              📦 Komponen Elektronika Dasar
            </h1>
          </motion.div>
          <Button onClick={() => setShowQuiz(true)}>
            📝 Mulai Quiz
          </Button>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-3">🎯 Tujuan Pembelajaran</h2>
          <ul className="space-y-2 text-lg">
            <li>✅ Mengenal komponen elektronika dasar (Resistor, Kapasitor, Dioda)</li>
            <li>✅ Memahami simbol dan bentuk fisik komponen</li>
            <li>✅ Mengetahui fungsi dan aplikasi setiap komponen</li>
          </ul>
        </motion.div>

        {/* Component Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {components.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card
                gradient="from-white to-gray-50"
                onClick={() => setSelectedComponent(component)}
              >
                <div className="mb-4 bg-gray-100 rounded-lg p-4">
                  {component.image}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {component.name}
                  </h3>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {component.symbol}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{component.description}</p>
                <div className="text-blue-600 font-semibold">
                  Pelajari Lebih Lanjut →
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail Modal */}
        <Modal
          isOpen={selectedComponent !== null}
          onClose={() => setSelectedComponent(null)}
          title={selectedComponent?.name}
          size="lg"
        >
          {selectedComponent && (
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-xl p-6">
                {selectedComponent.image}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {selectedComponent.symbol}
                  </span>
                  Simbol: {selectedComponent.symbol}
                </h3>
                <p className="text-gray-700">{selectedComponent.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">⚙️ Fungsi</h3>
                <p className="text-gray-700">{selectedComponent.function}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">🔧 Aplikasi</h3>
                <ul className="space-y-2">
                  {selectedComponent.applications.map((app, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-900">
                  <strong>💡 Tips:</strong> Pahami dengan baik karakteristik komponen ini 
                  karena akan sering digunakan dalam rangkaian elektronika!
                </p>
              </div>
            </div>
          )}
        </Modal>

        {/* Quiz Modal */}
        <Modal
          isOpen={showQuiz}
          onClose={() => {
            if (quizCompleted) {
              setShowQuiz(false)
              setCurrentQuestion(0)
              setScore(0)
              setAnswered(false)
              setQuizCompleted(false)
            }
          }}
          title="🎯 Quiz Level 1"
          size="lg"
        >
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl">
                <span className="text-lg font-bold text-white">
                  📝 Soal {currentQuestion + 1} dari {quizQuestions.length}
                </span>
                <span className="bg-white text-green-600 px-4 py-2 rounded-full font-bold text-lg">
                  Skor: {score}
                </span>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === quizQuestions[currentQuestion].correct
                    const showResult = answered

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: answered ? 1 : 1.02 }}
                        whileTap={{ scale: answered ? 1 : 0.98 }}
                        onClick={() => handleAnswerClick(index)}
                        disabled={answered}
                        className={`w-full p-4 rounded-lg text-left font-medium transition-all text-lg ${
                          !showResult
                            ? 'bg-white hover:bg-blue-50 border-2 border-gray-300 text-gray-900'
                            : isCorrect
                            ? 'bg-green-500 text-white border-2 border-green-600'
                            : 'bg-gray-300 text-gray-800 border-2 border-gray-400'
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
                    )
                  })}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="text-blue-900 text-base">
                      <strong className="text-lg">💡 Penjelasan:</strong> {quizQuestions[currentQuestion].explanation}
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
              <div className={`p-8 rounded-2xl ${passed ? 'bg-gradient-to-r from-green-400 to-teal-500' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {passed ? '🎉 Selamat!' : '💪 Coba Lagi!'}
                </h2>
                <p className="text-2xl text-white mb-2">Skor Akhir</p>
                <p className="text-6xl font-bold text-white">{finalScore}%</p>
              </div>

              <div className="space-y-4 text-left bg-gray-50 p-6 rounded-xl">
                <p className="text-xl text-gray-900">
                  <strong>✅ Jawaban Benar:</strong> {score / 20} dari {quizQuestions.length}
                </p>
                <p className="text-xl text-gray-900">
                  <strong>🎯 Passing Grade:</strong> 70%
                </p>
                <p className="text-xl text-gray-900">
                  <strong>📊 Status:</strong>{' '}
                  <span className={passed ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {passed ? '✅ LULUS - Level 2 Terbuka!' : '❌ Belum Lulus - Ulangi Quiz'}
                  </span>
                </p>
              </div>

              {passed && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-900">
                    <strong>🎓 Lanjut ke Level 2:</strong> Kode Warna Resistor
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </Modal>
      </div>
    </main>
  )
}
