#!/bin/bash
# Build MekaGame Portable dengan PKG

echo "================================================"
echo " MekaGame - Build Portable PKG Version"
echo "================================================"
echo ""

# Check if out/ folder exists
if [ ! -d "out" ]; then
    echo "❌ ERROR: Folder 'out' tidak ditemukan!"
    echo "   Jalankan 'npm run build' terlebih dahulu."
    exit 1
fi

# Create dist-pkg directory
mkdir -p dist-pkg

echo "📦 Building executable with PKG..."
echo "   Target: Windows x64"
echo "   Output: dist-pkg/MekaGame.exe"
echo ""

# Build with PKG
npx pkg server.js \
  --targets node18-win-x64 \
  --output dist-pkg/MekaGame.exe \
  --compress Brotli

if [ $? -ne 0 ]; then
    echo "❌ Build gagal!"
    exit 1
fi

echo ""
echo "✅ Build sukses!"

# Copy out folder
echo "📁 Copying 'out' folder..."
cp -r out dist-pkg/

# Copy data folder structure (empty, will be created on first run)
mkdir -p dist-pkg/data
touch dist-pkg/data/.gitkeep

# Create README
cat > dist-pkg/README.txt << 'EOF'
================================================================================
                    🎮 MEKAGAME - PORTABLE VERSION 🎮
           Game Edukasi Interaktif Mekatronika dan Elektronika
================================================================================

⚠️  PENTING - STRUKTUR FOLDER:
================================================================================

Pastikan struktur folder seperti ini:

MekaGame-PKG/
├── MekaGame.exe     ← File utama (double-click ini!)
├── out/             ← Folder aplikasi web (JANGAN dihapus!)
├── data/            ← Database akan dibuat otomatis di sini
└── README.txt       ← File ini

JANGAN pisahkan file MekaGame.exe dari folder "out"!
Aplikasi membutuhkan folder "out" untuk berjalan.


📦 CARA MENJALANKAN:
================================================================================

SANGAT MUDAH - HANYA 2 LANGKAH:

1. Double-click file: MekaGame.exe
2. Browser akan terbuka otomatis di http://localhost:3000

⚠️  PENTING: JANGAN tutup window command prompt hitam selama menggunakan aplikasi!


💾 DATA & AKUN:
================================================================================

📌 Data Akun & Progress:
   - Tersimpan di folder: data/mekagame.db
   - Otomatis dibuat saat pertama kali dijalankan
   - Data permanen (tidak hilang meskipun restart)

📌 Backup Data:
   - Copy file: data/mekagame.db
   - Simpan di tempat aman
   - Restore: ganti file tersebut dengan backup Anda

📌 Multi-User:
   - Setiap siswa buat akun sendiri
   - Bisa bergantian di komputer yang sama
   - Logout dulu sebelum ganti user


🔧 TROUBLESHOOTING:
================================================================================

❌ "Port 3000 sudah digunakan"
   → MekaGame sudah berjalan
   → Tutup window command prompt sebelumnya
   → Atau tutup aplikasi lain yang pakai port 3000

❌ Browser tidak terbuka otomatis
   → Buka manual browser Anda
   → Ketik: http://localhost:3000

❌ Database error
   → Hapus file: data/mekagame.db
   → Jalankan ulang MekaGame.exe
   → Database baru akan dibuat

❌ "Out directory not found" atau langsung keluar
   → Pastikan folder "out" ada di folder yang sama dengan MekaGame.exe
   → Struktur harus: MekaGame.exe dan folder out/ di level yang sama
   → Jangan jalankan dari dalam folder out/
   → Extract ulang ZIP jika perlu

❌ Server langsung tertutup
   → Buka Command Prompt (cmd)
   → Drag MekaGame.exe ke window cmd
   → Tekan Enter untuk lihat error message
   → Screenshot error dan hubungi support


📊 KEBUTUHAN SISTEM:
================================================================================

✅ Sistem Operasi:
   - Windows 10 atau lebih baru (64-bit)
   - Windows 7/8 (dengan update terbaru)

✅ Software:
   - Browser modern (Chrome, Edge, Firefox)
   - TIDAK PERLU install Node.js!
   - TIDAK PERLU install Python!

✅ Hardware:
   - RAM: Minimal 2 GB (Recommended: 4 GB)
   - Storage: 100 MB free space
   - Internet: TIDAK PERLU (100% offline)


🎓 UNTUK GURU:
================================================================================

📌 Distribusi:
   - Copy seluruh folder MekaGame-PKG ke setiap komputer
   - Atau simpan di USB/flashdisk, jalankan dari sana
   - Bisa juga di network share (untuk lab komputer)

📌 Monitoring Progress:
   - Database ada di: data/mekagame.db
   - Gunakan SQLite Browser untuk melihat data
   - Atau gunakan fitur leaderboard di aplikasi

📌 Multi-Komputer:
   - Setiap komputer punya database sendiri
   - Untuk sinkronisasi, copy file database antar komputer


📞 SUPPORT & INFORMASI:
================================================================================

📧 Email: support@mekagame.com
🌐 Website: https://mekagame.com
📚 GitHub: https://github.com/pindoyono/mekaGame


================================================================================
                    Selamat Belajar! 🎮📚⚡
================================================================================
EOF

# Create ZIP package
echo "🗜️  Creating ZIP package..."
cd dist-pkg
zip -r ../MekaGame-PKG-Portable.zip . -q
cd ..

SIZE=$(du -h MekaGame-PKG-Portable.zip | cut -f1)

echo ""
echo "================================================"
echo " ✅ BUILD SELESAI!"
echo "================================================"
echo ""
echo " 📦 File: MekaGame-PKG-Portable.zip"
echo " 📏 Size: $SIZE"
echo " 📁 Folder: dist-pkg/"
echo ""
echo "================================================"
echo ""
echo "📌 Cara Distribusi:"
echo "   1. Extract MekaGame-PKG-Portable.zip"
echo "   2. Double-click MekaGame.exe"
echo "   3. TIDAK PERLU install apapun!"
echo ""
echo "✨ Siap didistribusikan ke siswa/guru!"
