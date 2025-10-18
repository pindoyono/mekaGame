# Struktur Level MekaGame

## 📊 Ringkasan Struktur (Setelah Penambahan Gerbang Logika)

### Level Structure (Home Page Display)

| Level ID | Nama Level                 | File Path              | updateProgress ID | Status  |
| -------- | -------------------------- | ---------------------- | ----------------- | ------- |
| **1**    | Komponen Elektronika Dasar | `/levels/level1`       | `1`               | ✅      |
| **2**    | Kode Warna Resistor        | `/levels/level2`       | `2`               | ✅      |
| **3**    | Simbol Gambar Teknik       | `/levels/level3`       | `3`               | ✅      |
| **4**    | Gerbang Logika Digital     | `/modules/logic-gates` | `4`               | ✅ BARU |
| **5**    | Sensor & Transduser        | `/modules/sensor`      | `5`               | ✅      |
| **6**    | Transistor & IC            | `/levels/level5`       | `6`               | ✅      |
| **7**    | Aktuator & Motor           | `/modules/actuator`    | `7`               | ✅      |
| **8**    | Rangkaian Elektronika      | `/modules/circuit`     | `8`               | ✅      |
| **9**    | Mikrokontroler Arduino     | `/modules/arduino`     | `9`               | ✅      |
| **10**   | Sistem Kontrol PID         | `/levels/level9`       | `10`              | ✅      |
| **11**   | PLC & SCADA                | `/levels/level10`      | `11`              | ✅      |
| **12**   | Final Assessment           | `/levels/level11`      | `12`              | ✅      |

---

## 🔍 Detail Setiap Level

### Level 1: Komponen Elektronika Dasar

- **Path**: `/app/levels/level1/page.tsx`
- **updateProgress**: `updateProgress(1, finalScore, passed)`
- **Type**: Quiz (12 soal)
- **Materi**: Resistor, Kapasitor, Dioda, LED
- **Passing Grade**: 70%

### Level 2: Kode Warna Resistor

- **Path**: `/app/levels/level2/page.tsx`
- **updateProgress**: `updateProgress(2, scorePercent, passed)`
- **Type**: Interactive Calculator
- **Materi**: Membaca kode warna resistor 4 dan 5 gelang
- **Passing Grade**: 70%

### Level 3: Simbol Gambar Teknik

- **Path**: `/app/levels/level3/page.tsx`
- **updateProgress**: `updateProgress(3, finalScore, passed)`
- **Type**: Matching Game
- **Materi**: Mencocokkan simbol dengan nama komponen
- **Passing Grade**: 70%

### Level 4: Gerbang Logika Digital ⚡ BARU

- **Path**: `/app/modules/logic-gates/page.tsx`
- **updateProgress**: `updateProgress(4, score, true)`
- **getLevelProgress**: `getLevelProgress(4)`
- **Type**: Interactive Simulator
- **Materi**:
  - 7 Logic Gates: AND, OR, NOT, NAND, NOR, XOR, XNOR
  - IEEE Standard Symbols
  - Canvas-based drawing
  - 5 Challenges: Basic AND → OR+NOT → XOR → Half Adder → Full Adder
  - Truth Table Validation
- **Passing Grade**: 70%

### Level 5: Sensor & Transduser

- **Path**: `/app/modules/sensor/page.tsx`
- **updateProgress**: `updateProgress(5, finalScore, passed)` // Level 5 = Sensor Module
- **Type**: Educational Module + Quiz
- **Materi**: LDR, Ultrasonik, PIR, Sensor Suhu, Sensor Kelembaban
- **Passing Grade**: 70%

### Level 6: Transistor & IC

- **Path**: `/app/levels/level5/page.tsx` ⚠️ (nama file belum diubah)
- **updateProgress**: `updateProgress(6, score, passed)` // Level 6 = Transistor & IC
- **Type**: Quiz (16 soal)
- **Materi**: NPN, PNP, IC 555 Timer, Konfigurasi transistor
- **Passing Grade**: 70%
- **Note**: File masih bernama `level5` untuk backward compatibility

### Level 7: Aktuator & Motor

- **Path**: `/app/modules/actuator/page.tsx`
- **updateProgress**: `updateProgress(7, 100, true)` // Level 7 = Actuator Module
- **getLevelProgress**: `getLevelProgress(7)` // Level 7 = Actuator
- **Type**: Educational Module (auto-complete)
- **Materi**: Motor DC, Servo Motor, Relay, Solenoid
- **Passing Grade**: 70%

### Level 8: Rangkaian Elektronika

- **Path**: `/app/modules/circuit/page.tsx`
- **updateProgress**: `updateProgress(8, score, passed)` // Level 8 = Circuit Module
- **getLevelProgress**: `getLevelProgress(8)` // Level 8 = Circuit
- **Type**: Circuit Builder + Challenges
- **Materi**: Simulasi rangkaian sederhana, LED, resistor
- **Passing Grade**: 75%

### Level 9: Mikrokontroler Arduino

- **Path**: `/app/modules/arduino/page.tsx`
- **updateProgress**: `updateProgress(9, score, true)`
- **getLevelProgress**: `getLevelProgress(9)`
- **Type**: Code Learning Module
- **Materi**: 4 Lessons - Blink LED, Serial Monitor, Sensor, Motor Control
- **Passing Grade**: 75%

### Level 10: Sistem Kontrol PID

- **Path**: `/app/levels/level9/page.tsx` ⚠️ (nama file belum diubah)
- **updateProgress**: `updateProgress(10, score, passed)`
- **Type**: PID Controller Simulator
- **Materi**:
  - 5 Challenges: Basic → Fast Response → Steady State → With Disturbance → Precision
  - Real-time graph
  - PID parameter tuning (Kp, Ki, Kd)
  - Physics simulation
- **Passing Grade**: 80%
- **Note**: File masih bernama `level9` untuk backward compatibility
- **Header Display**: "Level 10: Sistem Kontrol PID" ✅

### Level 11: PLC & SCADA

- **Path**: `/app/levels/level10/page.tsx` ⚠️ (nama file belum diubah)
- **updateProgress**: `updateProgress(11, score, true)` // Level 11 = PLC & SCADA
- **getLevelProgress**: `getLevelProgress(11)` // Level 11 = PLC & SCADA
- **Type**: Ladder Logic Editor
- **Materi**:
  - 5 Challenges: Lamp → Start/Stop Motor → Timer → Counter → Traffic Light
  - PLC Components: NO, NC, COIL, TON, CTU
  - Scan cycle simulation (200ms)
  - I/O mapping
- **Passing Grade**: 80%
- **Note**: File masih bernama `level10` untuk backward compatibility

### Level 12: Final Assessment

- **Path**: `/app/levels/level11/page.tsx` ⚠️ (nama file belum diubah)
- **updateProgress**: `updateProgress(12, finalScore, passed)` // Level 12 = Final Assessment
- **getLevelProgress**: `getLevelProgress(12)` // Level 12 = Final Assessment
- **Type**: Comprehensive Quiz
- **Materi**: 12 soal covering Level 1-11 (termasuk PID dan PLC)
- **Passing Grade**: 70%
- **Note**: File masih bernama `level11` untuk backward compatibility

---

## ✅ Perbaikan yang Sudah Dilakukan

### 1. Home Page (`app/page.tsx`)

- ✅ Tambah Level 4 (Gerbang Logika) dengan icon Zap
- ✅ Update semua level ID dari 5-12
- ✅ Tambah comment untuk backward compatibility pada Level 6, 10, 11, 12
- ✅ Fungsi `isLevelUnlocked()` bekerja dengan ID yang benar

### 2. Logic Gates Module (`app/modules/logic-gates/page.tsx`)

- ✅ `updateProgress(4, score, true)`
- ✅ `getLevelProgress(4)` // Level 4 - Logic Gates
- ✅ Canvas simulator dengan IEEE symbols
- ✅ 5 challenges dengan truth table validation

### 3. Sensor Module (`app/modules/sensor/page.tsx`)

- ✅ `updateProgress(5, finalScore, passed)` // Level 5 = Sensor Module
- ⚠️ Tidak ada `getLevelProgress` (tidak diperlukan)

### 4. Transistor/Level5 (`app/levels/level5/page.tsx`)

- ✅ `updateProgress(6, score, passed)` // Level 6 = Transistor & IC
- ⚠️ Tidak ada `getLevelProgress` (tidak diperlukan)

### 5. Actuator Module (`app/modules/actuator/page.tsx`)

- ✅ `updateProgress(7, 100, true)` // Level 7 = Actuator Module
- ✅ `getLevelProgress(7)` // Level 7 = Actuator

### 6. Circuit Module (`app/modules/circuit/page.tsx`)

- ✅ `updateProgress(8, score, passed)` // Level 8 = Circuit Module
- ✅ `getLevelProgress(8)` // Level 8 = Circuit

### 7. Arduino Module (`app/modules/arduino/page.tsx`)

- ✅ `updateProgress(9, score, true)` (sudah benar)
- ✅ `getLevelProgress(9)` (sudah benar)

### 8. PID Controller/Level9 (`app/levels/level9/page.tsx`)

- ✅ `updateProgress(10, score, passed)` (sudah benar)
- ⚠️ Tidak ada `getLevelProgress` (tidak diperlukan)
- ✅ Header: "Level 10: Sistem Kontrol PID"

### 9. PLC/Level10 (`app/levels/level10/page.tsx`)

- ✅ `updateProgress(11, score, true)` // Level 11 = PLC & SCADA
- ✅ `getLevelProgress(11)` // Level 11 = PLC & SCADA

### 10. Final Quiz/Level11 (`app/levels/level11/page.tsx`)

- ✅ `updateProgress(12, finalScore, passed)` // Level 12 = Final Assessment
- ✅ `getLevelProgress(12)` // Level 12 = Final Assessment

---

## 🎯 Unlock Logic

Level berikutnya akan unlock jika level sebelumnya completed:

```typescript
const isLevelUnlocked = (levelId: number): boolean => {
  if (levelId === 1) return true; // Level 1 always unlocked
  if (!isAuthenticated || !user) return false;

  const prevLevelProgress = getLevelProgress(levelId - 1);
  return prevLevelProgress ? prevLevelProgress.completed : false;
};
```

**Contoh unlock chain:**

- Level 1 ✅ → Unlock Level 2
- Level 2 ✅ → Unlock Level 3
- Level 3 ✅ → Unlock Level 4 (Logic Gates) ⚡
- Level 4 ✅ → Unlock Level 5 (Sensor)
- Level 5 ✅ → Unlock Level 6 (Transistor)
- Level 6 ✅ → Unlock Level 7 (Actuator)
- Level 7 ✅ → Unlock Level 8 (Circuit)
- Level 8 ✅ → Unlock Level 9 (Arduino)
- Level 9 ✅ → Unlock Level 10 (PID)
- Level 10 ✅ → Unlock Level 11 (PLC)
- Level 11 ✅ → Unlock Level 12 (Final Quiz)

---

## ⚠️ File Naming Note

Beberapa file memiliki nama yang tidak sesuai dengan Level ID untuk **backward compatibility**:

- Level 6 (Transistor) → File: `level5/page.tsx`
- Level 10 (PID) → File: `level9/page.tsx`
- Level 11 (PLC) → File: `level10/page.tsx`
- Level 12 (Quiz) → File: `level11/page.tsx`

**Ini tidak masalah** karena:

1. ✅ Route href di home page sudah benar
2. ✅ updateProgress ID sudah benar
3. ✅ getLevelProgress ID sudah benar
4. ✅ Unlock logic menggunakan Level ID, bukan nama file
5. ✅ User progress tersimpan berdasarkan Level ID

---

## 📝 Summary

**Total Levels**: 12 (setelah penambahan Gerbang Logika)

**Level Progression**:

1. Components → 2. Color Code → 3. Symbols → **4. Logic Gates** → 5. Sensors → 6. Transistors → 7. Actuators → 8. Circuits → 9. Arduino → 10. PID → 11. PLC → 12. Final Quiz

**Status**: ✅ Semua level ID dan updateProgress sudah konsisten!

**Compilation Status**: ✅ No errors found

**Testing**: Ready untuk user testing pada http://localhost:3002
