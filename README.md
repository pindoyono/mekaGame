# 🎮 MekaGame - Game Edukasi Mekatronika & Elektronika

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-cyan?style=for-the-badge&logo=tailwind-css)

## 📖 Deskripsi

**MekaGame** adalah platform pembelajaran interaktif yang dirancang khusus untuk siswa SMK jurusan Mekatronika dan Elektronika. Game ini mengubah materi pembelajaran yang kompleks menjadi pengalaman belajar yang menyenangkan dan mudah dipahami.

## ✨ Fitur Utama

### 🎯 4 Modul Pembelajaran Interaktif

1. **Modul Sensor** 🔍
   - Pelajari 6 jenis sensor berbeda
   - Animasi interaktif untuk setiap sensor
   - Quiz dengan sistem penilaian
   - Penjelasan prinsip kerja dan aplikasi

2. **Modul Aktuator** ⚙️
   - Simulasi Motor DC dengan kontrol kecepatan
   - Simulasi Motor Servo dengan kontrol sudut
   - Simulasi LED dengan kontrol kecerahan
   - Pemahaman tentang relay dan komponen lainnya

3. **Modul Rangkaian Elektronika** ⚡
   - Canvas interaktif drag-and-drop
   - Toolbox komponen lengkap (Resistor, LED, Baterai, Saklar, Kapasitor)
   - Simulasi rangkaian hidup/mati
   - Statistik komponen real-time

4. **Modul Arduino** 💻
   - 4 level pembelajaran dari Pemula hingga Lanjutan
   - Editor kode Arduino terintegrasi
   - Output console real-time
   - Visualisasi Arduino board dengan highlight pin aktif
   - Contoh program: Blink LED, Serial Monitor, Baca Sensor, Kontrol Motor

### 🎨 Fitur Tambahan

- ✅ Animasi smooth dengan Framer Motion
- ✅ Design responsif untuk semua device
- ✅ Dark mode otomatis
- ✅ Progress tracking
- ✅ Sistem scoring dan poin
- ✅ UI/UX modern dan menarik
- ✅ Icon yang intuitif dengan Lucide React

## 🚀 Teknologi yang Digunakan

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS 3.3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: npm/yarn

## 📦 Instalasi

### Prasyarat

- Node.js 18+ 
- npm atau yarn

### Langkah Instalasi

1. Clone repository atau extract folder project

```bash
cd /var/www/mekaGame
```

2. Install dependencies

```bash
npm install
```

atau

```bash
yarn install
```

3. Jalankan development server

```bash
npm run dev
```

atau

```bash
yarn dev
```

4. Buka browser dan akses:

```
http://localhost:3000
```

## 🎯 Cara Menggunakan

### Untuk Siswa

1. **Mulai dari Home**
   - Pilih salah satu dari 4 modul yang tersedia
   - Lihat progress dan skor Anda

2. **Modul Sensor**
   - Klik kartu sensor untuk mempelajari detail
   - Ikuti quiz untuk menguji pemahaman
   - Dapatkan poin dari jawaban benar

3. **Modul Aktuator**
   - Coba simulasi interaktif dengan slider
   - Lihat langsung efek perubahan parameter
   - Pelajari aplikasi nyata dari setiap aktuator

4. **Modul Rangkaian**
   - Pilih komponen dari toolbox
   - Klik di canvas untuk menambahkan komponen
   - Drag komponen untuk mengatur posisi
   - Klik tombol power untuk melihat efek

5. **Modul Arduino**
   - Pilih pelajaran dari daftar
   - Baca dan edit kode di editor
   - Klik "Run" untuk melihat output
   - Perhatikan highlight pada board Arduino

### Untuk Guru

1. **Penggunaan di Kelas**
   - Tampilkan di proyektor untuk demonstrasi
   - Biarkan siswa eksplorasi secara mandiri
   - Gunakan quiz untuk evaluasi

2. **Kustomisasi Konten**
   - Edit file di `/app/modules/` untuk menyesuaikan materi
   - Tambah quiz di setiap modul
   - Modifikasi level kesulitan

## 📁 Struktur Project

```
mekaGame/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── modules/
│       ├── sensor/
│       │   └── page.tsx     # Modul Sensor
│       ├── actuator/
│       │   └── page.tsx     # Modul Aktuator
│       ├── circuit/
│       │   └── page.tsx     # Modul Rangkaian
│       └── arduino/
│           └── page.tsx     # Modul Arduino
├── components/
│   ├── Button.tsx           # Komponen Button
│   ├── Card.tsx             # Komponen Card
│   ├── Modal.tsx            # Komponen Modal
│   └── ProgressBar.tsx      # Komponen Progress Bar
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── next.config.js          # Next.js config
└── README.md               # Dokumentasi
```

## 🎓 Materi Pembelajaran

### Sensor yang Dipelajari
- Sensor Suhu (Temperature Sensor)
- Sensor Cahaya (LDR)
- Sensor Ultrasonik (Ultrasonic)
- Sensor Gerak (PIR)
- Sensor Suara (Sound Sensor)
- Sensor Akselerasi (Accelerometer)

### Aktuator yang Dipelajari
- Motor DC
- Motor Servo
- LED
- Relay

### Komponen Rangkaian
- Resistor
- LED
- Baterai
- Saklar
- Kapasitor

### Program Arduino
- Blink LED (Pemula)
- Serial Monitor (Pemula)
- Baca Sensor Analog (Menengah)
- Kontrol Motor PWM (Lanjutan)

## 🎨 Customization

### Menambah Sensor Baru

Edit file `/app/modules/sensor/page.tsx`:

```typescript
const sensors = [
  // ... sensor yang ada
  {
    id: 'new-sensor',
    name: 'Sensor Baru',
    icon: IconName,
    description: 'Deskripsi sensor',
    application: 'Aplikasi sensor',
    workingPrinciple: 'Cara kerja sensor',
    color: 'from-blue-500 to-cyan-500'
  }
]
```

### Menambah Quiz

Edit bagian `quizQuestions` di modul sensor:

```typescript
const quizQuestions = [
  {
    question: 'Pertanyaan baru?',
    options: ['A', 'B', 'C', 'D'],
    correct: 0  // index jawaban benar
  }
]
```

### Mengubah Tema Warna

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom color palette
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Port 3000 sudah digunakan

```bash
npm run dev -- -p 3001
```

### Dependencies error

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
npm run build
```

## 📝 To-Do / Pengembangan Selanjutnya

- [ ] Tambah sistem user authentication
- [ ] Leaderboard global
- [ ] Sertifikat digital setelah menyelesaikan modul
- [ ] Mode multiplayer/kompetisi
- [ ] Tambah modul PLC dan Pneumatik
- [ ] Eksport progress ke PDF
- [ ] Integrasi dengan LMS sekolah
- [ ] Mode offline dengan PWA
- [ ] Tambah level kesulitan dinamis
- [ ] Gamifikasi lebih lanjut (badges, achievements)

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini dibuat untuk tujuan edukasi. Silakan digunakan dan dimodifikasi sesuai kebutuhan pembelajaran.

## 👨‍🏫 Untuk Guru

### Tips Mengajar dengan MekaGame

1. **Sesi Pengenalan (15 menit)**
   - Tunjukkan home page dan jelaskan 4 modul
   - Demo singkat setiap modul

2. **Praktik Mandiri (45 menit)**
   - Bagi siswa per modul
   - Rotasi setiap 10-15 menit
   - Dampingi siswa yang kesulitan

3. **Quiz & Evaluasi (20 menit)**
   - Gunakan quiz di modul sensor
   - Diskusi hasil dan pemahaman

4. **Project Mini (30 menit)**
   - Minta siswa buat rangkaian di modul circuit
   - Atau modifikasi kode Arduino

### Metode Penilaian

- ✅ Skor quiz
- ✅ Kreativitas rangkaian
- ✅ Modifikasi kode Arduino
- ✅ Pemahaman konsep

## 📧 Kontak & Support

Jika ada pertanyaan atau butuh bantuan:
- Buat issue di repository
- Email: [email sekolah/guru]

## 🌟 Fitur Unggulan

- 🎯 **Pembelajaran Interaktif**: Bukan hanya membaca, tapi langsung praktik
- 🎮 **Gamifikasi**: Sistem poin dan progress membuat belajar lebih menyenangkan
- 🎨 **Visual Menarik**: Animasi dan design modern meningkatkan engagement
- 📱 **Responsif**: Bisa diakses dari HP, tablet, atau komputer
- 🚀 **Performa Cepat**: Dibuat dengan Next.js untuk loading super cepat

## 💡 Filosofi Desain

MekaGame dirancang dengan prinsip:
1. **Learning by Doing** - Siswa belajar dengan praktik langsung
2. **Progressive Disclosure** - Informasi diberikan bertahap
3. **Immediate Feedback** - Hasil langsung terlihat
4. **Engaging UI/UX** - Tampilan yang menarik dan mudah digunakan

---

**Dibuat dengan ❤️ untuk pendidikan Mekatronika & Elektronika Indonesia**

*Selamat mengajar dan belajar! 🎓🔧⚡*
