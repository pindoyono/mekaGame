# 🚀 Panduan Build Electron Desktop App - MekaGame

## 📋 Prasyarat

Pastikan sudah terinstall:
- Node.js 18+ 
- npm atau yarn
- Git

## 🛠️ Cara Build Windows Installer (.exe)

### 1. Install Dependencies (Sudah Selesai)

```bash
npm install
```

Dependencies yang diperlukan sudah terinstall:
- `electron` - Framework desktop app
- `electron-builder` - Untuk build installer
- `better-sqlite3` - Database lokal
- `concurrently` & `wait-on` - Development tools

### 2. Development Mode (Testing)

Untuk test aplikasi sebelum build:

```bash
npm run electron:dev
```

Perintah ini akan:
1. Start Next.js dev server (port 3000)
2. Wait sampai server ready
3. Launch Electron window otomatis

**Catatan:** Pastikan tidak ada aplikasi lain yang menggunakan port 3000.

### 3. Build Production (.exe Installer)

Untuk membuat installer Windows:

```bash
npm run electron:build
```

Proses ini akan:
1. Build Next.js production (`npm run build`)
2. Package dengan Electron
3. Create installer `.exe` untuk Windows x64

**Output:**
```
dist/
├── MekaGame Setup 1.0.0.exe     ← Installer (distribusi ini)
├── win-unpacked/                 ← Unpacked app (testing)
└── builder-debug.yml
```

### 4. Distribusi

File yang didistribusikan:
- **`MekaGame Setup 1.0.0.exe`** (~150-200 MB)

Cara install untuk pengguna:
1. Download file `.exe`
2. Double-click untuk install
3. Pilih lokasi instalasi (default: `C:\Program Files\MekaGame`)
4. Install selesai - icon muncul di desktop & start menu
5. Klik icon untuk menjalankan

## 🗄️ Database Lokal

### Lokasi Database

Database SQLite otomatis dibuat di:
```
Windows: C:\Users\<Username>\AppData\Roaming\MekaGame\mekagame.db
```

### Struktur Database

**Tabel `users`:**
```sql
id INTEGER PRIMARY KEY
username TEXT UNIQUE
password TEXT  
name TEXT
created_at DATETIME
```

**Tabel `progress`:**
```sql
id INTEGER PRIMARY KEY
user_id INTEGER (FK)
level INTEGER
score INTEGER
completed BOOLEAN
updated_at DATETIME
UNIQUE(user_id, level)
```

### Backup/Reset Database

Untuk backup progress siswa:
1. Buka folder: `%APPDATA%\MekaGame`
2. Copy file `mekagame.db`
3. Simpan di tempat aman

Untuk reset (hapus semua data):
1. Close aplikasi MekaGame
2. Delete file `mekagame.db` di folder AppData
3. Start aplikasi lagi (database baru akan dibuat)

## 🔧 Konfigurasi

### Ubah Nama/Icon Aplikasi

Edit `package.json`:

```json
{
  "build": {
    "appId": "com.mekagame.app",
    "productName": "MekaGame",  // ← Nama aplikasi
    "win": {
      "icon": "public/icon.png"  // ← Path icon (256x256 PNG)
    }
  }
}
```

### Ubah Versi

Edit `package.json`:

```json
{
  "version": "1.0.0"  // ← Update versi di sini
}
```

## 🐛 Troubleshooting

### Error: Port 3000 already in use

Solusi:
```bash
# Windows
npx kill-port 3000

# Atau manual cari process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: better-sqlite3 binding

Jika ada error native module:
```bash
npm rebuild better-sqlite3 --update-binary
```

### Aplikasi tidak mau start

1. Cek apakah `.next` folder ada (hasil build)
2. Jalankan: `npm run build` dulu
3. Lalu: `npm run electron:build`

### Installer terlalu besar

Opsi optimasi di `package.json`:

```json
{
  "build": {
    "compression": "maximum",
    "asar": true,
    "files": [
      "!**/.git",
      "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
      "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
      "!**/node_modules/*.d.ts",
      "!**/node_modules/.bin"
    ]
  }
}
```

## 📦 Ukuran File

Estimasi ukuran:
- **Installer (.exe)**: ~150-180 MB
- **Installed size**: ~250-300 MB
- **Database (per user)**: ~1-5 MB

Ukuran besar karena:
- Chromium engine (Electron)
- Node.js runtime
- Next.js framework
- React libraries

## 🚀 Optimasi

Untuk mengurangi ukuran:

1. **Exclude dev dependencies dari build:**
   Sudah dikonfigurasi otomatis oleh electron-builder

2. **Compress executable:**
   Sudah aktif (NSIS compression)

3. **Lazy load modules:**
   Next.js sudah melakukan code-splitting otomatis

## 📖 Cara Penggunaan

### Untuk Developer

```bash
# Development
npm run electron:dev

# Build production
npm run electron:build

# Build untuk platform lain
npm run electron:build -- --mac    # macOS
npm run electron:build -- --linux  # Linux
```

### Untuk Pengguna Akhir

1. Download `MekaGame Setup.exe`
2. Install seperti aplikasi biasa
3. Aplikasi bekerja 100% offline
4. Progress tersimpan lokal di komputer

## 🔐 Security

- Password disimpan plain text (untuk versi sekolah sederhana)
- Untuk production, tambahkan enkripsi:
  ```javascript
  const bcrypt = require('bcrypt');
  const hashedPassword = await bcrypt.hash(password, 10);
  ```

## 📝 Changelog

### Version 1.0.0
- ✅ Initial release
- ✅ Electron desktop app
- ✅ SQLite local database
- ✅ 12 levels interaktif
- ✅ Login system offline
- ✅ Progress tracking
- ✅ Windows installer

## 🆘 Support

Untuk bantuan atau bug report:
- GitHub: https://github.com/pindoyono/mekaGame
- Issues: https://github.com/pindoyono/mekaGame/issues

---

**Dibuat dengan ❤️ untuk pendidikan mekatronika**
