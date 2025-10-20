# 💻 Panduan Instalasi MekaGame - Windows

## 📥 Download

Download file installer:
- **MekaGame Setup.exe** (~150 MB)

## ⚙️ Cara Install

### 1. Jalankan Installer

1. Double-click file **MekaGame Setup.exe**
2. Jika muncul peringatan Windows SmartScreen:
   - Klik "**More info**"
   - Klik "**Run anyway**"

### 2. Pilih Lokasi Instalasi

1. Pilih folder instalasi (default: `C:\Program Files\MekaGame`)
2. Centang "**Create Desktop Shortcut**" (opsional)
3. Klik "**Install**"

### 3. Tunggu Proses Instalasi

- Instalasi membutuhkan waktu 1-2 menit
- Progress bar akan menampilkan status

### 4. Selesai!

- Klik "**Finish**"
- Icon MekaGame akan muncul di desktop dan Start Menu

## 🎮 Cara Menggunakan

### Pertama Kali (Registrasi)

1. Buka aplikasi **MekaGame**
2. Klik tombol "**Daftar**"
3. Isi data:
   - **Username**: Nama pengguna (unik)
   - **Password**: Kata sandi
   - **Nama Lengkap**: Nama asli
4. Klik "**Daftar**"

### Login

1. Masukkan **Username** dan **Password**
2. Klik "**Login**"
3. Mulai bermain!

## 📚 Fitur Aplikasi

### 🎯 12 Level Pembelajaran

1. **Level 1-4**: Dasar Elektronika
   - Pengenalan Komponen
   - Rangkaian Seri-Paralel
   - Simbol Komponen
   - Gerbang Logika

2. **Level 5-8**: Sensor & Actuator
   - Sensor (LDR, PIR, Ultrasonik)
   - Actuator (Motor, LED, Buzzer)
   - Rangkaian Elektronik
   - Arduino Basic

3. **Level 9-12**: Advanced
   - Sistem Kontrol
   - PLC SCADA
   - Wiring Diagram
   - Challenge Komprehensif

### 🏆 Sistem Poin

- Setiap level memiliki challenge/kuis
- Minimal **70%** untuk unlock level berikutnya
- Maksimal **100 poin** per level
- Total **1200 poin** untuk menyelesaikan semua

### 📊 Leaderboard

- Lihat ranking siswa lain
- Compare progress dengan teman
- Motivasi untuk menyelesaikan lebih banyak level

## 💾 Data & Progress

### Penyimpanan

- Semua data tersimpan **lokal** di komputer
- Tidak memerlukan internet
- Database lokasi: `C:\Users\<Username>\AppData\Roaming\MekaGame\`

### Backup Data

Untuk backup progress:

1. Tekan `Win + R`
2. Ketik: `%APPDATA%\MekaGame`
3. Copy file `mekagame.db`
4. Simpan di USB atau cloud

### Restore Data

1. Copy file `mekagame.db` backup
2. Paste ke folder: `%APPDATA%\MekaGame\`
3. Replace file yang ada
4. Restart aplikasi

## 🔧 Troubleshooting

### Aplikasi tidak mau dibuka

**Solusi:**
1. Restart komputer
2. Install ulang aplikasi
3. Pastikan Windows 10/11 (64-bit)

### Lupa Password

**Solusi:**
1. Close aplikasi
2. Buka folder: `%APPDATA%\MekaGame`
3. Delete file `mekagame.db`
4. Buka aplikasi → Daftar ulang

**⚠️ Perhatian:** Ini akan menghapus SEMUA data!

### Progress hilang

**Penyebab:**
- File database terhapus
- Pindah user Windows
- Reinstall Windows tanpa backup

**Pencegahan:**
- Backup file `mekagame.db` secara berkala

### Aplikasi lemot/lag

**Solusi:**
1. Close aplikasi lain yang berat
2. Restart aplikasi
3. Minimal RAM: 4 GB

## 🖥️ System Requirements

### Minimum

- **OS**: Windows 10 64-bit
- **RAM**: 4 GB
- **Storage**: 500 MB free space
- **Display**: 1280x720

### Recommended

- **OS**: Windows 10/11 64-bit
- **RAM**: 8 GB atau lebih
- **Storage**: 1 GB free space
- **Display**: 1920x1080

## 🆕 Update Aplikasi

### Cek Versi

- Lihat di About/Info aplikasi
- Versi saat ini: **1.0.0**

### Cara Update

1. Download installer versi baru
2. Jalankan installer (data tidak akan hilang)
3. Pilih "**Update**" saat ditanya
4. Restart aplikasi

**💡 Tips:** Backup database sebelum update!

## ❓ FAQ (Frequently Asked Questions)

### Q: Apakah perlu internet?

**A:** Tidak! Aplikasi bekerja 100% offline.

### Q: Apakah gratis?

**A:** Ya, aplikasi ini gratis untuk tujuan pendidikan.

### Q: Bisa multi-user?

**A:** Ya! Setiap siswa bisa buat akun sendiri di komputer yang sama.

### Q: Data aman?

**A:** Data tersimpan lokal di komputer. Tidak ada pengiriman data ke server.

### Q: Bisa di laptop sekolah?

**A:** Ya, selama memenuhi system requirements dan ada izin install.

### Q: Bisa di Mac/Linux?

**A:** Saat ini hanya Windows. Versi Mac/Linux dalam pengembangan.

### Q: Ukuran install berapa?

**A:** ~250-300 MB setelah diinstall.

### Q: Bisa uninstall?

**A:** Ya, lewat Control Panel → Programs → Uninstall.

## 📞 Bantuan

Jika ada masalah:

1. **Guru/Instruktur**: Tanya guru di kelas
2. **GitHub Issues**: https://github.com/pindoyono/mekaGame/issues
3. **Email**: (isi email support jika ada)

## 📄 License

Aplikasi ini dibuat untuk tujuan pendidikan. 
Silakan gunakan untuk pembelajaran.

---

**Selamat Belajar! 🎓**

**MekaGame - Game Edukasi Mekatronika**
