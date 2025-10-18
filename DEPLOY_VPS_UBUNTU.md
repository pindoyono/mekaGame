# 🚀 Panduan Deploy MekaGame di VPS Ubuntu dengan Nginx

## 📋 Daftar Isi

1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Persiapan VPS](#persiapan-vps)
3. [Install Dependencies](#install-dependencies)
4. [Clone & Setup Project](#clone--setup-project)
5. [Build Production](#build-production)
6. [Konfigurasi Nginx](#konfigurasi-nginx)
7. [Setup PM2 (Process Manager)](#setup-pm2-process-manager)
8. [SSL Certificate (HTTPS)](#ssl-certificate-https)
9. [Firewall & Security](#firewall--security)
10. [Maintenance & Monitoring](#maintenance--monitoring)
11. [Troubleshooting](#troubleshooting)

---

## 📦 Persyaratan Sistem

### **Minimum Requirements:**

- **OS:** Ubuntu 20.04 LTS atau lebih baru (22.04 LTS recommended)
- **RAM:** 1 GB (2 GB recommended)
- **Storage:** 10 GB free space
- **CPU:** 1 vCore (2 vCore recommended)
- **Network:** Public IP address

### **Software Requirements:**

- Node.js 18.x atau lebih baru
- npm 9.x atau lebih baru
- Nginx 1.18 atau lebih baru
- Git
- PM2 (Process Manager)

---

## 🔧 Persiapan VPS

### **1. Update System**

```bash
# Login sebagai root atau user dengan sudo privileges
ssh user@your-vps-ip

# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential
```

### **2. Buat User untuk Aplikasi (Optional tapi Recommended)**

```bash
# Buat user khusus untuk aplikasi
sudo adduser mekagame

# Tambahkan ke sudo group
sudo usermod -aG sudo mekagame

# Login sebagai user baru
su - mekagame
```

---

## 📥 Install Dependencies

### **1. Install Node.js 18.x (LTS)**

```bash
# Install Node.js menggunakan NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js dan npm
sudo apt install -y nodejs

# Verifikasi instalasi
node --version    # Should output: v18.x.x
npm --version     # Should output: 9.x.x
```

### **2. Install Nginx**

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx service
sudo systemctl start nginx

# Enable auto-start on boot
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx

# Verifikasi: Buka browser, akses http://your-vps-ip
# Seharusnya muncul "Welcome to nginx!"
```

### **3. Install PM2 (Process Manager)**

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verifikasi instalasi
pm2 --version

# Setup PM2 startup script
pm2 startup
# Copy dan jalankan command yang muncul (biasanya sudo ...)
```

---

## 📂 Clone & Setup Project

### **1. Clone Repository dari GitHub**

```bash
# Pindah ke home directory
cd ~

# Clone repository
git clone https://github.com/pindoyono/mekaGame.git

# Masuk ke folder project
cd mekaGame

# Verifikasi files
ls -la
```

### **2. Install Dependencies**

```bash
# Install semua npm packages
npm install

# Ini akan install:
# - Next.js
# - React
# - TypeScript
# - Framer Motion
# - Lucide React
# - Tailwind CSS
# - dll.

# Tunggu sampai selesai (bisa 2-5 menit)
```

### **3. Konfigurasi Environment Variables (jika ada)**

```bash
# Buat file .env.local (jika diperlukan)
nano .env.local

# Contoh isi (sesuaikan dengan kebutuhan):
# NEXT_PUBLIC_APP_URL=https://yourdomain.com
# NODE_ENV=production

# Save: Ctrl+O, Enter, Ctrl+X
```

---

## 🏗️ Build Production

### **1. Build Next.js Application**

```bash
# Pastikan masih di folder project
cd ~/mekaGame

# Build untuk production
npm run build

# Output:
# - Optimized production build
# - Static pages generated
# - Build completed in ~2-5 minutes
```

### **2. Test Build Locally**

```bash
# Test production build
npm run start

# Akses: http://your-vps-ip:3000
# Jika berhasil, tekan Ctrl+C untuk stop
```

---

## ⚙️ Konfigurasi Nginx

### **1. Buat Konfigurasi Nginx untuk MekaGame**

```bash
# Buat file konfigurasi baru
sudo nano /etc/nginx/sites-available/mekagame
```

**Paste konfigurasi berikut:**

```nginx
# Konfigurasi untuk MekaGame
server {
    listen 80;
    listen [::]:80;

    # Ganti dengan domain Anda
    server_name yourdomain.com www.yourdomain.com;

    # Jika tidak punya domain, gunakan IP:
    # server_name your-vps-ip;

    # Logs
    access_log /var/log/nginx/mekagame-access.log;
    error_log /var/log/nginx/mekagame-error.log;

    # Proxy ke Next.js (running di port 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Headers tambahan
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching (Next.js _next/static)
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }

    # Public files caching
    location /public {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_comp_level 6;
    gzip_min_length 1000;
}
```

**Save file:** `Ctrl+O`, `Enter`, `Ctrl+X`

### **2. Enable Konfigurasi**

```bash
# Buat symbolic link ke sites-enabled
sudo ln -s /etc/nginx/sites-available/mekagame /etc/nginx/sites-enabled/

# Test konfigurasi Nginx
sudo nginx -t

# Jika output: "syntax is ok" dan "test is successful"
# Reload Nginx
sudo systemctl reload nginx
```

### **3. Hapus Default Nginx Page (Optional)**

```bash
# Nonaktifkan default site
sudo rm /etc/nginx/sites-enabled/default

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔄 Setup PM2 (Process Manager)

### **1. Start Aplikasi dengan PM2**

```bash
# Pindah ke folder project
cd ~/mekaGame

# Start dengan PM2
pm2 start npm --name "mekagame" -- start

# Atau gunakan ecosystem file (lebih advanced)
pm2 start ecosystem.config.js
```

### **2. Buat Ecosystem File (Recommended)**

```bash
# Buat ecosystem file
nano ecosystem.config.js
```

**Paste konfigurasi berikut:**

```javascript
module.exports = {
  apps: [
    {
      name: "mekagame",
      script: "npm",
      args: "start",
      cwd: "/home/mekagame/mekaGame",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
```

**Start dengan ecosystem:**

```bash
# Stop previous PM2 process (jika ada)
pm2 stop all
pm2 delete all

# Start dengan ecosystem file
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Check status
pm2 status

# View logs
pm2 logs mekagame
```

### **3. PM2 Commands Reference**

```bash
# List all processes
pm2 list

# View logs
pm2 logs mekagame

# Stop application
pm2 stop mekagame

# Restart application
pm2 restart mekagame

# Delete from PM2
pm2 delete mekagame

# Monitor resources
pm2 monit

# View detailed info
pm2 show mekagame
```

---

## 🔒 SSL Certificate (HTTPS)

### **1. Install Certbot (Let's Encrypt)**

```bash
# Install Certbot dan Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Verifikasi instalasi
certbot --version
```

### **2. Obtain SSL Certificate**

```bash
# Pastikan domain sudah pointing ke VPS IP
# Check dengan: dig yourdomain.com

# Dapatkan SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# 1. Enter email address
# 2. Agree to Terms of Service (Y)
# 3. Share email (optional, Y/N)
# 4. Redirect HTTP to HTTPS (pilih 2 - Redirect)

# Certificate akan otomatis di-install dan Nginx di-configure
```

### **3. Test SSL Certificate**

```bash
# Akses website dengan HTTPS
# https://yourdomain.com

# Seharusnya ada icon gembok di browser
# Certificate valid dari Let's Encrypt
```

### **4. Auto-Renewal Setup**

```bash
# Certbot otomatis setup cron job untuk renewal
# Test renewal:
sudo certbot renew --dry-run

# Jika sukses, certificate akan auto-renew sebelum expire
```

### **5. Updated Nginx Config (Setelah SSL)**

Certbot akan otomatis update konfigurasi Nginx. File `/etc/nginx/sites-available/mekagame` akan terlihat seperti:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificate (added by Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Rest of your configuration...
    location / {
        proxy_pass http://localhost:3000;
        # ... (sama seperti sebelumnya)
    }
}
```

---

## 🛡️ Firewall & Security

### **1. Setup UFW Firewall**

```bash
# Install UFW (biasanya sudah installed)
sudo apt install -y ufw

# Allow SSH (PENTING! Jangan sampai terkunci)
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose

# Output harus menunjukkan:
# 22/tcp    ALLOW    Anywhere
# 80/tcp    ALLOW    Anywhere
# 443/tcp   ALLOW    Anywhere
```

### **2. Fail2Ban (Protection dari Brute Force)**

```bash
# Install Fail2Ban
sudo apt install -y fail2ban

# Copy default config
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit config
sudo nano /etc/fail2ban/jail.local

# Cari section [sshd] dan pastikan:
# enabled = true
# maxretry = 3
# bantime = 3600

# Save dan restart
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

### **3. Security Headers di Nginx**

Edit konfigurasi Nginx dan tambahkan security headers:

```bash
sudo nano /etc/nginx/sites-available/mekagame
```

Tambahkan di dalam `server` block:

```nginx
# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:;" always;

# Hide Nginx version
server_tokens off;
```

Reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔄 Maintenance & Monitoring

### **1. Update Aplikasi**

```bash
# Login ke VPS
ssh user@your-vps-ip

# Pindah ke folder project
cd ~/mekaGame

# Stop PM2
pm2 stop mekagame

# Pull latest changes
git pull origin main

# Install new dependencies (jika ada)
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart mekagame

# Check logs
pm2 logs mekagame --lines 50
```

### **2. Backup Database/Progress (LocalStorage)**

LocalStorage disimpan di browser client, tapi untuk backup konfigurasi:

```bash
# Backup folder project
cd ~
tar -czf mekagame-backup-$(date +%Y%m%d).tar.gz mekaGame/

# Copy ke location aman atau download
scp user@your-vps-ip:~/mekagame-backup-*.tar.gz ./
```

### **3. Monitoring Commands**

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top
# Atau
htop  # (install: sudo apt install htop)

# Check Nginx logs
sudo tail -f /var/log/nginx/mekagame-access.log
sudo tail -f /var/log/nginx/mekagame-error.log

# Check PM2 logs
pm2 logs mekagame

# Check system logs
sudo journalctl -u nginx -f
```

### **4. Setup Automated Backups (Cron Job)**

```bash
# Edit crontab
crontab -e

# Tambahkan backup otomatis setiap hari jam 2 pagi:
0 2 * * * cd ~ && tar -czf mekagame-backup-$(date +\%Y\%m\%d).tar.gz mekaGame/ && find ~/ -name "mekagame-backup-*.tar.gz" -mtime +7 -delete

# Save dan exit
```

### **5. Monitoring dengan PM2 Plus (Optional)**

```bash
# Register di https://app.pm2.io
# Dapatkan public/secret key

# Link PM2 dengan PM2 Plus
pm2 link <secret_key> <public_key>

# Sekarang bisa monitor dari web dashboard
```

---

## 🐛 Troubleshooting

### **Problem 1: Port 3000 Already in Use**

```bash
# Check process di port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>

# Atau restart PM2
pm2 restart mekagame
```

### **Problem 2: 502 Bad Gateway**

**Penyebab:** Next.js tidak berjalan di port 3000

**Solusi:**

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs mekagame

# Restart aplikasi
pm2 restart mekagame

# Check jika port 3000 listening
sudo netstat -tlnp | grep 3000
```

### **Problem 3: Permission Denied**

```bash
# Fix ownership
sudo chown -R mekagame:mekagame ~/mekaGame

# Fix permissions
chmod -R 755 ~/mekaGame
```

### **Problem 4: Build Failed**

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

### **Problem 5: SSL Certificate Error**

```bash
# Renew certificate manually
sudo certbot renew

# Check certificate expiry
sudo certbot certificates

# Force renew
sudo certbot renew --force-renewal
```

### **Problem 6: High Memory Usage**

```bash
# Check memory
free -h

# Restart PM2 with memory limit
pm2 restart mekagame --max-memory-restart 500M

# Clear cache
pm2 flush
```

### **Problem 7: Nginx Configuration Error**

```bash
# Test config
sudo nginx -t

# Check error details
sudo journalctl -u nginx -n 50

# Restore backup config
sudo cp /etc/nginx/sites-available/mekagame.bak /etc/nginx/sites-available/mekagame

# Reload
sudo systemctl reload nginx
```

---

## 📊 Performance Optimization

### **1. Enable Gzip Compression**

Sudah included di konfigurasi Nginx di atas.

### **2. Setup Nginx Caching**

```bash
# Edit main Nginx config
sudo nano /etc/nginx/nginx.conf
```

Tambahkan di `http` block:

```nginx
# Cache zone
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m use_temp_path=off;
```

Update site config:

```nginx
location / {
    proxy_cache my_cache;
    proxy_cache_bypass $http_cache_control;
    add_header X-Cache-Status $upstream_cache_status;
    # ... rest of proxy settings
}
```

### **3. PM2 Cluster Mode (Multi-Core)**

```bash
# Update ecosystem.config.js
# Change: instances: 1
# To: instances: "max"  // Use all CPU cores

# Restart
pm2 restart mekagame
```

---

## ✅ Checklist Deploy

### **Pre-Deployment:**

- [ ] VPS ready dengan Ubuntu 20.04+
- [ ] Domain pointing ke VPS IP (jika pakai domain)
- [ ] SSH access working
- [ ] Minimum 1GB RAM, 10GB storage

### **Installation:**

- [ ] System updated (`apt update && apt upgrade`)
- [ ] Node.js 18.x installed
- [ ] Nginx installed dan running
- [ ] PM2 installed globally
- [ ] Git installed

### **Application Setup:**

- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Production build created (`npm run build`)
- [ ] Application tested locally (port 3000)

### **Nginx Configuration:**

- [ ] Nginx config file created
- [ ] Config syntax tested (`nginx -t`)
- [ ] Nginx reloaded
- [ ] Site accessible via HTTP

### **PM2 Setup:**

- [ ] PM2 ecosystem file created
- [ ] Application started with PM2
- [ ] PM2 startup configured
- [ ] PM2 process saved

### **SSL (Optional tapi Recommended):**

- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] HTTPS working
- [ ] Auto-renewal tested

### **Security:**

- [ ] UFW firewall configured
- [ ] Fail2Ban installed
- [ ] Security headers added
- [ ] SSH key-based auth (recommended)

### **Post-Deployment:**

- [ ] Application accessible dari internet
- [ ] Logs berjalan normal
- [ ] PM2 auto-restart working
- [ ] Monitoring setup (PM2 Plus atau tool lain)
- [ ] Backup strategy implemented

---

## 📚 Referensi & Resource

### **Official Documentation:**

- Next.js Deployment: https://nextjs.org/docs/deployment
- Nginx Documentation: https://nginx.org/en/docs/
- PM2 Documentation: https://pm2.keymetrics.io/docs/
- Let's Encrypt: https://letsencrypt.org/docs/

### **Useful Commands:**

```bash
# System info
uname -a
lsb_release -a

# Check services
sudo systemctl status nginx
sudo systemctl status pm2-mekagame

# Resource monitoring
htop
pm2 monit

# Logs
pm2 logs mekagame
sudo tail -f /var/log/nginx/mekagame-error.log

# Restart all
pm2 restart all
sudo systemctl reload nginx
```

---

## 🎉 Selesai!

Aplikasi MekaGame Anda sekarang sudah live di VPS Ubuntu dengan Nginx!

**Akses:**

- HTTP: http://yourdomain.com (atau http://your-vps-ip)
- HTTPS: https://yourdomain.com (jika sudah setup SSL)

**Support:**

- GitHub Issues: https://github.com/pindoyono/mekaGame/issues
- Dokumentasi lengkap: Lihat folder root project

---

**Last Updated:** Oktober 2025  
**Version:** 1.0  
**Author:** MekaGame Development Team
