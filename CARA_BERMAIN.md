# 🎮 Cara Bermain MekaGame - Panduan Lengkap

## 📋 **LANGKAH-LANGKAH BERMAIN DARI AWAL SAMPAI SELESAI**

---

## 🚀 **TAHAP 1: PERSIAPAN & INSTALASI**

### A. Download & Extract Game

1. **Download file game**

   - Download `MekaGame-PKG-Portable.zip` (16 MB)
   - Atau dapatkan dari guru/instruktur

2. **Extract file ZIP**

   - Klik kanan pada file ZIP → Extract All / Extract Here
   - Pilih lokasi folder (misal: `C:\MekaGame\` atau `D:\Games\MekaGame\`)

3. **Struktur folder hasil extract:**
   ```
   MekaGame-PKG/
   ├── MekaGame.exe       (Aplikasi utama)
   ├── sql-wasm.wasm      (Database engine)
   ├── out/               (Website game)
   ├── data/              (Auto-created untuk save data)
   └── README.txt         (Petunjuk)
   ```

### B. Jalankan Game

4. **Double-click `MekaGame.exe`**

   - Server akan mulai berjalan
   - Akan muncul CMD window dengan tulisan:

   ```
   ✅ Server running at: http://localhost:1878
   📁 Database location: C:\MekaGame-PKG\data\mekagame.db
   📌 Buka browser dan akses: http://localhost:1878
   ⚠️  Jangan tutup window ini!
   ```

5. **Buka browser secara otomatis**

   - Game akan otomatis membuka browser default Anda
   - Jika tidak otomatis, buka manual: `http://localhost:1878`

6. **Pastikan CMD window tetap terbuka**
   - ⚠️ **JANGAN TUTUP CMD WINDOW!**
   - Jika ditutup, game akan berhenti

---

## 👤 **TAHAP 2: REGISTRASI & LOGIN**

### Opsi A: Pengguna Baru (Pertama Kali)

**Step 1: Klik tombol "DAFTAR"**

- Di halaman utama, klik tombol hijau **"DAFTAR"** atau **"Register"**

**Step 2: Isi form registrasi**

```
┌─────────────────────────────────┐
│  📝 FORM PENDAFTARAN            │
├─────────────────────────────────┤
│  Nama Lengkap:  [____________]  │  → Misal: "Ahmad Rizki"
│  Username:      [____________]  │  → Misal: "ahmad_rizki"
│  Password:      [____________]  │  → Misal: "rahasia123"
│                                 │
│  [✓ Saya setuju dengan syarat]  │
│                                 │
│      [ DAFTAR SEKARANG ]        │
└─────────────────────────────────┘
```

**Tips memilih username & password:**

- ✅ Username: huruf kecil, tanpa spasi (contoh: `budi_123`, `siti_smk`)
- ✅ Password: minimal 6 karakter, mudah diingat
- ⚠️ **CATAT USERNAME & PASSWORD** - akan digunakan untuk login lagi

**Step 3: Klik "Daftar Sekarang"**

- Sistem akan memproses pendaftaran
- Jika berhasil: Muncul pesan "✅ Registrasi berhasil!"
- Otomatis login dan masuk ke halaman utama

---

### Opsi B: Pengguna yang Sudah Pernah Daftar

**Step 1: Klik tombol "MASUK"**

- Di halaman utama, klik tombol biru **"MASUK"** atau **"Login"**

**Step 2: Isi form login**

```
┌─────────────────────────────────┐
│  🔐 LOGIN                       │
├─────────────────────────────────┤
│  Username:  [____________]      │  → Masukkan username Anda
│  Password:  [____________]      │  → Masukkan password Anda
│                                 │
│      [ MASUK ]                  │
│                                 │
│  Belum punya akun? [Daftar]     │
└─────────────────────────────────┘
```

**Step 3: Klik "Masuk"**

- Jika username/password benar: Masuk ke halaman utama
- Jika salah: Muncul pesan error "❌ Username atau password salah"
- Coba lagi dengan data yang benar

---

## 🏠 **TAHAP 3: HALAMAN UTAMA (HOME)**

Setelah login berhasil, Anda akan melihat:

### A. Tampilan Atas (Header)

```
┌────────────────────────────────────────────────────────────────┐
│  🎮 MekaGame            👤 Halo, Ahmad Rizki!   [Profile] [Logout]│
└────────────────────────────────────────────────────────────────┘
```

### B. Grid Level Cards (12 Level)

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ LEVEL 1 ✓    │ LEVEL 2 ✓    │ LEVEL 3 ✓    │ LEVEL 4 🔒   │
│ Komponen     │ Kode Warna   │ Simbol       │ Gerbang      │
│ Elektronika  │ Resistor     │ Gambar       │ Logika       │
│ ⭐⭐⭐       │ ⭐⭐☆       │ ⭐☆☆       │ [TERKUNCI]   │
│ Score: 95%   │ Score: 80%   │ Score: 72%   │              │
│ [MAIN LAGI]  │ [MAIN LAGI]  │ [MAIN LAGI]  │              │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ LEVEL 5 🔒   │ LEVEL 6 🔒   │ LEVEL 7 🔒   │ LEVEL 8 🔒   │
│ Sensor &     │ Transistor   │ Aktuator &   │ Rangkaian    │
│ Transduser   │ & IC         │ Motor        │ Elektronika  │
│ [TERKUNCI]   │ [TERKUNCI]   │ [TERKUNCI]   │ [TERKUNCI]   │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌──────────────┬──────────────┬──────────────┬──────────────┐
│ LEVEL 9 🔒   │ LEVEL 10 🔒  │ LEVEL 11 🔒  │ LEVEL 12 🔒  │
│ Arduino      │ Sistem       │ PLC &        │ Final        │
│              │ Kontrol PID  │ SCADA        │ Assessment   │
│ [TERKUNCI]   │ [TERKUNCI]   │ [TERKUNCI]   │ [TERKUNCI]   │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### C. Menu Navigasi

```
┌────────────────────────────────────────────────────┐
│  [📚 Panduan]  [🏆 Leaderboard]  [👤 Profile]     │
└────────────────────────────────────────────────────┘
```

### D. Penjelasan Status Level

- **✅ Level hijau dengan score** = Sudah selesai, bisa main lagi untuk improve score
- **🔒 Level abu-abu "TERKUNCI"** = Belum bisa dimainkan, harus selesaikan level sebelumnya dulu
- **⭐ Bintang (Stars):**
  - ⭐☆☆ (1 bintang) = Score 70-84%
  - ⭐⭐☆ (2 bintang) = Score 85-99%
  - ⭐⭐⭐ (3 bintang) = Score 100% (Perfect!)

---

## 🎯 **TAHAP 4: BERMAIN LEVEL (GAMEPLAY)**

### 🎮 LEVEL 1: Komponen Elektronika Dasar

**Step 1: Klik kartu "Level 1"**

- Kartu akan beranimasi
- Loading → Masuk ke halaman Level 1

**Step 2: Baca penjelasan**

```
┌─────────────────────────────────────────────────┐
│  🔧 LEVEL 1: KOMPONEN ELEKTRONIKA DASAR         │
├─────────────────────────────────────────────────┤
│  Selamat datang! Hari ini kamu akan belajar    │
│  4 komponen elektronika paling dasar:          │
│                                                 │
│  🔴 Resistor - Penahan arus listrik            │
│  🔵 Kapasitor - Penyimpan muatan listrik       │
│  🟢 Dioda - Katup arus searah                  │
│  🟡 LED - Lampu indikator                      │
│                                                 │
│  Klik MULAI untuk memulai quiz!                │
│                                                 │
│              [ MULAI QUIZ ]                     │
└─────────────────────────────────────────────────┘
```

**Step 3: Jawab 12 soal quiz**

```
┌─────────────────────────────────────────────────┐
│  Soal 1 dari 12                      ⏱️ 10:00  │
├─────────────────────────────────────────────────┤
│  Komponen apa yang berfungsi menahan arus      │
│  listrik dalam rangkaian?                      │
│                                                 │
│  ⭕ A. Resistor                                 │
│  ⭕ B. Kapasitor                                │
│  ⭕ C. Dioda                                    │
│  ⭕ D. LED                                      │
│                                                 │
│              [ JAWAB ]                          │
└─────────────────────────────────────────────────┘
```

**Step 4: Pilih jawaban**

- Klik salah satu pilihan (A/B/C/D)
- Tombol akan highlight
- Klik "JAWAB" atau "NEXT"

**Step 5: Lihat feedback instant**

- ✅ **Benar:** Hijau + "Correct! +10 poin"
- ❌ **Salah:** Merah + "Salah! Jawaban yang benar: A"

**Step 6: Lanjut ke soal berikutnya**

- Otomatis next atau klik "LANJUT"
- Progress bar akan bertambah (1/12 → 2/12 → dst)

**Step 7: Lihat hasil akhir**

```
┌─────────────────────────────────────────────────┐
│  🎉 LEVEL 1 SELESAI!                           │
├─────────────────────────────────────────────────┤
│  Skor Anda: 10/12 (83%)                        │
│                                                 │
│  ⭐⭐☆ (2 Bintang)                             │
│                                                 │
│  Status: LULUS ✅                               │
│  Passing Grade: 70%                            │
│                                                 │
│  Jawaban Benar: 10                             │
│  Jawaban Salah: 2                              │
│                                                 │
│  Level 2 telah terbuka! 🔓                     │
│                                                 │
│  [ MAIN LAGI ]    [ LANJUT KE LEVEL 2 ]        │
└─────────────────────────────────────────────────┘
```

**Step 8: Pilih tindakan**

- **"MAIN LAGI"** → Ulangi Level 1 untuk score lebih tinggi
- **"LANJUT KE LEVEL 2"** → Kembali ke home, Level 2 sudah terbuka

---

### 🎨 LEVEL 2: Kode Warna Resistor

**Step 1: Klik kartu "Level 2"**

**Step 2: Pelajari kode warna**

```
┌─────────────────────────────────────────────────┐
│  🌈 KODE WARNA RESISTOR                         │
├─────────────────────────────────────────────────┤
│  Tabel Warna:                                   │
│  • Hitam  = 0    • Coklat = 1   • Merah = 2   │
│  • Oranye = 3    • Kuning = 4   • Hijau = 5   │
│  • Biru   = 6    • Ungu   = 7   • Abu   = 8   │
│  • Putih  = 9                                   │
│                                                 │
│  Toleransi:                                     │
│  • Emas  = ±5%   • Perak = ±10%                │
│                                                 │
│              [ MULAI LATIHAN ]                  │
└─────────────────────────────────────────────────┘
```

**Step 3: Gunakan kalkulator interaktif**

```
┌─────────────────────────────────────────────────┐
│  KALKULATOR RESISTOR                            │
├─────────────────────────────────────────────────┤
│  Gelang 1: [▼ Pilih Warna]   → Digit pertama   │
│  Gelang 2: [▼ Pilih Warna]   → Digit kedua     │
│  Gelang 3: [▼ Pilih Warna]   → Multiplier      │
│  Gelang 4: [▼ Pilih Warna]   → Toleransi       │
│                                                 │
│  Hasil:                                         │
│  ┌─────────────────────────────────────┐       │
│  │  1000 Ω (1 KΩ) ±5%                 │       │
│  └─────────────────────────────────────┘       │
│                                                 │
│  [ HITUNG ]  [ RESET ]  [ CHALLENGE ]          │
└─────────────────────────────────────────────────┘
```

**Step 4: Selesaikan challenge**

- Klik "CHALLENGE"
- Sistem akan memberikan gambar resistor dengan warna tertentu
- Hitung nilainya dan input jawaban
- 10 soal challenge untuk lulus

---

### 🔍 LEVEL 3: Simbol Gambar Teknik

**Step 1: Klik kartu "Level 3"**

**Step 2: Pelajari simbol-simbol**

```
┌─────────────────────────────────────────────────┐
│  📐 SIMBOL GAMBAR TEKNIK                        │
├─────────────────────────────────────────────────┤
│  ┌──────┬──────────────────────────┐           │
│  │ -⧈-  │ Resistor                 │           │
│  │ -||- │ Kapasitor                │           │
│  │ -▷|- │ Dioda                    │           │
│  │ -▷◁- │ LED                      │           │
│  │ -▷▷  │ Transistor NPN           │           │
│  └──────┴──────────────────────────┘           │
│                                                 │
│              [ MULAI MATCHING ]                 │
└─────────────────────────────────────────────────┘
```

**Step 3: Main matching game**

```
┌─────────────────────────────────────────────────┐
│  COCOKKAN SIMBOL DENGAN NAMA                    │
├─────────────────────────────────────────────────┤
│  Simbol:          Nama Komponen:                │
│                                                 │
│  [  -⧈-  ]  →→→  [ Resistor      ]  ✓          │
│  [  -||-  ]  →→→  [ _________   ] 🔘          │
│  [  -▷|-  ]  →→→  [ _________   ] 🔘          │
│  [  -▷◁-  ]  →→→  [ _________   ] 🔘          │
│                                                 │
│  Drag simbol ke kotak nama yang benar!          │
│                                                 │
│  Progress: 1/10                                 │
│  Score: 10/10                                   │
└─────────────────────────────────────────────────┘
```

**Tips bermain:**

- Drag simbol dari kiri
- Drop ke kotak nama yang benar di kanan
- Jika benar: ✅ Hijau + bunyi ding
- Jika salah: ❌ Merah + kembali ke posisi awal

---

### ⚡ LEVEL 4: Gerbang Logika Digital

**Step 1: Klik kartu "Level 4"**

**Step 2: Pelajari 7 gerbang logika**

```
┌─────────────────────────────────────────────────┐
│  🔌 GERBANG LOGIKA DIGITAL                      │
├─────────────────────────────────────────────────┤
│  1. AND   - Output 1 jika SEMUA input 1        │
│  2. OR    - Output 1 jika SALAH SATU input 1   │
│  3. NOT   - Output kebalikan dari input        │
│  4. NAND  - Kebalikan AND                      │
│  5. NOR   - Kebalikan OR                       │
│  6. XOR   - Output 1 jika input BERBEDA        │
│  7. XNOR  - Kebalikan XOR                      │
│                                                 │
│              [ LIHAT TUTORIAL ]                 │
└─────────────────────────────────────────────────┘
```

**Step 3: Gunakan simulator interaktif**

```
┌─────────────────────────────────────────────────┐
│  LOGIC GATE SIMULATOR                           │
├─────────────────────────────────────────────────┤
│  Toolbox:                                       │
│  [AND] [OR] [NOT] [NAND] [NOR] [XOR] [XNOR]   │
│                                                 │
│  Canvas:                                        │
│  ┌───────────────────────────────────────┐     │
│  │                                       │     │
│  │    A ──┐                              │     │
│  │        │──[AND]──> Output             │     │
│  │    B ──┘                              │     │
│  │                                       │     │
│  └───────────────────────────────────────┘     │
│                                                 │
│  Truth Table:                                   │
│  A | B | Output                                 │
│  0 | 0 |   0                                    │
│  0 | 1 |   0                                    │
│  1 | 0 |   0                                    │
│  1 | 1 |   1     ✅                             │
│                                                 │
│  [ TEST ]  [ CLEAR ]  [ NEXT CHALLENGE ]       │
└─────────────────────────────────────────────────┘
```

**Step 4: Selesaikan 5 challenge**

- Challenge 1: Buat AND gate
- Challenge 2: Buat kombinasi OR + NOT
- Challenge 3: Buat XOR gate
- Challenge 4: Buat Half Adder (2 gate)
- Challenge 5: Buat Full Adder (5 gate)

**Tips:**

- Klik gate di toolbox
- Klik canvas untuk menempatkan
- Drag untuk mengatur posisi
- Klik "TEST" untuk validasi

---

### 🔍 LEVEL 5-12: Cara Bermain Lanjutan

_Level 5-12 mengikuti pola yang sama:_

1. **Klik kartu level** yang sudah terbuka
2. **Baca penjelasan** materi di awal
3. **Ikuti tutorial** jika ada
4. **Selesaikan challenge/quiz** sesuai instruksi
5. **Lihat hasil** dan score akhir
6. **Level berikutnya terbuka** jika lulus (≥70%)

**Tipe level berdasarkan interaksi:**

- **Quiz (Level 1, 6, 12):** Pilih jawaban A/B/C/D
- **Calculator (Level 2):** Input nilai/pilih dropdown
- **Matching (Level 3):** Drag & drop
- **Simulator (Level 4, 7, 8, 10, 11):** Interactive canvas
- **Code Editor (Level 9):** Edit & run kode
- **Gallery (Level 5):** Klik kartu, baca detail, quiz

---

## 📊 **TAHAP 5: PROGRESS TRACKING**

### A. Cek Progress di Home

```
┌────────────────────────────────────────────────┐
│  Progress Keseluruhan:                         │
│  ████████░░░░░░░░░░░░░░░░░░░░░░  33%          │
│                                                │
│  Level Selesai: 4 / 12                         │
│  Total Score: 340 / 1200                       │
│  Rata-rata: 85%                                │
└────────────────────────────────────────────────┘
```

### B. Lihat Detail Progress

**Klik tombol "Profile" di header**

```
┌────────────────────────────────────────────────┐
│  👤 PROFIL PEMAIN                              │
├────────────────────────────────────────────────┤
│  Nama: Ahmad Rizki                             │
│  Username: ahmad_rizki                         │
│  Bergabung: 20 Oktober 2025                    │
│                                                │
│  🏆 STATISTIK:                                 │
│  • Level Selesai: 4 / 12                       │
│  • Total Score: 340 poin                       │
│  • Rata-rata Score: 85%                        │
│  • Ranking: #5 dari 30 siswa                   │
│                                                │
│  📊 DETAIL LEVEL:                              │
│  ✅ Level 1: 95% ⭐⭐⭐                        │
│  ✅ Level 2: 80% ⭐⭐☆                        │
│  ✅ Level 3: 72% ⭐☆☆                        │
│  ✅ Level 4: 88% ⭐⭐⭐                        │
│  🔒 Level 5: Terkunci                          │
│  ...                                           │
│                                                │
│  🎖️ ACHIEVEMENTS:                             │
│  ✅ First Blood - Selesaikan Level 1           │
│  ✅ Perfect Score - Dapat 100% di 1 level      │
│  🔒 Logic Master - Dapat 100% di Level 4       │
│                                                │
│  [ EDIT PROFILE ]  [ LOGOUT ]                  │
└────────────────────────────────────────────────┘
```

---

## 🏆 **TAHAP 6: LEADERBOARD (KOMPETISI)**

### A. Akses Leaderboard

**Klik tombol "Leaderboard" di navigation menu**

```
┌────────────────────────────────────────────────┐
│  🏆 LEADERBOARD - TOP 10 PEMAIN                │
├────┬─────────────────┬───────┬─────────┬──────┤
│ #  │ Nama            │ Score │ Selesai │ Avg  │
├────┼─────────────────┼───────┼─────────┼──────┤
│ 🥇 │ Siti Nurhaliza  │ 1150  │ 12/12   │ 96%  │
│ 🥈 │ Budi Santoso    │ 1080  │ 12/12   │ 90%  │
│ 🥉 │ Rina Kusuma     │ 1050  │ 11/12   │ 95%  │
│ 4  │ Joko Widodo     │  980  │ 10/12   │ 98%  │
│ 5  │ Ahmad Rizki ⭐  │  340  │  4/12   │ 85%  │ ← ANDA
│ 6  │ Dewi Lestari    │  310  │  4/12   │ 78%  │
│ 7  │ Agus Setiawan   │  290  │  3/12   │ 97%  │
│ 8  │ Maya Sari       │  270  │  3/12   │ 90%  │
│ 9  │ Rudi Hartono    │  250  │  3/12   │ 83%  │
│ 10 │ Lisa Andriani   │  220  │  2/12   │ 110% │
└────┴─────────────────┴───────┴─────────┴──────┘

💡 Tips:
- Selesaikan semua level untuk naik ranking
- Ulangi level untuk improve score
- Score = Total poin dari semua level
```

### B. Fitur Leaderboard

- **Real-time update:** Ranking berubah otomatis
- **Highlight posisi Anda:** Baris berwarna berbeda
- **Filter:** Lihat teman sekelas saja
- **Refresh:** Update data terbaru

---

## 🎓 **TAHAP 7: MENYELESAIKAN SEMUA LEVEL**

### Progress Menuju Level 12

**Level 1-3:** Fondasi (Easy) → **SELESAI** ✅
**Level 4-6:** Logika & Sensor (Medium) → **SELESAI** ✅
**Level 7-9:** Rangkaian & Arduino (Hard) → **SELESAI** ✅
**Level 10-11:** Kontrol & PLC (Very Hard) → **SELESAI** ✅
**Level 12:** Final Assessment (Expert) → **SIAP!** 🎯

### LEVEL 12: Final Assessment (Ujian Akhir)

**Step 1: Pastikan Level 1-11 selesai**

- Level 12 hanya terbuka jika Level 11 lulus

**Step 2: Klik kartu "Level 12: Final Assessment"**

**Step 3: Baca briefing**

```
┌────────────────────────────────────────────────┐
│  🏆 UJIAN AKHIR - FINAL ASSESSMENT             │
├────────────────────────────────────────────────┤
│  Ini adalah ujian terakhir untuk mendapatkan   │
│  gelar MASTER TEKNISI MEKATRONIKA!             │
│                                                │
│  • 12 soal comprehensive                       │
│  • Waktu: 30 menit                             │
│  • Passing grade: 70% (9/12 benar)             │
│  • Materi: Semua Level 1-11                    │
│                                                │
│  ⚠️ PERHATIAN:                                 │
│  - Tidak bisa back ke soal sebelumnya          │
│  - Jawaban final tidak bisa diubah             │
│  - Sisa waktu akan ditampilkan                 │
│                                                │
│  Sudah siap?                                   │
│                                                │
│  [ BELUM, REVIEW DULU ]    [ MULAI UJIAN! ]   │
└────────────────────────────────────────────────┘
```

**Step 4: Jawab 12 soal**

```
┌────────────────────────────────────────────────┐
│  Soal 5 dari 12              ⏱️ Sisa: 21:35   │
├────────────────────────────────────────────────┤
│  [Gambar: Ladder Logic diagram]                │
│                                                │
│  Apa yang akan terjadi pada output Y jika     │
│  input X1 = 1 dan X2 = 0?                     │
│                                                │
│  ⭕ A. Y = 1 (ON)                              │
│  ⭕ B. Y = 0 (OFF)                             │
│  ⭕ C. Y berkedip                              │
│  ⭕ D. Tergantung timer                        │
│                                                │
│  [ BACK ]        [ SKIP ]        [ NEXT ]     │
└────────────────────────────────────────────────┘
```

**Step 5: Submit dan tunggu hasil**

```
┌────────────────────────────────────────────────┐
│  Anda sudah menjawab 12 soal.                  │
│  Yakin ingin submit jawaban?                   │
│                                                │
│  ⚠️ Jawaban tidak bisa diubah setelah submit!  │
│                                                │
│  [ REVIEW JAWABAN ]         [ SUBMIT! ]        │
└────────────────────────────────────────────────┘
```

---

## 🎉 **TAHAP 8: HASIL AKHIR & SERTIFIKAT**

### Skenario A: LULUS (≥70%)

```
┌────────────────────────────────────────────────┐
│                                                │
│            🎉 SELAMAT! 🎉                      │
│                                                │
│    KAMU ADALAH MASTER TEKNISI MEKATRONIKA!     │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│  Hasil Ujian Final:                            │
│  • Score: 10/12 (83%) ✅                       │
│  • Waktu: 24:15 dari 30:00                     │
│  • Status: LULUS                               │
│                                                │
│  ⭐⭐⭐ BINTANG: GOLD                          │
│                                                │
│  ┌──────────────────────────────────────┐     │
│  │  📜 SERTIFIKAT DIGITAL               │     │
│  │                                      │     │
│  │  Diberikan kepada:                   │     │
│  │  AHMAD RIZKI                         │     │
│  │                                      │     │
│  │  Telah menyelesaikan 12 level       │     │
│  │  MekaGame dengan score 83%          │     │
│  │                                      │     │
│  │  Tanggal: 20 Oktober 2025           │     │
│  │                                      │     │
│  └──────────────────────────────────────┘     │
│                                                │
│  [ 📥 DOWNLOAD PDF ]  [ 🔗 SHARE ]            │
│                                                │
│  Ranking Akhir: #3 dari 30 siswa              │
│  Total Score: 1050 / 1200 (88%)               │
│                                                │
│  🎖️ Achievement Unlocked:                     │
│  ✅ Master Teknisi - Complete all 12 levels    │
│                                                │
│  Langkah Selanjutnya:                          │
│  • 🏆 Challenge temanmu di Leaderboard         │
│  • 💼 Apply untuk internship                   │
│  • 🚀 Mulai project robotmu sendiri!           │
│                                                │
│  [ MAIN LAGI ]  [ LEADERBOARD ]  [ HOME ]     │
└────────────────────────────────────────────────┘
```

### Skenario B: TIDAK LULUS (<70%)

```
┌────────────────────────────────────────────────┐
│                                                │
│            😢 BELUM BERHASIL                   │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│  Hasil Ujian Final:                            │
│  • Score: 7/12 (58%) ❌                        │
│  • Passing Grade: 70% (9/12)                   │
│  • Status: TIDAK LULUS                         │
│                                                │
│  Jangan menyerah!                              │
│  "Failure is part of learning."                │
│                                                │
│  📊 Analisis Jawaban:                          │
│  • Level 1-3 (Fondasi): 3/3 ✅ (100%)         │
│  • Level 4-6 (Logika): 2/3 ⚠️ (67%)           │
│  • Level 7-9 (Rangkaian): 1/3 ❌ (33%)        │
│  • Level 10-12 (Kontrol): 1/3 ❌ (33%)        │
│                                                │
│  💡 Rekomendasi:                               │
│  1. Review Level 8 (Rangkaian)                 │
│  2. Review Level 9 (Arduino)                   │
│  3. Review Level 10 (PID Control)              │
│  4. Latihan lebih banyak di simulasi           │
│                                                │
│  [ REVIEW MATERI ]      [ COBA LAGI ]         │
└────────────────────────────────────────────────┘
```

---

## 📥 **TAHAP 9: DOWNLOAD SERTIFIKAT**

### A. Download Sertifikat PDF

**Step 1: Klik tombol "DOWNLOAD PDF"**

**Step 2: Pilih lokasi save**

- Default: `Downloads/MekaGame_Certificate_Ahmad_Rizki.pdf`

**Step 3: Buka file PDF**

**Isi sertifikat:**

```
╔════════════════════════════════════════════════╗
║                                                ║
║         🎮 MEKAGAME CERTIFICATE 🎮             ║
║                                                ║
║              Master Teknisi Level              ║
║                                                ║
╠════════════════════════════════════════════════╣
║                                                ║
║            Diberikan kepada:                   ║
║                                                ║
║              AHMAD RIZKI                       ║
║                                                ║
║  Telah menyelesaikan 12 level pelatihan       ║
║  MekaGame: Game Edukasi Mekatronika            ║
║                                                ║
║  Dengan score akhir: 1050 / 1200 (88%)        ║
║  Ranking: #3 dari 30 siswa                     ║
║                                                ║
║  Kompetensi yang dikuasai:                     ║
║  ✓ Komponen Elektronika                       ║
║  ✓ Rangkaian & Circuit Design                 ║
║  ✓ Sensor & Aktuator                          ║
║  ✓ Pemrograman Arduino                        ║
║  ✓ Sistem Kontrol PID                         ║
║  ✓ PLC & Ladder Logic                         ║
║                                                ║
║  Tanggal: 20 Oktober 2025                     ║
║  ID Sertifikat: MGC-20251020-003              ║
║                                                ║
║  ────────────────────────────────              ║
║  Instruktur: Pak Budi Santoso                 ║
║  SMK Negeri 1 Teknologi                       ║
║                                                ║
╚════════════════════════════════════════════════╝
```

### B. Share Sertifikat

**Klik tombol "SHARE"**

**Pilih platform:**

- 📱 WhatsApp
- 📘 Facebook
- 🐦 Twitter
- 📧 Email
- 🔗 Copy Link

---

## 🔄 **TAHAP 10: SETELAH SELESAI**

### A. Main Lagi untuk Improve Score

**Opsi 1: Ulangi level tertentu**

- Klik level yang ingin diulang
- Sistem akan menyimpan score TERBAIK
- Misal: Level 3 score lama 72%, main lagi dapat 85% → Update jadi 85%

**Opsi 2: Challenge mode**

- Coba selesaikan semua level dengan 3 bintang (100%)
- Target: Perfect score di semua level!

### B. Kompetisi dengan Teman

**Step 1: Ajak teman daftar**

- Share link game ke teman sekelas
- Atau guru bisa setup di lab komputer sekolah

**Step 2: Lihat leaderboard**

- Cek ranking real-time
- Siapa yang tercepat selesai?
- Siapa yang score tertinggi?

**Step 3: Diskusi strategi**

- Share tips & trik dengan teman
- Belajar bareng materi yang sulit
- Saling membantu improve score

### C. Eksplorasi Fitur Lain

**1. Panduan Lengkap**

- Klik menu "Panduan"
- Baca tips untuk setiap level
- Lihat video tutorial (jika ada)

**2. Profile Settings**

- Edit nama display
- Ubah password
- Lihat statistik detail

**3. Mode Latihan**

- Practice mode tanpa score
- Unlimited attempts
- Fokus belajar, bukan kompetisi

---

## ⚙️ **TROUBLESHOOTING & TIPS**

### ❓ Masalah Umum & Solusi

#### 1. Game tidak bisa dibuka

**Gejala:** Double-click MekaGame.exe tidak terjadi apa-apa

**Solusi:**

```
✅ Check 1: Pastikan semua file utuh
   - MekaGame.exe
   - sql-wasm.wasm
   - folder out/
   - folder data/

✅ Check 2: Buka dari Command Prompt
   > cd C:\MekaGame-PKG
   > MekaGame.exe

✅ Check 3: Disable Antivirus sementara
   - Windows Defender kadang block .exe baru

✅ Check 4: Run as Administrator
   - Klik kanan MekaGame.exe
   - "Run as Administrator"
```

#### 2. Browser tidak otomatis buka

**Solusi:**

```
✅ Buka manual browser
✅ Ketik di address bar: http://localhost:1878
✅ Bookmark untuk akses cepat next time
```

#### 3. Port sudah digunakan

**Gejala:** Error "Port 1878 already in use"

**Solusi:**

```
✅ Check apakah MekaGame.exe sudah berjalan
   - Lihat Task Manager (Ctrl+Shift+Esc)
   - Tutup proses MekaGame.exe yang double

✅ Atau restart komputer
```

#### 4. Progress tidak tersimpan

**Gejala:** Setelah login, progress kembali ke awal

**Solusi:**

```
✅ Check folder data/
   - Pastikan file mekagame.db ada
   - Jangan delete folder data/

✅ Selalu tutup dengan benar
   - Klik Logout sebelum tutup browser
   - Ctrl+C di CMD window untuk stop server gracefully
```

#### 5. Lupa password

**Solusi:**

```
❌ Tidak bisa reset password otomatis
✅ Daftar username baru
✅ Atau minta guru/admin untuk reset database
```

---

## 💡 **TIPS & TRIK PRO**

### 🎯 Tips Mendapat Score Tinggi

**1. Baca Materi dengan Teliti**

- Jangan skip penjelasan di awal
- Note down poin-poin penting
- Screenshot tabel/diagram untuk referensi

**2. Practice Makes Perfect**

- Ulangi level hingga dapat 100%
- Gunakan mode latihan untuk eksperimen
- Timer bukan masalah, fokus pada accuracy

**3. Time Management**

```
Level 1-3:   10-15 menit (easy, jangan terburu-buru)
Level 4-6:   20-30 menit (medium, pahami konsep)
Level 7-9:   25-35 menit (hard, coba semua simulasi)
Level 10-11: 30-40 menit (very hard, tuning butuh waktu)
Level 12:    30 menit (comprehensive, pacing penting)
```

**4. Pahami, Jangan Hafal**

- Jangan cuma hafal jawaban
- Pahami WHY jawaban itu benar
- Aplikasikan ke real-world scenario

**5. Gunakan Resource**

- Buka tab baru untuk google saat stuck
- Screenshot pertanyaan, diskusi dengan teman (di luar quiz)
- Catat pola soal yang sering muncul

### 🏆 Tips Naik Ranking Leaderboard

**1. Complete First, Optimize Later**

- Prioritas: selesaikan semua 12 level dulu
- Baru kembali improve score per level
- Total score > Individual perfect score

**2. Target Level dengan Bobot Tinggi**

- Level 10-12 punya soal lebih banyak = poin lebih besar
- Focus improve score di level sulit

**3. Konsisten Main Setiap Hari**

- 30 menit per hari lebih baik dari 3 jam sekali
- Otak butuh waktu untuk absorb informasi

**4. Join Early**

- Semakin awal daftar, semakin banyak waktu improve score
- Early bird advantage!

### 📚 Tips Belajar Efektif

**1. Catat Kesalahan**

```
Buat catatan:
"Level 4 - Salah di XOR gate. Ternyata output 1 jika input BERBEDA, bukan sama."
"Level 10 - Kp terlalu besar menyebabkan overshoot. Turunin sampai stabil."
```

**2. Belajar dengan Teman**

- Jelaskan konsep ke teman (teaching = learning)
- Diskusi strategi solving problem
- Compare approach berbeda

**3. Break Complex ke Simple**

- Level sulit seperti PLC/PID? Break jadi step kecil
- Fokus satu challenge dulu, jangan overwhelmed
- Master basic sebelum advanced

**4. Rest & Repeat**

- Jangan forcing marathon session
- Rest 5-10 menit setiap 30 menit
- Next day review material lebih efektif

---

## 🎯 **CHECKLIST LENGKAP**

### ✅ Setup & Instalasi

- [ ] Download MekaGame-PKG-Portable.zip
- [ ] Extract ke folder pilihan
- [ ] Verifikasi semua file ada (exe, wasm, out/)
- [ ] Double-click MekaGame.exe
- [ ] Browser otomatis buka http://localhost:1878
- [ ] CMD window tetap terbuka (jangan tutup!)

### ✅ Registrasi & Login

- [ ] Daftar akun dengan username & password kuat
- [ ] Catat username & password di tempat aman
- [ ] Login berhasil masuk ke home page
- [ ] Lihat Level 1 tersedia (hijau), Level 2-12 terkunci (abu)

### ✅ Gameplay Level 1-12

- [ ] Level 1: Komponen Elektronika (Quiz 12 soal) → Score ≥70%
- [ ] Level 2: Kode Warna Resistor (Calculator + Challenge) → Score ≥70%
- [ ] Level 3: Simbol Gambar Teknik (Matching game) → Score ≥70%
- [ ] Level 4: Gerbang Logika (Simulator 5 challenge) → Score ≥70%
- [ ] Level 5: Sensor & Transduser (Gallery + Quiz) → Score ≥70%
- [ ] Level 6: Transistor & IC (Quiz 16 soal) → Score ≥70%
- [ ] Level 7: Aktuator & Motor (Simulation interactive) → Auto-complete
- [ ] Level 8: Rangkaian Elektronika (Circuit builder) → Score ≥75%
- [ ] Level 9: Arduino (Code editor 4 lessons) → Score ≥75%
- [ ] Level 10: Sistem Kontrol PID (Tuning 5 challenge) → Score ≥80%
- [ ] Level 11: PLC & SCADA (Ladder Logic 5 challenge) → Score ≥80%
- [ ] Level 12: Final Assessment (Comprehensive 12 soal) → Score ≥70%

### ✅ Progress Tracking

- [ ] Check progress bar di home page
- [ ] Lihat detail score per level di profile
- [ ] Monitor ranking di leaderboard
- [ ] Unlock achievements

### ✅ Final & Certificate

- [ ] Lulus Level 12 dengan score ≥70%
- [ ] Lihat sertifikat digital di victory screen
- [ ] Download PDF sertifikat
- [ ] Share ke social media (optional)

### ✅ After Completion

- [ ] Improve score di level dengan 1-2 bintang
- [ ] Target 3 bintang (100%) di semua level
- [ ] Compete di leaderboard
- [ ] Ajak teman untuk join
- [ ] Apply knowledge ke project nyata

---

## 📞 **BANTUAN & DUKUNGAN**

### 🆘 Butuh Bantuan?

**Hubungi:**

- 👨‍🏫 **Guru/Instruktur:** Pak Budi (email/WA)
- 📧 **Email Support:** support@mekagame.com (jika ada)
- 💬 **Forum Diskusi:** [Link forum kelas]
- 📱 **WhatsApp Group:** [Link grup kelas]

### 📖 Resource Tambahan

**Dokumentasi:**

- `README.txt` - Petunjuk dasar
- `PANDUAN_SISWA.md` - Panduan detail untuk siswa
- `PANDUAN_GURU.md` - Panduan untuk guru

**Video Tutorial (jika ada):**

- YouTube: [Channel MekaGame]
- Google Drive: [Link folder video]

---

## 🎊 **SELAMAT BERMAIN & BELAJAR!**

> **"From Zero to Hero: Your Journey to Master Teknisi Starts Here!"**

**Ingat:**

- 🎯 Fokus pada **PEMAHAMAN**, bukan hanya score
- 🤝 **KOLABORASI** dengan teman lebih baik dari kompetisi
- 💪 **KONSISTEN** lebih penting dari intensitas
- 🚀 **APPLY** knowledge ke project real-world
- 🎓 **KEEP LEARNING** setelah selesai game

---

**Semoga sukses menjadi Master Teknisi Mekatronika! 🏆**

_Dibuat dengan ❤️ untuk masa depan vokasi Indonesia_

---

**Last Updated:** 20 Oktober 2025
**Version:** 1.0
**Game Version:** MekaGame PKG Portable (Port 1878)
