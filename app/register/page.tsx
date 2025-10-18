'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UserPlus, User, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { useAuth } from '@/contexts/AuthContext'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  if (isAuthenticated) {
    router.push('/')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok!')
      return
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!')
      return
    }

    if (formData.username.length < 3) {
      setError('Username minimal 3 karakter!')
      return
    }

    setLoading(true)

    try {
      const success = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.displayName
      )

      if (success) {
        router.push('/')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
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
            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-full">
              <UserPlus className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Daftar Akun Baru</h1>
          <p className="text-green-200 text-lg">Mulai perjalanan belajarmu di MekaGame!</p>
        </div>

        {/* Register Card */}
        <Card gradient="from-white to-gray-50" hover={false}>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username123"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium"
                required
                minLength={3}
                autoComplete="username"
              />
              <p className="text-xs text-gray-500 mt-1">Minimal 3 karakter, tanpa spasi</p>
            </div>

            {/* Display Name Field */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-bold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Ahmad Budi"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium"
                required
                autoComplete="name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Konfirmasi Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ketik ulang password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 font-medium"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            {/* Info Box */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-900">
                  <p className="font-bold mb-1">Dengan mendaftar, kamu bisa:</p>
                  <ul className="space-y-1 ml-4">
                    <li>💾 Simpan progres belajar</li>
                    <li>🏆 Masuk leaderboard</li>
                    <li>📊 Lihat statistik lengkap</li>
                    <li>⭐ Kumpulkan skor & achievement</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Mendaftar...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2 inline" />
                  Daftar Sekarang
                </>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-bold hover:underline">
                  Login Di Sini
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
      </motion.div>
    </main>
  )
}
