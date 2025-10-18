'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, BookOpen, Home, User, PlayCircle, Trophy, 
  HelpCircle, Lightbulb, Target, CheckCircle, Star,
  ChevronRight, BookMarked, GraduationCap
} from 'lucide-react'

export default function PanduanPage() {
  const [activeSection, setActiveSection] = useState('memulai')

  const sections = [
    { id: 'memulai', title: 'Cara Memulai', icon: PlayCircle },
    { id: 'level', title: 'Penjelasan Level', icon: Target },
    { id: 'poin', title: 'Sistem Poin', icon: Trophy },
    { id: 'tips', title: 'Tips Bermain', icon: Lightbulb },
    { id: 'faq', title: 'FAQ', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Kembali</span>
              </Link>
              <div className="h-6 w-px bg-slate-600"></div>
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-400" size={28} />
                <h1 className="text-2xl font-bold">Panduan MekaGame</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 sticky top-24">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BookMarked size={20} className="text-blue-400" />
                Daftar Isi
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{section.title}</span>
                      {activeSection === section.id && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
            >
              {/* Cara Memulai */}
              {activeSection === 'memulai' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <PlayCircle className="text-blue-400" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Cara Memulai</h2>
                      <p className="text-gray-400">Panduan step-by-step untuk pemula</p>
                    </div>
                  </div>

                  {/* Registrasi */}
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <User size={20} className="text-green-400" />
                      1. Registrasi Akun
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                        <span>Buka website MekaGame</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                        <span>Klik tombol <strong>"Daftar"</strong> di pojok kanan atas</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
                        <div>
                          <span>Isi form registrasi:</span>
                          <ul className="ml-6 mt-2 space-y-1 text-sm">
                            <li>• <strong>Username:</strong> Minimal 3 karakter</li>
                            <li>• <strong>Email:</strong> Email valid</li>
                            <li>• <strong>Password:</strong> Minimal 6 karakter</li>
                            <li>• <strong>Nama Lengkap:</strong> Nama lengkap kamu</li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
                        <span>Klik <strong>"Daftar"</strong></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
                        <span className="font-semibold text-green-400">Akun kamu sudah siap!</span>
                      </li>
                    </ol>
                  </div>

                  {/* Login */}
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Home size={20} className="text-blue-400" />
                      2. Login ke Akun
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                        <span>Klik tombol <strong>"Login"</strong> di pojok kanan atas</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                        <span>Masukkan <strong>Username</strong> dan <strong>Password</strong></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm">3</span>
                        <span>Klik <strong>"Login"</strong></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm">✓</span>
                        <span className="font-semibold text-green-400">Selamat bermain!</span>
                      </li>
                    </ol>
                    <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-600/50 rounded-lg">
                      <p className="text-sm text-yellow-300">
                        💡 <strong>Lupa password?</strong> Tanya guru kamu untuk bantuan reset akun
                      </p>
                    </div>
                  </div>

                  {/* Mulai Bermain */}
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <PlayCircle size={20} className="text-purple-400" />
                      3. Mulai Bermain
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>Setelah login, kamu akan melihat <strong>12 Level</strong> yang harus diselesaikan berurutan:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-green-900/20 border border-green-600/50 rounded-lg">
                          <span className="text-green-400 font-bold">🟢 Hijau (Terbuka)</span>
                          <p className="text-sm mt-1">Level bisa dimainkan</p>
                        </div>
                        <div className="p-3 bg-gray-700/20 border border-gray-600/50 rounded-lg">
                          <span className="text-gray-400 font-bold">⚫ Abu-abu (Terkunci)</span>
                          <p className="text-sm mt-1">Selesaikan level sebelumnya dulu</p>
                        </div>
                      </div>
                      <p className="mt-4">
                        <strong>Cara unlock level berikutnya:</strong> Dapatkan skor minimal <span className="text-yellow-400 font-bold">70%</span> di level saat ini
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Penjelasan Level */}
              {activeSection === 'level' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-600/20 rounded-lg">
                      <Target className="text-purple-400" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">12 Level Pembelajaran</h2>
                      <p className="text-gray-400">Dari dasar hingga advanced</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Level 1-4 */}
                    <div className="bg-gradient-to-r from-green-900/20 to-slate-900/50 border border-green-600/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-green-400">🟢 Level Dasar (1-4)</h3>
                      <div className="space-y-3">
                        <LevelCard 
                          number={1}
                          title="Komponen Elektronika Dasar"
                          topics={['Resistor, Kapasitor, Dioda', 'Fungsi dan simbol komponen']}
                          duration="15 menit"
                        />
                        <LevelCard 
                          number={2}
                          title="Kode Warna Resistor"
                          topics={['Membaca kode warna', 'Menghitung nilai resistansi']}
                          duration="20 menit"
                        />
                        <LevelCard 
                          number={3}
                          title="Simbol Gambar Teknik"
                          topics={['Simbol elektronika standar', 'Matching game']}
                          duration="20 menit"
                        />
                        <LevelCard 
                          number={4}
                          title="Gerbang Logika Digital"
                          topics={['AND, OR, NOT, XOR', 'Truth table', 'Half Adder']}
                          duration="30 menit"
                        />
                      </div>
                    </div>

                    {/* Level 5-8 */}
                    <div className="bg-gradient-to-r from-yellow-900/20 to-slate-900/50 border border-yellow-600/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-yellow-400">🟡 Level Menengah (5-8)</h3>
                      <div className="space-y-3">
                        <LevelCard 
                          number={5}
                          title="Sensor & Transduser"
                          topics={['LDR, Ultrasonik, PIR, Suhu', 'Aplikasi sensor']}
                          duration="30 menit"
                        />
                        <LevelCard 
                          number={6}
                          title="Transistor & IC"
                          topics={['NPN dan PNP', 'IC 555 Timer']}
                          duration="35 menit"
                        />
                        <LevelCard 
                          number={7}
                          title="Aktuator & Motor"
                          topics={['Motor DC, Servo, Relay', 'PWM control']}
                          duration="30 menit"
                        />
                        <LevelCard 
                          number={8}
                          title="Rangkaian Elektronika"
                          topics={['Hukum Ohm', 'Rangkaian Seri & Paralel']}
                          duration="40 menit"
                        />
                      </div>
                    </div>

                    {/* Level 9-12 */}
                    <div className="bg-gradient-to-r from-red-900/20 to-slate-900/50 border border-red-600/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-red-400">🔴 Level Advanced (9-12)</h3>
                      <div className="space-y-3">
                        <LevelCard 
                          number={9}
                          title="Mikrokontroler Arduino"
                          topics={['Programming Arduino', 'pinMode, digitalWrite']}
                          duration="45 menit"
                        />
                        <LevelCard 
                          number={10}
                          title="Sistem Kontrol PID"
                          topics={['Tuning Kp, Ki, Kd', '5 Challenge PID']}
                          duration="60 menit"
                        />
                        <LevelCard 
                          number={11}
                          title="PLC & SCADA"
                          topics={['Ladder Logic', 'Timer, Counter', '5 Challenge PLC']}
                          duration="60 menit"
                        />
                        <LevelCard 
                          number={12}
                          title="Final Assessment"
                          topics={['Ujian akhir', '12 soal pilihan ganda']}
                          duration="20 menit"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sistem Poin */}
              {activeSection === 'poin' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-yellow-600/20 rounded-lg">
                      <Trophy className="text-yellow-400" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Sistem Poin & Ranking</h2>
                      <p className="text-gray-400">Cara kerja poin dan leaderboard</p>
                    </div>
                  </div>

                  {/* Cara Kerja Poin */}
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Cara Kerja Poin</h3>
                    <div className="space-y-4">
                      <p className="text-gray-300">Setiap level memiliki <strong>skor maksimal 100 poin</strong>:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">❌</span>
                            <span className="font-bold text-red-400">Skor 0-69%</span>
                          </div>
                          <p className="text-sm text-gray-300">Level GAGAL - Tidak unlock level berikutnya</p>
                        </div>
                        
                        <div className="p-4 bg-green-900/20 border border-green-600/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">✅</span>
                            <span className="font-bold text-green-400">Skor 70-100%</span>
                          </div>
                          <p className="text-sm text-gray-300">Level LULUS - Unlock level berikutnya</p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/50 rounded-lg">
                        <h4 className="font-bold mb-2 text-blue-400">Total Poin:</h4>
                        <p className="text-gray-300">Total Poin = Jumlah skor semua level</p>
                        <p className="text-gray-300">Maksimal = <span className="text-yellow-400 font-bold">12 level × 100 = 1200 poin</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard */}
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Trophy className="text-yellow-400" size={20} />
                      Leaderboard
                    </h3>
                    <div className="space-y-4 text-gray-300">
                      <p>Klik tombol <strong>"🏆 Lihat Leaderboard"</strong> di homepage untuk melihat ranking</p>
                      
                      <div className="space-y-3">
                        <p className="font-semibold">Ranking berdasarkan:</p>
                        <ol className="space-y-2 ml-4">
                          <li className="flex gap-2">
                            <span className="text-yellow-400">1.</span>
                            <span>Total skor tertinggi</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-yellow-400">2.</span>
                            <span>Jumlah level selesai terbanyak</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-yellow-400">3.</span>
                            <span>Tanggal registrasi (lebih dulu = lebih tinggi)</span>
                          </li>
                        </ol>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="p-3 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg text-center">
                          <div className="text-3xl mb-1">🥇</div>
                          <div className="font-bold text-sm">Peringkat #1</div>
                          <div className="text-xs opacity-90">CHAMPION</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg text-center">
                          <div className="text-3xl mb-1">🥈</div>
                          <div className="font-bold text-sm">Peringkat #2</div>
                          <div className="text-xs opacity-90">Silver</div>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg text-center">
                          <div className="text-3xl mb-1">🥉</div>
                          <div className="font-bold text-sm">Peringkat #3</div>
                          <div className="text-xs opacity-90">Bronze</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips Bermain */}
              {activeSection === 'tips' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-600/20 rounded-lg">
                      <Lightbulb className="text-orange-400" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Tips Bermain MekaGame</h2>
                      <p className="text-gray-400">Strategi untuk sukses</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TipCard
                      icon={<Target className="text-blue-400" size={24} />}
                      title="Mulai dari Level 1"
                      description="Jangan skip level! Setiap level membangun pengetahuan dari level sebelumnya."
                    />
                    
                    <TipCard
                      icon={<BookOpen className="text-green-400" size={24} />}
                      title="Baca Instruksi"
                      description="Baca deskripsi challenge dengan teliti sebelum mulai."
                    />
                    
                    <TipCard
                      icon={<CheckCircle className="text-purple-400" size={24} />}
                      title="Jangan Takut Salah"
                      description="Salah = kesempatan belajar! Ulangi level sampai paham."
                    />
                    
                    <TipCard
                      icon={<Star className="text-yellow-400" size={24} />}
                      title="Simpan Progress"
                      description="Klik 'Simpan & Keluar' jika perlu istirahat. Progress akan tersimpan."
                    />
                    
                    <TipCard
                      icon={<BookMarked className="text-red-400" size={24} />}
                      title="Lihat Dokumentasi"
                      description="Baca PANDUAN_LEVEL11_PLC.md untuk panduan PLC lengkap."
                    />
                    
                    <TipCard
                      icon={<Trophy className="text-orange-400" size={24} />}
                      title="Kompetisi Sehat"
                      description="Lihat leaderboard untuk motivasi, bantu teman yang kesulitan."
                    />
                  </div>

                  {/* Tips Khusus per Level */}
                  <div className="bg-slate-900/50 rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-bold mb-4">Tips Khusus per Level</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="font-bold text-green-400 mb-1">Level 2 (Kode Warna):</p>
                        <p className="text-sm">Hafalkan: Hitam=0, Coklat=1, Merah=2, Orange=3, Kuning=4</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="font-bold text-yellow-400 mb-1">Level 9 (Arduino):</p>
                        <p className="text-sm">Jangan lupa semicolon (;) dan pinMode di setup()</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="font-bold text-orange-400 mb-1">Level 10 (PID):</p>
                        <p className="text-sm">Mulai Kp=1.0, Ki=0.1, Kd=0.05. Naikkan perlahan!</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="font-bold text-red-400 mb-1">Level 11 (PLC):</p>
                        <p className="text-sm">Klik komponen untuk edit address. Right-click untuk hapus.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ */}
              {activeSection === 'faq' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-600/20 rounded-lg">
                      <HelpCircle className="text-green-400" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">FAQ</h2>
                      <p className="text-gray-400">Pertanyaan yang sering ditanyakan</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FAQItem
                      question="Saya lupa password, bagaimana?"
                      answer="Tanya guru kamu untuk bantuan reset akun atau buat akun baru (tapi progress lama hilang)."
                    />
                    
                    <FAQItem
                      question="Level berikutnya masih locked, kenapa?"
                      answer="Kamu harus dapat skor minimal 70% di level sebelumnya untuk unlock level berikutnya."
                    />
                    
                    <FAQItem
                      question="Progress tidak tersimpan?"
                      answer="Klik tombol 'Simpan & Keluar' sebelum tutup browser. Auto-save sudah aktif tapi lebih baik manual save."
                    />
                    
                    <FAQItem
                      question="Bagaimana cara dapat poin tinggi?"
                      answer="Jawab dengan benar dan cepat, minimal kesalahan, selesaikan semua challenge di satu level."
                    />
                    
                    <FAQItem
                      question="Level PLC (11) susah, ada panduan?"
                      answer="Ada! Baca file PANDUAN_LEVEL11_PLC.md untuk diagram lengkap setiap challenge."
                    />
                    
                    <FAQItem
                      question="PID Controller gimana tuning-nya?"
                      answer="Mulai Kp=1.0, Ki=0.1, Kd=0.05. Naikkan Kp sampai cepat, Ki untuk hilangkan error, Kd untuk stabilkan."
                    />
                    
                    <FAQItem
                      question="Bisa main di HP?"
                      answer="Bisa! Tapi lebih nyaman di laptop/PC karena ada simulator dan editor code."
                    />
                    
                    <FAQItem
                      question="Berapa lama selesai semua level?"
                      answer="Tergantung kemampuan. Rata-rata: Level 1-3 (10-15 menit), Level 4-8 (20-30 menit), Level 9-11 (30-60 menit), Level 12 (15-20 menit). Total: 4-6 jam untuk pemula."
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-8 border border-blue-700/50 text-center">
          <GraduationCap className="mx-auto text-blue-400 mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-2">Siap Mulai Belajar?</h3>
          <p className="text-gray-300 mb-6">
            Daftar sekarang dan mulai petualangan belajar mekatronika yang seru!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-all"
            >
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function LevelCard({ number, title, topics, duration }: { 
  number: number
  title: string
  topics: string[]
  duration: string
}) {
  return (
    <div className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-all">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
          {number}
        </div>
        <div className="flex-1">
          <h4 className="font-bold mb-1">{title}</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            {topics.map((topic, i) => (
              <li key={i}>• {topic}</li>
            ))}
          </ul>
          <p className="text-xs text-blue-400 mt-2">⏱️ {duration}</p>
        </div>
      </div>
    </div>
  )
}

function TipCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 bg-slate-800 rounded-lg">
          {icon}
        </div>
        <div>
          <h4 className="font-bold mb-1">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
      <h4 className="font-bold text-blue-400 mb-2 flex items-start gap-2">
        <HelpCircle size={20} className="flex-shrink-0 mt-0.5" />
        <span>{question}</span>
      </h4>
      <p className="text-gray-300 text-sm ml-7">{answer}</p>
    </div>
  )
}
