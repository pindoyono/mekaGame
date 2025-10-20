# Distribusi Portable Sederhana (Tanpa Electron)

## Opsi 1: PKG - Node.js Executable Bundle ⭐ RECOMMENDED
**Kelebihan:**
- Ukuran kecil: 50-80 MB (vs Electron 200+ MB)
- Cepat startup
- Tidak perlu install Node.js
- Single .exe file
- Include SQLite database

**Cara Build:**
```bash
npm install -g pkg
npm install express better-sqlite3
pkg . --targets node18-win-x64 --output MekaGame.exe
```

**Structure:**
```
MekaGame-Portable/
├── MekaGame.exe          (50 MB - sudah include Node.js + app)
├── out/                  (folder HTML static - 5 MB)
└── README.txt
```

**Total Size: ~55 MB**

---

## Opsi 2: Laragon/XAMPP Portable
**Kelebihan:**
- Mudah untuk guru yang sudah kenal XAMPP
- Include PHP, MySQL (bonus untuk pelajaran lain)
- UI familiar

**Structure:**
```
MekaGame-Portable/
├── laragon-portable/     (download dari laragon.org)
├── www/
│   └── mekaGame/         (copy semua file)
└── START_MEKAGAME.bat    (shortcut ke localhost:3000)
```

**Total Size: ~150 MB**

---

## Opsi 3: Tauri ⚡ Modern & Kecil
**Kelebihan:**
- Ukuran sangat kecil: 10-20 MB
- Pakai browser engine sistem (WebView2)
- Lebih modern dari Electron

**Kekurangan:**
- Perlu install WebView2 di Windows (auto download)
- Setup lebih ribet

---

## Opsi 4: Static HTML + Python SimpleHTTPServer
**Paling Sederhana:**
```
MekaGame-Portable/
├── portable-python/      (embedded Python - 30 MB)
├── out/                  (HTML static)
├── run.py                (SimpleHTTPServer)
└── START.bat             (klik untuk jalankan)
```

**START.bat content:**
```batch
@echo off
cd /d %~dp0
portable-python\python.exe run.py
pause
```

**run.py:**
```python
import http.server
import socketserver
import webbrowser
import os

PORT = 3000
os.chdir('out')

Handler = http.server.SimpleHTTPHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    webbrowser.open(f'http://localhost:{PORT}')
    httpd.serve_forever()
```

**Total Size: ~35 MB**

---

## Perbandingan:

| Metode | Size | Mudah Install | Include DB | Offline |
|--------|------|---------------|------------|---------|
| **PKG** | 55 MB | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| **Python** | 35 MB | ⭐⭐⭐⭐ | ❌ (localStorage) | ✅ |
| **Laragon** | 150 MB | ⭐⭐⭐⭐⭐ | ✅ MySQL | ✅ |
| **Tauri** | 15 MB | ⭐⭐⭐ | ✅ | ✅ |
| **Electron** | 236 MB | ⭐⭐⭐ | ✅ | ✅ |

