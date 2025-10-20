@echo off
REM MekaGame Portable Launcher
REM Double-click file ini untuk menjalankan MekaGame

title MekaGame Portable
color 0A

echo.
echo ================================================
echo  MekaGame - Game Edukasi Mekatronika
echo ================================================
echo.
echo  Memulai server...
echo.

REM Get the directory where this batch file is located
cd /d "%~dp0"

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python tidak ditemukan!
    echo.
    echo Silakan install Python dari: https://www.python.org/downloads/
    echo Atau gunakan portable-python yang sudah disediakan.
    echo.
    pause
    exit /b 1
)

REM Check if out folder exists
if not exist "out\" (
    echo ERROR: Folder 'out' tidak ditemukan!
    echo Pastikan struktur folder lengkap.
    echo.
    pause
    exit /b 1
)

REM Run the Python server
python run.py

pause
