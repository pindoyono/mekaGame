# 📚 Panduan MekaGame untuk Siswa

## � Apa itu MekaGame?

MekaGame adalah game edukasi interaktif untuk belajar **Mekatronika dan Elektronika** dengan cara yang menyenangkan! Kamu akan belajar tentang komponen elektronika, rangkaian, sensor, Arduino, dan sistem kontrol melalui **12 level yang semakin menantang**.

---

## 🚀 Cara Memulai

### **1. Registrasi Akun**

**Langkah-langkah:**

1. Buka website MekaGame
2. Klik tombol **"Daftar"** di pojok kanan atas
3. Isi form registrasi:
   - **Username**: Nama pengguna kamu (minimal 3 karakter)
   - **Email**: Email kamu yang valid
   - **Password**: Kata sandi (minimal 6 karakter)
   - **Nama Lengkap**: Nama lengkap kamu
4. Klik **"Daftar"**
5. Selamat! Akun kamu sudah jadi ✅

**Tips:**

- Gunakan username yang mudah diingat
- Catat password kamu baik-baik
- Password harus minimal 6 karakter

---

### **2. Login ke Akun**

**Langkah-langkah:**

1. Klik tombol **"Login"** di pojok kanan atas
2. Masukkan **Username** dan **Password** kamu
3. Klik **"Login"**
4. Kamu akan masuk ke homepage ✅

**Kalau lupa password?**

- Tanya guru kamu untuk bantuan reset akun
- Atau buat akun baru (tapi progress hilang)

---

### **3. Mengenal Tampilan Homepage**

Setelah login, kamu akan melihat:

#### **A. Hero Section (Bagian Atas)**

```
🎮 MekaGame
Belajar Mekatronika & Elektronika Jadi Lebih Seru!
🎓 12 Level Pembelajaran Progresif
```

#### **B. Stats Bar (Statistik Kamu)**

```
┌─────────┬─────────┬─────────┬─────────┐
│  Poin   │  Level  │ Selesai │Progress │
│   120   │  3/12   │  3/12   │  25%    │
└─────────┴─────────┴─────────┴─────────┘
```

- **Poin**: Total skor kamu dari semua level
- **Level**: Jumlah level yang sudah kamu coba
- **Selesai**: Jumlah level yang sudah selesai (≥70%)
- **Progress**: Persentase penyelesaian kamu

#### **C. Info Panel**

```
Jalur Pembelajaran Progresif
Selesaikan setiap level dengan skor minimal 70%
untuk membuka level berikutnya!

🟢 Mudah  🟡 Sedang  🟠 Sulit  🔴 Sangat Sulit
```

#### **D. Level Cards (Kartu Level)**

```
┌──────────────────────────────┐
│  1  Komponen Elektronika     │
│     Resistor, Kapasitor      │
│     🟢 Mudah | Min 70%       │
│     [Mulai Level →]          │
└──────────────────────────────┘
```

- **Hijau (Mulai Level)**: Level bisa dimainkan ✅
- **Abu-abu + 🔒 (Terkunci)**: Selesaikan level sebelumnya dulu ❌

#### **E. Tombol Leaderboard (Bawah)**

```
🏆 Lihat Leaderboard
```

Klik untuk lihat ranking pemain terbaik!

---

## 📖 Penjelasan Setiap Level

### **Level 1: Komponen Elektronika Dasar** 🟢 MUDAH

**Apa yang dipelajari?**

- Mengenal komponen elektronika: **Resistor, Kapasitor, Dioda**
- Fungsi dan simbol setiap komponen
- Cara membaca nilai komponen

**Cara bermain:**

1. Baca penjelasan komponen yang muncul
2. Lihat gambar dan simbol komponen
3. Jawab pertanyaan tentang komponen
4. Kumpulkan poin untuk setiap jawaban benar!

**Target:** Skor minimal **70%** untuk unlock Level 2

**Tips:**

- Perhatikan gambar komponen dengan baik
- Ingat simbol-simbol elektronika
- Resistor = hambatan, Kapasitor = penyimpan muatan

---

### **Level 2: Kode Warna Resistor** 🟡 SEDANG

**Apa yang dipelajari?**

- Membaca **kode warna** pada resistor
- Menghitung nilai resistansi (Ohm)
- Memahami toleransi resistor

**Cara bermain:**

1. Lihat resistor dengan gelang warna tertentu
2. Hitung nilai resistansi berdasarkan warna:
   - **Gelang 1**: Angka pertama
   - **Gelang 2**: Angka kedua
   - **Gelang 3**: Pengali (×10, ×100, ×1k, dll)
   - **Gelang 4**: Toleransi (±5%, ±10%)
3. Pilih jawaban yang benar
4. Semakin cepat, semakin tinggi poin!

**Contoh:**

```
Coklat-Hitam-Merah-Emas
1  -  0  - ×100 - ±5%
= 10 × 100 = 1000Ω = 1kΩ ±5%
```

**Target:** Skor minimal **70%** untuk unlock Level 3

**Tips:**

- Hafalkan tabel kode warna resistor
- Hitam=0, Coklat=1, Merah=2, Orange=3, dst.
- Emas=±5%, Perak=±10%

---

### **Level 3: Simbol Gambar Teknik** 🟡 SEDANG

**Apa yang dipelajari?**

- Mengenal **simbol elektronika** standar
- Matching game: cocokkan komponen dengan simbolnya
- Membaca diagram rangkaian sederhana

**Cara bermain:**

1. Lihat gambar komponen (foto/ilustrasi)
2. Cari pasangan simbol yang sesuai
3. Drag & drop atau klik untuk mencocokkan
4. Benar = +10 poin, Salah = -5 poin

**Contoh Simbol:**

```
Resistor:  ─[▭▭▭]─
Kapasitor: ─||─
Dioda:     ─|>|─
LED:       ─|>|─ (dengan panah)
Transistor: Segitiga dengan 3 kaki
```

**Target:** Skor minimal **70%** untuk unlock Level 4

**Tips:**

- Perhatikan bentuk simbol dengan teliti
- LED berbeda dengan dioda biasa (ada panah cahaya)
- Transistor punya 3 kaki: E, B, C

---

### **Level 4: Gerbang Logika Digital** 🟡 SEDANG

**Apa yang dipelajari?**

- Gerbang logika dasar: **AND, OR, NOT, XOR**
- Tabel kebenaran (truth table)
- Kombinasi gerbang logika
- **Half Adder** (penjumlah biner sederhana)

**Cara bermain:**

1. Pilih gerbang logika yang tersedia
2. Susun rangkaian logika di simulator
3. Set input (0 atau 1)
4. Lihat output yang dihasilkan
5. Cocokkan dengan target output

**Contoh:**

```
AND Gate:
Input A | Input B | Output
   0    |    0    |   0
   0    |    1    |   0
   1    |    0    |   0
   1    |    1    |   1    (Keduanya 1 → Output 1)
```

**Target:** Skor minimal **70%** untuk unlock Level 5

**Tips:**

- AND = Keduanya harus 1
- OR = Salah satu 1 sudah cukup
- NOT = Membalik (0→1, 1→0)
- XOR = Berbeda menghasilkan 1

---

### **Level 5: Sensor & Transduser** 🟡 SEDANG

**Apa yang dipelajari?**

- Macam-macam sensor: **LDR, Ultrasonik, PIR, Suhu**
- Fungsi dan cara kerja sensor
- Aplikasi sensor di kehidupan sehari-hari
- Membaca data sensor

**Cara bermain:**

1. Pilih sensor yang sesuai dengan kebutuhan
2. Simulasi sensor dengan kondisi tertentu
3. Baca nilai output sensor
4. Jawab pertanyaan tentang aplikasi sensor

**Jenis Sensor:**

```
📸 LDR (Light Dependent Resistor)
   - Deteksi cahaya
   - Aplikasi: Lampu otomatis, kamera

📏 Ultrasonik
   - Ukur jarak
   - Aplikasi: Parkir sensor, robot

🚶 PIR (Passive Infrared)
   - Deteksi gerakan/suhu tubuh
   - Aplikasi: Alarm, lampu otomatis

🌡️ Sensor Suhu
   - Ukur temperatur
   - Aplikasi: AC, kulkas, thermostat
```

**Target:** Skor minimal **70%** untuk unlock Level 6

**Tips:**

- LDR = Resistansi turun saat terang
- Ultrasonik = Gelombang suara pantulan
- PIR = Deteksi panas tubuh manusia
- Sensor suhu = Thermistor, LM35

---

### **Level 6: Transistor & IC** 🟠 SULIT

**Apa yang dipelajari?**

- Transistor **NPN** dan **PNP**
- Konfigurasi kaki: **Emitor-Basis-Kolektor**
- IC **555 Timer** (pembangkit pulsa)
- Rangkaian switching sederhana

**Cara bermain:**

1. Identifikasi jenis transistor (NPN/PNP)
2. Pasang transistor dengan benar (E-B-C)
3. Buat rangkaian switch sederhana
4. Atur IC 555 untuk mode tertentu
5. Test rangkaian di simulator

**Transistor:**

```
NPN: Arus masuk Basis → Arus mengalir C ke E
PNP: Arus keluar Basis → Arus mengalir E ke C

Urutan Kaki NPN: E-B-C (kiri ke kanan)
```

**IC 555 Timer:**

```
Mode Astable: Oscillator (blink LED)
Mode Monostable: One-shot pulse
Mode Bistable: Flip-flop
```

**Target:** Skor minimal **70%** untuk unlock Level 7

**Tips:**

- NPN = Current goes from C to E when B is HIGH
- PNP = Kebalikan NPN
- IC 555 = IC serbaguna untuk timing
- Pin 8=Vcc, Pin 1=GND, Pin 3=Output

---

### **Level 7: Aktuator & Motor** 🟠 SULIT

**Apa yang dipelajari?**

- Jenis aktuator: **Motor DC, Servo, Relay**
- Cara mengontrol motor
- PWM (Pulse Width Modulation) untuk kecepatan
- Aplikasi aktuator

**Cara bermain:**

1. Pilih jenis aktuator yang tepat
2. Atur parameter kontrol (PWM, sudut, dll)
3. Simulasi pergerakan aktuator
4. Lihat respons dan efek yang dihasilkan

**Jenis Aktuator:**

```
🔄 Motor DC
   - Putaran kontinu
   - Kecepatan diatur PWM (0-100%)
   - Aplikasi: Kipas, mainan

🎯 Motor Servo
   - Putaran terbatas (0-180°)
   - Kontrol posisi presisi
   - Aplikasi: Robot arm, kamera pan-tilt

🔌 Relay
   - Switch elektronik
   - ON/OFF beban besar (lampu, pompa)
   - Aplikasi: Sistem otomasi rumah
```

**Target:** Skor minimal **70%** untuk unlock Level 8

**Tips:**

- PWM 50% = setengah kecepatan
- Servo butuh sinyal PWM khusus
- Relay ada NO (Normally Open) dan NC (Normally Closed)

---

### **Level 8: Rangkaian Elektronika** 🟠 SULIT

**Apa yang dipelajari?**

- Rangkaian **Seri** dan **Paralel**
- Hukum **Ohm** (V = I × R)
- Hukum **Kirchhoff** (KVL, KCL)
- Simulasi dan analisis rangkaian

**Cara bermain:**

1. Susun komponen menjadi rangkaian
2. Hitung tegangan, arus, atau resistansi
3. Gunakan simulator untuk verifikasi
4. Bandingkan hasil perhitungan dengan simulasi

**Rumus Penting:**

```
Hukum Ohm:
V = I × R
V = Tegangan (Volt)
I = Arus (Ampere)
R = Resistansi (Ohm)

Rangkaian Seri:
Rtotal = R1 + R2 + R3 + ...
Itotal = sama di semua komponen

Rangkaian Paralel:
1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ...
Vtotal = sama di semua cabang
Itotal = I1 + I2 + I3 + ...
```

**Target:** Skor minimal **75%** untuk unlock Level 9

**Tips:**

- Rangkaian seri = Arus sama, Tegangan bagi
- Rangkaian paralel = Tegangan sama, Arus bagi
- Gunakan kalkulator untuk perhitungan kompleks

---

### **Level 9: Mikrokontroler Arduino** � SANGAT SULIT

**Apa yang dipelajari?**

- Dasar pemrograman **Arduino**
- Syntax: `pinMode()`, `digitalWrite()`, `digitalRead()`
- Upload program ke Arduino (simulasi)
- Interface dengan LED, sensor, motor

**Cara bermain:**

1. Tulis kode program Arduino di editor
2. Susun komponen di breadboard virtual
3. Upload program (simulasi)
4. Test dengan menekan tombol/mengubah input
5. Debug jika ada error

**Contoh Program:**

```cpp
// Blink LED
void setup() {
  pinMode(13, OUTPUT);  // Pin 13 sebagai output
}

void loop() {
  digitalWrite(13, HIGH);  // LED ON
  delay(1000);             // Tunggu 1 detik
  digitalWrite(13, LOW);   // LED OFF
  delay(1000);             // Tunggu 1 detik
}
```

**Fungsi Dasar:**

```
pinMode(pin, MODE)      → Set pin sebagai INPUT/OUTPUT
digitalWrite(pin, VAL)  → Tulis HIGH/LOW ke pin output
digitalRead(pin)        → Baca nilai pin input
analogRead(pin)         → Baca nilai analog (0-1023)
delay(ms)               → Delay dalam milidetik
```

**Target:** Skor minimal **75%** untuk unlock Level 10

**Tips:**

- Ingat semicolon (;) di akhir setiap baris
- setup() = dijalankan sekali di awal
- loop() = dijalankan berulang-ulang
- pinMode harus diset dulu sebelum pakai pin

---

### **Level 10: Sistem Kontrol PID** 🔴 SANGAT SULIT

**Apa yang dipelajari?**

- Kontrol **PID** (Proportional-Integral-Derivative)
- Tuning parameter **Kp, Ki, Kd**
- Feedback control system
- Respons sistem terhadap gangguan

**Cara bermain:**

1. Ada **5 Challenge** yang harus diselesaikan berurutan
2. Atur parameter PID (slider Kp, Ki, Kd)
3. Start simulasi kontrol suhu
4. Lihat grafik real-time:
   - **Kuning (garis putus)**: Setpoint (target suhu)
   - **Hijau**: Process Value (suhu aktual)
   - **Biru**: Output kontrol (0-100%)
5. System berhasil jika PV berada dalam range error maksimal selama waktu tertentu

**5 Challenge:**

```
Challenge 1: Kontrol Dasar (50°C)
- Belajar kontrol proporsional (Kp)
- Error maksimal: ±2°C
- Settling time: 30 detik

Challenge 2: Respons Cepat (75°C)
- Tambah Ki untuk hilangkan steady-state error
- Error maksimal: ±1.5°C
- Settling time: 25 detik

Challenge 3: Steady State (60°C)
- Kombinasi Kp, Ki, Kd untuk presisi
- Error maksimal: ±1°C
- Settling time: 20 detik

Challenge 4: Dengan Gangguan (50°C)
- Ada gangguan periodik
- Error maksimal: ±2°C
- Settling time: 35 detik

Challenge 5: Kontrol Presisi (80°C)
- Ujian akhir PID tuning
- Error maksimal: ±0.8°C
- Settling time: 30 detik
```

**Parameter PID:**

```
Kp (Proportional): 0-10
- Respons cepat tapi bisa overshoot
- Kp terlalu besar = oscillation

Ki (Integral): 0-2
- Eliminasi steady-state error
- Ki terlalu besar = overshoot dan lambat

Kd (Derivative): 0-1
- Damping, kurangi overshoot
- Kd terlalu besar = noise sensitive
```

**Target:** Selesaikan semua 5 challenge untuk unlock Level 11

**Tips untuk Tuning:**

1. Mulai dengan Kp=1.0, Ki=0.1, Kd=0.05
2. Naikkan Kp sampai respons cepat (hati-hati oscillation)
3. Naikkan Ki untuk hilangkan error
4. Naikkan Kd untuk stabilkan sistem
5. Fine-tune perlahan-lahan

---

### **Level 11: PLC & SCADA** 🔴 SANGAT SULIT

**Apa yang dipelajari?**

- Pemrograman **Ladder Logic** PLC
- Simbol: NO (Normally Open), NC (Normally Closed), COIL
- Timer (TON), Counter (CTU)
- Sequential control

**Cara bermain:**

1. Ada **5 Challenge** PLC programming
2. Pilih tool: NO, NC, COIL, TON, CTU
3. Klik grid untuk letakkan komponen
4. **Dialog akan muncul** untuk input address:
   - Input: I0.0, I0.1, I0.2, I0.3
   - Output: Q0.0, Q0.1, Q0.2
   - Timer: T1, T2, T3
   - Counter: C1, C2, C3
5. Klik komponen untuk **edit** address
6. Right-click komponen untuk **hapus**
7. Set input switches (ON/OFF)
8. Klik **RUN** untuk test program
9. Jika benar, modal "Challenge Selesai!" akan muncul

**5 Challenge:**

```
Challenge 1: Lampu Sederhana
- I0.0 ON → Q0.0 ON
- Belajar dasar NO dan COIL

Challenge 2: Start/Stop Motor
- I0.0 = Start, I0.1 = Stop
- Q0.0 = Motor (dengan self-hold)

Challenge 3: Timer Delay
- I0.0 ON → Delay 3 detik → Q0.0 ON
- Belajar TON (Timer On Delay)

Challenge 4: Counter
- I0.0 pulsa 5 kali → Q0.0 ON
- Belajar CTU (Counter Up)

Challenge 5: Sequential Timer
- 3 lampu berkedip berurutan
- Timer cascade untuk traffic light
```

**Simbol Ladder Logic:**

```
─┤ ├─   NO (Normally Open) contact
─┤/├─   NC (Normally Closed) contact
─( )─   COIL (Output)
─[TON]─ Timer On Delay
─[CTU]─ Counter Up
```

**Target:** Selesaikan semua 5 challenge untuk unlock Level 12

**Tips:**

- Lihat **PANDUAN_LEVEL11_PLC.md** untuk diagram lengkap
- Self-hold = NO parallel dengan start button
- Timer perlu input aktif selama delay
- Counter naik setiap rising edge

---

### **Level 12: Final Assessment** � SANGAT SULIT

**Apa yang dipelajari?**

- **Ujian akhir** semua materi Level 1-11
- 12 soal pilihan ganda
- Mencakup semua topik yang sudah dipelajari

**Cara bermain:**

1. Baca soal dengan teliti
2. Pilih jawaban yang benar
3. Setelah pilih, akan muncul:
   - ✅ **Hijau** = Benar
   - ❌ **Merah** = Salah
   - **Penjelasan** jawaban yang benar
4. Klik **"Soal Berikutnya"**
5. Setelah 12 soal, lihat skor akhir

**Soal dari Materi:**

```
Level 1  → Komponen dasar
Level 2  → Kode warna resistor
Level 3  → Simbol elektronika
Level 4  → Gerbang logika
Level 5  → Sensor
Level 6  → Transistor
Level 7  → Aktuator
Level 8  → Rangkaian
Level 9  → Arduino
Level 10 → PID Controller
Level 11 → PLC Ladder Logic
+ Soal fundamental (Hukum Ohm, dll)
```

**Target:** Skor minimal **70%** (8-9 soal benar dari 12)

**Tips:**

- Baca soal sampai selesai
- Perhatikan kata kunci: "TIDAK", "KECUALI"
- Jika ragu, pilih jawaban paling logis
- Review materi level sebelumnya jika perlu

---

## 🏆 Sistem Poin & Ranking

### **Cara Kerja Poin:**

Setiap level punya **skor maksimal 100**:

```
Skor 0-69%   → Level GAGAL ❌ (tidak unlock level berikutnya)
Skor 70-100% → Level LULUS ✅ (unlock level berikutnya)
```

**Total Poin:**

```
Total Poin = Jumlah skor semua level
Maksimal = 12 level × 100 = 1200 poin
```

### **Leaderboard:**

Lihat ranking dengan klik tombol **"🏆 Lihat Leaderboard"**

**Ranking berdasarkan:**

1. Total skor tertinggi
2. Jumlah level selesai terbanyak
3. Tanggal registrasi (yang lebih dulu lebih tinggi)

**Badge:**

```
🥇 Peringkat #1 → CHAMPION (background emas)
🥈 Peringkat #2 → Silver medal
🥉 Peringkat #3 → Bronze medal
```

---

## 💡 Tips Umum Bermain MekaGame

### **1. Mulai dari Level 1**

- Jangan skip level!
- Setiap level membangun pengetahuan dari level sebelumnya
- Level 1 paling mudah, cocok untuk pemula

### **2. Baca Instruksi dengan Teliti**

- Setiap level punya instruksi khusus
- Baca deskripsi challenge sebelum mulai
- Perhatikan target/kriteria sukses

### **3. Jangan Takut Salah**

- Salah = kesempatan belajar!
- Ulangi level sampai paham
- Tidak ada batas percobaan

### **4. Gunakan Tombol "Simpan & Keluar"**

- Jika capek atau perlu istirahat
- Progress otomatis tersimpan
- Bisa lanjut kapan saja

### **5. Lihat Dokumentasi**

- File `PANDUAN_LEVEL11_PLC.md` → Panduan PLC lengkap
- File `README.md` → Info umum project
- Tanya guru jika ada yang kurang jelas

### **6. Kompetisi Sehat**

- Lihat leaderboard untuk motivasi
- Coba dapat skor lebih tinggi
- Bantu teman yang kesulitan

### **7. Review Materi**

- Sebelum Final Assessment (Level 12)
- Review singkat semua level
- Catat rumus-rumus penting

---

## ❓ FAQ (Pertanyaan Sering Ditanyakan)

### **Q: Saya lupa password, bagaimana?**

**A:** Tanya guru kamu untuk bantuan reset akun atau buat akun baru (tapi progress lama hilang).

### **Q: Level berikutnya masih locked, kenapa?**

**A:** Kamu harus dapat skor minimal **70%** di level sebelumnya untuk unlock level berikutnya.

### **Q: Saya sudah selesai level tapi tidak tersimpan?**

**A:** Klik tombol **"Simpan & Keluar"** sebelum tutup browser. Auto-save sudah aktif tapi lebih baik manual save.

### **Q: Bagaimana cara dapat poin tinggi?**

**A:**

- Jawab dengan benar dan cepat
- Minimal kesalahan
- Selesaikan semua challenge di satu level

### **Q: Level PLC (11) susah, ada panduan?**

**A:** Ada! Baca file **PANDUAN_LEVEL11_PLC.md** untuk diagram lengkap setiap challenge.

### **Q: PID Controller (Level 10) gimana tuning-nya?**

**A:** Mulai Kp=1.0, Ki=0.1, Kd=0.05. Naikkan Kp sampai cepat, Ki untuk hilangkan error, Kd untuk stabilkan.

### **Q: Skor saya stuck di 80%, gimana dapat 100%?**

**A:** Selesaikan semua challenge/soal dengan benar. Level 10 & 11 perlu selesaikan semua 5 challenge.

### **Q: Bisa main di HP?**

**A:** Bisa! Tapi lebih nyaman di laptop/PC karena ada simulator dan editor code.

### **Q: Berapa lama selesai semua level?**

**A:** Tergantung kemampuan. Rata-rata:

- Level 1-3: 10-15 menit/level
- Level 4-8: 20-30 menit/level
- Level 9-11: 30-60 menit/level
- Level 12: 15-20 menit
- **Total: 4-6 jam** untuk pemula

---

## 🎯 Target Belajar

Setelah selesai semua level, kamu akan:

✅ Mengenal komponen elektronika dasar  
✅ Bisa baca kode warna resistor  
✅ Paham simbol dan diagram elektronika  
✅ Menguasai gerbang logika digital  
✅ Tahu jenis-jenis sensor dan aplikasinya  
✅ Paham transistor dan IC dasar  
✅ Bisa kontrol motor dan aktuator  
✅ Mahir analisis rangkaian elektronika  
✅ Bisa programming Arduino sederhana  
✅ Paham sistem kontrol PID  
✅ Bisa programming PLC Ladder Logic  
✅ Siap untuk project mekatronika sederhana!

---

## � Selamat Belajar!

Ingat:

- **Belajar itu proses**, tidak instan
- **Kesalahan itu wajar**, jangan menyerah
- **Bertanya itu baik**, tanya guru atau teman
- **Practice makes perfect**, semakin sering main semakin jago!

**Semoga sukses dan selamat menikmati MekaGame!** 🎮🎓

---

**Butuh bantuan?**  
Tanya guru atau lihat dokumentasi:

- `PANDUAN_GURU.md` → Panduan untuk guru
- `PANDUAN_LEVEL11_PLC.md` → Panduan PLC detail
- `README.md` → Info umum project

### Level 1: Newbie

- [ ] Buka semua 4 modul
- [ ] Baca minimal 3 sensor
- [ ] Coba 1 simulasi aktuator

### Level 2: Explorer

- [ ] Dapat skor quiz minimal 50
- [ ] Buat 1 rangkaian
- [ ] Jalankan 1 program Arduino

### Level 3: Master

- [ ] Dapat skor quiz minimal 75
- [ ] Buat rangkaian dengan 5+ komponen
- [ ] Jalankan semua program Arduino
- [ ] Modifikasi minimal 1 program

### Level 4: Legend 🌟

- [ ] Skor quiz 100 (sempurna!)
- [ ] Buat 3 rangkaian berbeda
- [ ] Modifikasi semua program Arduino
- [ ] Bantu teman yang kesulitan

**Kamu ada di level berapa sekarang?**

---

## 📱 Shortcut Keyboard

- `Esc` - Tutup modal/popup
- `F5` - Refresh halaman
- `Ctrl + -` - Zoom out
- `Ctrl + +` - Zoom in

---

## 🎮 Selamat Belajar!

Ingat, belajar itu prosesnya yang penting, bukan hanya hasilnya!

**Jangan takut salah, terus coba dan eksplorasi!** 🚀

---

**Dibuat dengan ❤️ untuk kamu, generasi teknologi masa depan!**

_Ada pertanyaan? Tanya guru atau kirim feedback!_ 📧
