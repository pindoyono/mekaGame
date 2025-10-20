#!/bin/bash
# Script untuk download dan bundle Python portable untuk Windows

echo "================================================"
echo " MekaGame - Build Portable Version dengan Python"
echo "================================================"
echo ""

# Check if out/ folder exists
if [ ! -d "out" ]; then
    echo "ERROR: Folder 'out' tidak ditemukan!"
    echo "Jalankan 'npm run build' terlebih dahulu."
    exit 1
fi

# Create portable directory structure
echo "📁 Membuat struktur folder portable..."
mkdir -p portable-bundle
cp -r portable/* portable-bundle/
cd portable-bundle

echo "⬇️  Downloading Python embeddable untuk Windows..."
echo "   (Ini akan memakan waktu beberapa menit...)"

# Download Python embeddable (Windows x64 - ~10 MB)
PYTHON_VERSION="3.11.6"
PYTHON_URL="https://www.python.org/ftp/python/${PYTHON_VERSION}/python-${PYTHON_VERSION}-embed-amd64.zip"

if command -v wget &> /dev/null; then
    wget -q --show-progress "$PYTHON_URL" -O python-embed.zip
elif command -v curl &> /dev/null; then
    curl -L --progress-bar "$PYTHON_URL" -o python-embed.zip
else
    echo "ERROR: wget atau curl tidak ditemukan!"
    echo "Install salah satu untuk download Python."
    exit 1
fi

# Extract Python
echo "📦 Extracting Python..."
unzip -q python-embed.zip -d python3
rm python-embed.zip

# Update START_MEKAGAME.bat to use embedded Python
echo "✏️  Updating launcher..."
cat > START_MEKAGAME.bat << 'EOF'
@echo off
REM MekaGame Portable Launcher (with embedded Python)
title MekaGame Portable
color 0A

echo.
echo ================================================
echo  MekaGame - Game Edukasi Mekatronika
echo ================================================
echo.
echo  Memulai server...
echo.

cd /d "%~dp0"

if not exist "out\" (
    echo ERROR: Folder 'out' tidak ditemukan!
    pause
    exit /b 1
)

REM Use embedded Python
python3\python.exe run.py

pause
EOF

cd ..

echo "📦 Membuat ZIP final..."
zip -r MekaGame-Portable-WithPython.zip portable-bundle/ -q

SIZE=$(du -h MekaGame-Portable-WithPython.zip | cut -f1)

echo ""
echo "✅ SELESAI!"
echo "================================================"
echo " File: MekaGame-Portable-WithPython.zip"
echo " Size: $SIZE"
echo "================================================"
echo ""
echo "📌 Cara Distribusi:"
echo "   1. Extract ZIP"
echo "   2. Double-click START_MEKAGAME.bat"
echo "   3. TIDAK PERLU INSTALL PYTHON!"
echo ""

# Cleanup
rm -rf portable-bundle

echo "✨ Siap didistribusikan!"
