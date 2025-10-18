'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LogIn, User, Lock, AlertCircle } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  if (isAuthenticated) {
    router.push('/')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(username, password)
      if (success) {
        router.push('/')
      } else {
        setError('Login gagal! Periksa username dan password.')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-full">
              <LogIn className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Selamat Datang!</h1>
          <p className="text-blue-200 text-lg">Login ke MekaGame untuk melanjutkan belajar</p>
        </div>

        {/* Login Card */}
        <Card gradient="from-white to-gray-50" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium"
                required
                autoComplete="username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 font-medium"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Demo Account Info */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Demo:</strong> Gunakan username apapun (min. 3 karakter) dan password min. 6 karakter
              </p>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2 inline" />
                  Login
                </>
              )}
            </Button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">
                  Daftar Sekarang
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm hover:underline">
                ← Kembali ke Beranda
              </Link>
            </div>
          </form>
        </Card>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl mb-1">💾</p>
              <p className="text-white text-xs font-medium">Simpan Progres</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl mb-1">🏆</p>
              <p className="text-white text-xs font-medium">Leaderboard</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl mb-1">📊</p>
              <p className="text-white text-xs font-medium">Statistik</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
