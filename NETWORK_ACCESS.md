# 🌐 Akses MekaGame dari Komputer Lain (Network/LAN)

## 📖 Panduan Lengkap Multi-User Setup

MekaGame sekarang bisa diakses oleh **banyak komputer sekaligus** dalam satu jaringan lokal (LAN)!

---

## 🎯 **SKENARIO PENGGUNAAN**

### Skenario 1: Lab Komputer Sekolah
```
┌─────────────────────────────────────────────────────────┐
│                      🖥️  Server                         │
│              (Komputer Guru/Lab Server)                 │
│           Running: MekaGame.exe                         │
│           IP: 192.168.1.100                             │
│           Port: 1878                                    │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────┴────────────┬─────────────┬──────────────┐
    │                         │             │              │
┌───▼────┐              ┌─────▼───┐   ┌────▼────┐   ┌────▼────┐
│ PC 1   │              │ PC 2    │   │ PC 3    │   │ PC 4    │
│ Siswa A│              │ Siswa B │   │ Siswa C │   │ Siswa D │
└────────┘              └─────────┘   └─────────┘   └─────────┘
```

**Keuntungan:**
- ✅ 1 server untuk semua siswa
- ✅ Data terpusat (1 database)
- ✅ Leaderboard real-time
- ✅ Hemat resource (hanya 1 yang run server)

---

### Skenario 2: Komputer Pribadi di Rumah
```
┌─────────────────────────────────────────────────────────┐
│              📡  WiFi Router                            │
│              SSID: "WiFi-Rumah"                         │
│              Network: 192.168.1.0/24                    │
└─────────┬───────────────────────┬───────────────────────┘
          │                       │
    ┌─────▼──────┐          ┌─────▼──────┐
    │ Laptop     │          │ PC Desktop │
    │ (Server)   │          │ (Client)   │
    │ 192.168.1.5│          │ 192.168.1.7│
    └────────────┘          └────────────┘
```

**Keuntungan:**
- ✅ Adik kakak bisa main bareng
- ✅ Share progress satu keluarga
- ✅ Kompetisi di rumah

---

## 🚀 **CARA SETUP SERVER (HOST)**

### Langkah 1: Jalankan MekaGame sebagai Server

**Di komputer yang akan jadi server:**

1. **Double-click `MekaGame.exe`**

2. **Lihat informasi yang muncul di CMD:**
```
============================================================
  🎮 MekaGame Server (sql.js)
============================================================

  ✅ Server running at:
     • Local:   http://localhost:1878
     • Network: http://192.168.1.100:1878      ← CATAT IP INI!

  📁 Database location: C:\MekaGame-PKG\data\mekagame.db
  📂 Static files from: C:\MekaGame-PKG\out

  📌 Akses dari komputer ini:
     http://localhost:1878

  🌐 Akses dari komputer lain (LAN):
     http://192.168.1.100:1878                 ← BAGIKAN IP INI!

  ⚠️  Jangan tutup window ini!

============================================================
```

3. **CATAT IP ADDRESS** yang muncul (contoh: `192.168.1.100`)

4. **BAGIKAN IP + PORT** ke siswa/user lain
   - Misal: "Buka browser, ketik: `http://192.168.1.100:1878`"

---

### Langkah 2: Setup Firewall (PENTING!)

**Windows Firewall harus mengizinkan port 1878:**

#### Cara Otomatis (Recommended):

1. **Windows akan otomatis minta izin saat pertama kali run**
   ```
   ┌──────────────────────────────────────────────┐
   │  🛡️  Windows Security Alert                 │
   ├──────────────────────────────────────────────┤
   │  Windows Defender Firewall has blocked      │
   │  some features of this app.                 │
   │                                              │
   │  Name: MekaGame.exe                         │
   │  Publisher: Unknown                         │
   │                                              │
   │  [✓] Private networks (Home/Work)           │
   │  [✓] Public networks                        │
   │                                              │
   │      [ Cancel ]      [ Allow access ]       │
   └──────────────────────────────────────────────┘
   ```

2. **Klik "Allow access"** dan centang kedua network type

#### Cara Manual (Jika tidak muncul pop-up):

**Method 1: PowerShell (Cepat)**

1. Buka PowerShell sebagai **Administrator**
2. Jalankan command:
```powershell
New-NetFirewallRule -DisplayName "MekaGame Server" -Direction Inbound -Protocol TCP -LocalPort 1878 -Action Allow
```

**Method 2: Windows Firewall GUI**

1. Buka **Control Panel** → **Windows Defender Firewall**
2. Klik **Advanced settings** di sidebar kiri
3. Klik **Inbound Rules** → **New Rule...**
4. Pilih **Port** → Next
5. **TCP**, **Specific local ports: 1878** → Next
6. **Allow the connection** → Next
7. Centang semua (Domain, Private, Public) → Next
8. Name: **MekaGame Server** → Finish

**Verifikasi Firewall:**
```powershell
# Check if rule exists
Get-NetFirewallRule -DisplayName "MekaGame Server"
```

---

### Langkah 3: Cara Cek IP Address Komputer

**Jika IP tidak muncul otomatis di CMD:**

#### Windows:

**Method 1: Command Prompt**
```cmd
ipconfig
```
Cari baris:
```
Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . . . . : 192.168.1.100  ← INI!
```

**Method 2: PowerShell**
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*"}
```

**Method 3: Settings**
1. Buka **Settings** → **Network & Internet**
2. Klik **Properties** pada koneksi aktif (WiFi/Ethernet)
3. Scroll ke **IPv4 address** (misal: `192.168.1.100`)

---

## 💻 **CARA AKSES DARI CLIENT (USER/SISWA)**

### Langkah 1: Pastikan Dalam 1 Jaringan

**Client harus connect ke WiFi/LAN yang SAMA dengan server!**

```
✅ Server: WiFi "Lab-Komputer" → IP 192.168.1.100
✅ Client: WiFi "Lab-Komputer" → IP 192.168.1.101

❌ Server: WiFi "Lab-Komputer" → IP 192.168.1.100
❌ Client: WiFi "Rumah-Tetangga" → IP 192.168.2.50  ← BEDA NETWORK!
```

### Langkah 2: Buka Browser

Di komputer client (siswa):

1. **Buka browser** (Chrome, Firefox, Edge, dll)

2. **Ketik di address bar:**
   ```
   http://192.168.1.100:1878
   ```
   *(Ganti dengan IP server yang sebenarnya)*

3. **Enter** → MekaGame akan terbuka!

4. **Daftar/Login** seperti biasa

### Langkah 3: Main Seperti Biasa

- Semua fitur sama seperti akses localhost
- Data tersimpan di server (database terpusat)
- Leaderboard real-time sync

---

## 🔧 **TROUBLESHOOTING**

### ❌ Problem 1: "This site can't be reached"

**Penyebab & Solusi:**

✅ **Check 1: Server masih running?**
```
- Lihat CMD window server
- Pastikan masih ada tulisan "Server running"
- Jangan tutup CMD window!
```

✅ **Check 2: IP Address benar?**
```
- Verifikasi lagi IP server dengan ipconfig
- Pastikan tidak salah ketik (misal 100 vs 10)
- Coba copy-paste daripada ketik manual
```

✅ **Check 3: Port benar?**
```
- Default port: 1878
- Harus ada ":1878" di URL
- Contoh: http://192.168.1.100:1878 ✅
- Salah: http://192.168.1.100 ❌
```

✅ **Check 4: Dalam 1 network?**
```
Windows:
> ipconfig

Server: 192.168.1.100 (subnet: 192.168.1.x) ✅
Client: 192.168.1.105 (subnet: 192.168.1.x) ✅
```

✅ **Check 5: Firewall block?**
```
- Matikan firewall sementara untuk test
- Jika berhasil = firewall block port 1878
- Buat firewall rule seperti panduan di atas
```

✅ **Check 6: Ping test**
```cmd
ping 192.168.1.100
```
Jika "Request timed out" → Network issue atau firewall block

---

### ❌ Problem 2: Connection Timeout

**Solusi:**

1. **Disable Windows Firewall sementara (untuk test)**
   - Control Panel → Firewall → Turn off (Private network)
   - Jika berhasil = masalah di firewall rule

2. **Test dengan Telnet**
```cmd
telnet 192.168.1.100 1878
```
   - Jika "Could not open connection" → Port blocked
   - Jika berhasil connect → Port OK

3. **Cek Antivirus**
   - Beberapa antivirus block port random
   - Tambahkan exception untuk MekaGame.exe

---

### ❌ Problem 3: Slow Loading

**Penyebab:**
- WiFi lemah
- Banyak user sekaligus
- Server komputer lambat

**Solusi:**
- Gunakan Ethernet cable (lebih stabil)
- Upgrade RAM server
- Limit jumlah concurrent users (max 30-50)

---

### ❌ Problem 4: Data Tidak Sinkron

**Gejala:**
- Leaderboard tidak update
- Progress hilang setelah refresh

**Solusi:**
1. **Jangan tutup server tiba-tiba**
   - Save otomatis setiap 30 detik
   - Tunggu beberapa detik sebelum close

2. **Check database file**
```
dist-pkg/data/mekagame.db
```
   - Pastikan file ada dan tidak corrupt
   - Backup berkala

---

## 📊 **MONITORING & MANAGEMENT**

### A. Lihat Jumlah User Online

**Di server, buka browser dev tools (F12):**
```
Network tab → XHR → Lihat request /api/progress
```

Atau install tool monitoring:
```bash
npm install -g pm2
pm2 start server-sqljs.js --name mekagame
pm2 monit  # Real-time monitoring
```

### B. Limit Bandwidth

Jika network lambat, setting di router:
- QoS (Quality of Service)
- Bandwidth limit per device
- Prioritas traffic

### C. Backup Database

**Backup manual:**
```cmd
copy dist-pkg\data\mekagame.db backup\mekagame_20251020.db
```

**Backup otomatis (Task Scheduler):**
1. Buat batch file `backup.bat`:
```batch
@echo off
set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%
copy "C:\MekaGame-PKG\data\mekagame.db" "C:\Backup\mekagame_%timestamp%.db"
```

2. Task Scheduler → Create Task → Daily backup

---

## 🏫 **SETUP UNTUK LAB SEKOLAH**

### Recommended Setup:

```
┌──────────────────────────────────────────────┐
│  🖥️  SERVER (1 PC)                           │
│  Spec: i3/4GB RAM/100GB HDD minimal          │
│  OS: Windows 10/11                           │
│  Network: LAN Gigabit                        │
│  IP: Static (192.168.1.100)                  │
│  Folder: C:\MekaGame-Server\                 │
└──────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────────┐
        │    🔌 Switch Gigabit         │
        └────┬───┬───┬───┬───┬───┬────┘
             │   │   │   │   │   │
       ┌─────▼───▼───▼───▼───▼───▼─────┐
       │  👨‍🎓  30 PC Client               │
       │  Spec: Pentium/2GB RAM         │
       │  Browser: Chrome/Firefox       │
       │  Access: http://192.168.1.100:1878 │
       └───────────────────────────────┘
```

### Langkah Setup Lab:

1. **Pilih 1 PC sebagai server** (PC terbaik/PC guru)

2. **Set Static IP di server**
   ```
   IP Address: 192.168.1.100
   Subnet Mask: 255.255.255.0
   Gateway: 192.168.1.1
   ```

3. **Extract MekaGame di server**
   - Path: `C:\MekaGame-Server\`
   - Share folder (optional) untuk backup

4. **Setup Firewall** (lihat panduan di atas)

5. **Test dari 1 client dulu**
   - Buka `http://192.168.1.100:1878`
   - Daftar akun test
   - Main 1 level

6. **Jika OK, bagikan ke semua siswa**
   - Tulis di whiteboard: `http://192.168.1.100:1878`
   - Atau buat shortcut di desktop client

7. **Monitor selama penggunaan**
   - Jangan tutup CMD server
   - Check CPU/RAM usage
   - Check network traffic

### Tips Optimasi Lab:

- ✅ Gunakan LAN cable, bukan WiFi (lebih stabil)
- ✅ Set server ke SSD jika ada (database I/O lebih cepat)
- ✅ Backup database setiap hari (otomatis)
- ✅ Buat user account "demo" untuk test
- ✅ Print quick guide di setiap meja siswa

---

## 🔐 **KEAMANAN**

### A. Network Security

**MekaGame hanya bisa diakses di LAN (tidak dari internet):**
```
✅ 192.168.x.x → LAN (Private) → AMAN
✅ 10.x.x.x → LAN (Private) → AMAN
❌ Public IP → Internet → TIDAK DIDESAIN UNTUK INI
```

**Jika ingin akses dari internet:**
- Tidak recommended (no authentication, no encryption)
- Butuh setup:
  - Port forwarding di router
  - Dynamic DNS
  - SSL/HTTPS certificate
  - Better: Deploy ke VPS (lihat DEPLOY_VPS_UBUNTU.md)

### B. Data Privacy

**Database tersimpan lokal:**
```
dist-pkg/data/mekagame.db
```

**Berisi:**
- Username (plain text)
- Password (plain text) ⚠️
- Progress & scores

**⚠️ PENTING:**
- Jangan gunakan password penting!
- Database tidak encrypted
- Untuk lingkungan sekolah/lab saja
- Bukan untuk data sensitif

---

## 📱 **AKSES DARI MOBILE (BONUS)**

Jika server dan HP dalam WiFi yang sama:

1. **Cek IP server** (misal: `192.168.1.100`)

2. **Di HP, buka browser**

3. **Ketik:** `http://192.168.1.100:1878`

4. **UI responsive** - otomatis adjust ke layar HP

**Tips:**
- Landscape mode lebih nyaman
- Simulasi Level 4-11 butuh layar besar
- Quiz level 1-3 OK di mobile

---

## 📋 **CHECKLIST SETUP NETWORK ACCESS**

### ✅ Server (Host):
- [ ] Extract MekaGame-PKG-Portable.zip
- [ ] Jalankan MekaGame.exe
- [ ] Catat IP address yang muncul di CMD
- [ ] Setup Windows Firewall (allow port 1878)
- [ ] Test dari localhost: `http://localhost:1878`
- [ ] Jangan tutup CMD window

### ✅ Client (User):
- [ ] Connect ke WiFi/LAN yang sama dengan server
- [ ] Buka browser
- [ ] Ketik: `http://[IP-SERVER]:1878`
- [ ] Daftar/Login akun
- [ ] Main seperti biasa

### ✅ Troubleshooting:
- [ ] Ping test: `ping [IP-SERVER]`
- [ ] Telnet test: `telnet [IP-SERVER] 1878`
- [ ] Firewall off test (sementara)
- [ ] Check server masih running
- [ ] Verify IP & port benar

---

## 💡 **TIPS & BEST PRACTICES**

### Untuk Guru/Admin:

1. **Pre-setup sebelum kelas**
   - Test semua PC client
   - Buat 1-2 akun demo
   - Verify leaderboard sync

2. **During class:**
   - Monitor server CMD output
   - Check error messages
   - Ready restart jika error

3. **Akhir sesi:**
   - Tunggu 1 menit (auto-save)
   - Backup database
   - Tutup server dengan Ctrl+C (graceful shutdown)

### Untuk Siswa:

1. **Save IP di bookmark**
   - Chrome: Ctrl+D
   - Nama: "MekaGame Lab"
   - Next time langsung klik bookmark

2. **Jangan refresh berlebihan**
   - Tunggu loading selesai
   - Progress auto-save setiap level

3. **Logout sebelum tutup**
   - Klik tombol Logout
   - Atau minimal tunggu 30 detik sebelum close

---

## 🎉 **KEUNTUNGAN NETWORK MODE**

### ✅ Collaborative Learning:
- Siswa bisa lihat progress teman (leaderboard)
- Kompetisi sehat
- Motivasi untuk improve

### ✅ Teacher Dashboard (Future):
- Guru bisa monitor progress semua siswa
- Lihat level mana yang paling sulit
- Identify siswa yang butuh bantuan

### ✅ Resource Efficient:
- 1 server untuk 30+ siswa
- Tidak perlu install di setiap PC
- Centralized update

### ✅ Data Centralized:
- 1 database untuk semua
- Backup sekali saja
- Konsisten data

---

## 📞 **DUKUNGAN**

Jika ada masalah:

1. **Check dokumentasi ini** (solusi umum ada di Troubleshooting)
2. **Test basic networking** (ping, telnet)
3. **Check firewall** (paling sering jadi masalah)
4. **Contact guru/admin lab**

---

**🌐 Selamat menggunakan MekaGame dalam mode Network!**

*Multi-user gaming untuk pembelajaran yang lebih seru! 🎮*

---

**Last Updated:** 20 Oktober 2025  
**Version:** 1.1 (Network Access Enabled)  
**Port:** 1878  
**Protocol:** HTTP (LAN only)
