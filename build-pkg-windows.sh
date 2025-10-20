#!/bin/bash
# Build script untuk Windows (harus dijalankan di Windows dengan Node.js installed)

echo "================================================"
echo " MekaGame - Build PKG untuk Windows"
echo " Script ini HARUS dijalankan di Windows!"
echo "================================================"
echo ""

# Check if running on Windows
if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "win32" ]]; then
    echo "⚠️  WARNING: Anda tidak menjalankan ini di Windows!"
    echo "   better-sqlite3 perlu di-compile di platform target."
    echo ""
    echo "📝 Untuk build di Windows:"
    echo "   1. Install Node.js di Windows"
    echo "   2. npm install"
    echo "   3. npm run build"
    echo "   4. npm install -g pkg"
    echo "   5. Jalankan script ini di Windows"
    echo ""
    read -p "Lanjutkan anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if out/ folder exists
if [ ! -d "out" ]; then
    echo "❌ ERROR: Folder 'out' tidak ditemukan!"
    echo "   Jalankan 'npm run build' terlebih dahulu."
    exit 1
fi

# Rebuild better-sqlite3 for Windows
echo "📦 Rebuilding better-sqlite3 for Windows..."
npm rebuild better-sqlite3

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

# Copy data folder structure
mkdir -p dist-pkg/data
touch dist-pkg/data/.gitkeep

# Copy better-sqlite3 native bindings (Windows version)
echo "📦 Copying better-sqlite3 Windows binaries..."
mkdir -p dist-pkg/node_modules/better-sqlite3/build/Release
cp -r node_modules/better-sqlite3/build/Release/* \
   dist-pkg/node_modules/better-sqlite3/build/Release/
cp node_modules/better-sqlite3/package.json \
   dist-pkg/node_modules/better-sqlite3/

echo "   ✅ Windows binaries copied"

# Create README
cat > dist-pkg/README.txt << 'EOF'
[... same README content ...]
EOF

# Create ZIP
echo "🗜️  Creating ZIP package..."
cd dist-pkg
powershell Compress-Archive -Path * -DestinationPath ../MekaGame-PKG-Windows.zip -Force 2>/dev/null || \
  7z a ../MekaGame-PKG-Windows.zip * -r 2>/dev/null || \
  zip -r ../MekaGame-PKG-Windows.zip * -q

cd ..

SIZE=$(du -h MekaGame-PKG-Windows.zip 2>/dev/null | cut -f1 || echo "N/A")

echo ""
echo "================================================"
echo " ✅ BUILD SELESAI!"
echo "================================================"
echo ""
echo " 📦 File: MekaGame-PKG-Windows.zip"
echo " 📏 Size: $SIZE"
echo ""
echo "✨ Ready untuk distribusi!"
