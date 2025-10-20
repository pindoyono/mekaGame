#!/usr/bin/env python3
"""
MekaGame Portable Server
Simple HTTP server untuk menjalankan MekaGame secara offline
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

PORT = 3000

def main():
    # Get directory where script is located
    script_dir = Path(__file__).parent
    out_dir = script_dir / 'out'
    
    if not out_dir.exists():
        print("ERROR: Folder 'out' tidak ditemukan!")
        print(f"Pastikan folder out/ ada di: {out_dir}")
        input("Tekan Enter untuk keluar...")
        sys.exit(1)
    
    # Change to out directory
    os.chdir(out_dir)
    
    # Custom handler to handle SPA routing
    class MyHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            # Add headers to prevent caching
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
            self.send_header('Expires', '0')
            super().end_headers()
        
        def do_GET(self):
            # Serve index.html for root or non-existent files (SPA routing)
            if self.path == '/' or not Path(self.path[1:]).exists():
                self.path = '/index.html'
            return super().do_GET()
    
    # Create server
    Handler = MyHandler
    
    try:
        with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 60)
            print(" 🎮 MekaGame Portable Server")
            print("=" * 60)
            print(f"\n✅ Server berjalan di: {url}")
            print(f"📁 Serving dari: {out_dir}")
            print("\n🌐 Browser akan terbuka otomatis...")
            print("\n⚠️  JANGAN TUTUP WINDOW INI selama menggunakan aplikasi!")
            print("\n📌 Untuk menghentikan server: Tekan Ctrl+C")
            print("=" * 60 + "\n")
            
            # Open browser automatically
            webbrowser.open(url)
            
            # Start server
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 98 or e.errno == 10048:  # Port already in use
            print(f"\n❌ ERROR: Port {PORT} sudah digunakan!")
            print("   Kemungkinan MekaGame sudah berjalan.")
            print("   Tutup aplikasi lain yang menggunakan port tersebut.\n")
        else:
            print(f"\n❌ ERROR: {e}\n")
        input("Tekan Enter untuk keluar...")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n👋 Server dihentikan. Terima kasih telah menggunakan MekaGame!")
        sys.exit(0)

if __name__ == '__main__':
    main()
