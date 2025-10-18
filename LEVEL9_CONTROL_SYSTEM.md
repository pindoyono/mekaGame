# Level 9 & Level 11 Update - Sistem Kontrol & Quiz

## 🎯 Ringkasan Update

### Level 9: Sistem Kontrol (PID Controller Simulator) - BARU ✨

Level 9 sekarang adalah **simulator interaktif PID Controller** untuk belajar tuning sistem kontrol feedback.

#### Fitur Utama:

1. **PID Parameter Tuning**

   - Kp (Proportional): 0 - 5
   - Ki (Integral): 0 - 1
   - Kd (Derivative): 0 - 0.5
   - Real-time adjustment dengan slider

2. **Real-Time Visualization**

   - Canvas graph dengan 3 lines:
     - Process Value (biru solid)
     - Setpoint (kuning dashed)
     - Output (hijau transparan)
   - Grid background untuk readability
   - Auto-scale 100 data points terakhir

3. **Challenge System (5 Challenges)**

   - **Challenge 1**: Kontrol Dasar - 50°C, <15s
   - **Challenge 2**: Respon Cepat - 75°C, <10s
   - **Challenge 3**: Steady State - 60°C, <8s, error <2°C
   - **Challenge 4**: Dengan Gangguan - 70°C, <12s + disturbance
   - **Challenge 5**: Presisi Tinggi - 80°C, <10s, error <1°C

4. **Simulasi Fisika**

   - First-order system (tau = 2.0)
   - Disturbance: 5 _ sin(time _ 0.5) untuk challenge 4 & 5
   - Output clamping 0-100%
   - PID calculation dengan anti-windup

5. **Progress Tracking**
   - Sequential unlock (harus selesai challenge sebelumnya)
   - Auto-save progress setelah semua challenge selesai
   - Score: 100% jika semua challenge selesai

#### Tips Tuning:

- **Kp**: Kontrol kecepatan respon (naikkan untuk lebih cepat)
- **Ki**: Hilangkan steady-state error
- **Kd**: Kurangi overshoot dan oscillation

#### File:

- `/app/levels/level9/page.tsx` (DIUBAH TOTAL)

---

### Level 11: Final Assessment (Quiz) - BARU ✨

Quiz yang sebelumnya di Level 9 dipindah ke Level 11.

#### Perubahan:

- **12 soal** (dari 10) mencakup Level 1-10 + Fundamental
- Soal baru:
  - Q9: Sistem Kontrol PID
  - Q10: Ladder Logic PLC
  - Q12: Feedback System
- UpdateProgress: `updateProgress(11, score, passed)`
- Passing grade: 70%
- Title: "Level 11: Final Assessment"
- Description: "Ujian akhir semua materi Level 1-10"

#### File:

- `/app/levels/level11/page.tsx` (BARU)

---

### Home Page Update

#### `/app/page.tsx`

**Level 9** (Updated):

```typescript
{
  id: 9,
  title: "Sistem Kontrol",
  description: "PID Controller & Feedback System",
  difficulty: "Sangat Sulit",
  icon: Gauge,
  color: "from-blue-600 to-indigo-700",
  href: "/levels/level9",
  passingGrade: 80,
}
```

**Level 10** (Unchanged):

```typescript
{
  id: 10,
  title: "PLC & SCADA",
  description: "Ladder Logic & Industrial Control",
  difficulty: "Sangat Sulit",
  icon: Cpu,
  color: "from-yellow-600 to-orange-600",
  href: "#coming-soon", // MASIH PLACEHOLDER
  passingGrade: 80,
}
```

**Level 11** (New):

```typescript
{
  id: 11,
  title: "Final Assessment",
  description: "Ujian akhir semua materi Level 1-10",
  difficulty: "Sangat Sulit",
  icon: Trophy,
  color: "from-purple-700 to-pink-700",
  href: "/levels/level11",
  passingGrade: 70,
}
```

---

## 🔄 Flow Belajar Baru

```
Level 1-8: Materi Teknis
    ↓
Level 9: Sistem Kontrol (PID Simulator) ← SIMULATOR INTERAKTIF
    ↓
Level 10: PLC & SCADA (Coming Soon) ← PLACEHOLDER
    ↓
Level 11: Final Assessment (Quiz) ← UJIAN AKHIR
```

---

## 🎮 Cara Testing

### Test Level 9 (PID Simulator):

1. Refresh browser
2. Login (jika belum)
3. Selesaikan Level 1-8 untuk unlock Level 9
4. Klik Level 9
5. Coba adjust Kp, Ki, Kd
6. Klik "Start Simulation"
7. Lihat grafik real-time
8. Tunggu hingga error < 2°C dan stabil untuk complete challenge
9. Lanjut ke challenge berikutnya

### Test Level 11 (Quiz):

1. Selesaikan Level 10 (atau skip jika masih placeholder)
2. Klik Level 11
3. Jawab 12 soal quiz
4. Lihat hasil akhir

---

## 📊 Scoring

### Level 9:

- **Challenge-based**: 1/5 = 20%, 2/5 = 40%, ... 5/5 = 100%
- **Passing grade**: 80% (minimal 4/5 challenges)

### Level 11:

- **Per soal**: 10 points (total 120 points possible, score = (correct/12)\*100)
- **Passing grade**: 70% (minimal 9/12 benar)

---

## ✅ Status

- [x] Level 9 PID Simulator created
- [x] Level 11 Quiz created
- [x] Home page updated
- [x] Unlock logic updated (sequential)
- [ ] Testing in browser (perlu user test)
- [ ] Level 10 PLC implementation (future work)

---

## 🚀 Next Steps

**Untuk Level 10 (PLC & SCADA):**

1. Buat ladder logic editor
2. Tambahkan PLC simulator dengan scan cycle
3. Buat SCADA visualization
4. Challenge system untuk ladder programming

**Atau:**
Tunggu feedback user untuk Level 9 & 11 dulu sebelum implement Level 10.

---

Semua file sudah dikompilasi tanpa error! ✅
