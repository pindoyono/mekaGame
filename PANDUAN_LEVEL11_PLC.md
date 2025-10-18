# 🎓 PANDUAN MENYELESAIKAN LEVEL 11: PLC & SCADA

## 📋 Overview Level 11

**Level 11** adalah **Ladder Logic Programming** menggunakan PLC (Programmable Logic Controller).

Anda harus menyelesaikan **5 Challenges** dengan membuat program ladder logic menggunakan komponen:

- **NO** (Normally Open Contact) - Switch/sensor yang ON = Closed
- **NC** (Normally Closed Contact) - Switch yang ON = Open
- **COIL** - Output (lampu, motor, dll)
- **TON** - Timer ON Delay
- **CTU** - Counter Up

---

## 🎯 CHALLENGE 1: Lampu Sederhana

### **Task:**

Buat program agar lampu **Q0.0** menyala ketika switch **I0.0** ON

### **Komponen yang Dibutuhkan:**

- 1x NO Contact (I0.0)
- 1x COIL (Q0.0)

### **📐 DIAGRAM LADDER LOGIC:**

```
┌─────────────────────────────────────────────┐
│  Rung 0:                                    │
│                                             │
│  ──┤I0.0├───────────────────(Q0.0)──       │
│    [NO]                        [COIL]       │
│                                             │
│  Logika: Jika I0.0 ON → Q0.0 ON            │
└─────────────────────────────────────────────┘
```

### **📊 DIAGRAM VISUAL:**

```
     Switch I0.0          Lampu Q0.0
         │                    │
         ├─── Normally ───────┤
         │     Open           │
         │    Contact         │

    I0.0 OFF  →  Q0.0 OFF
    I0.0 ON   →  Q0.0 ON  ✅
```

### **🎮 Cara Membuat di Editor:**

```
Grid Layout (Rung 0):
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ Col0 │ Col1 │ Col2 │ Col3 │ Col4 │ Col5 │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │      │ COIL │      │      │ ← Rung 0
│ I0.0 │      │      │ Q0.0 │      │      │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

**Langkah-langkah:**

1. **Pilih Tool "NO"** di panel kiri
2. **Klik Grid** → Rung 0, Kolom 0
3. **Ketik:** `I0.0` → Enter
4. **Pilih Tool "COIL"**
5. **Klik Grid** → Rung 0, Kolom 3
6. **Ketik:** `Q0.0` → Enter

### **✅ Test & Validasi:**

1. Klik **"Run PLC"** (hijau)
2. **Toggle I0.0** → OFF → ON
3. Lihat **Q0.0 menyala** (hijau) ✅
4. Toggle I0.0 → ON → OFF
5. Lihat **Q0.0 mati** ✅
6. Klik **"Validate Challenge"**

**Expected Result:** ✅ Challenge 1 Complete!

---

## 🎯 CHALLENGE 2: Start/Stop Motor

### **Task:**

Motor start dengan **I0.0**, stop dengan **I0.1** menggunakan self-hold (latching)

### **Komponen yang Dibutuhkan:**

- 1x NO Contact (I0.0) - Start button
- 1x NC Contact (I0.1) - Stop button
- 1x NO Contact (Q0.0) - Self-hold/seal
- 1x COIL (Q0.0) - Motor output

### **📐 DIAGRAM LADDER LOGIC:**

```
┌──────────────────────────────────────────────────┐
│  Rung 0: Start Branch                            │
│                                                  │
│  ──┤I0.1├──┤I0.0├──────────────(Q0.0)──        │
│    [NC]    [NO]                  [COIL]         │
│                                                  │
│  Rung 1: Self-Hold Branch (Parallel)            │
│                                                  │
│  ──┤I0.1├──┤Q0.0├──────────────(Q0.0)──        │
│    [NC]    [NO]                  [COIL]         │
│                                                  │
└──────────────────────────────────────────────────┘

Alternative Diagram (Parallel Branches):

        ┌────┤I0.0├─────┐
        │    [START]     │
  ──┤I0.1├──┤          ├───────(Q0.0)──
    [STOP]  │              │    [MOTOR]
        └────┤Q0.0├─────┘
            [SEAL]
```

### **📊 DIAGRAM VISUAL - Cara Kerja:**

```
State 1: Motor OFF (Initial)
━━━━━━━━━━━━━━━━━━━━━
I0.1: OFF (not pressed)  →  NC = Closed  ✅
I0.0: OFF (not pressed)  →  NO = Open    ❌
Q0.0: OFF                →  NO = Open    ❌
Result: Q0.0 = OFF (Motor OFF)


State 2: START Button Pressed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.1: OFF                →  NC = Closed  ✅
I0.0: ON (pressed!)      →  NO = Closed  ✅
Q0.0: OFF                →  NO = Open    ❌
Result: Rung 0 TRUE → Q0.0 = ON (Motor START!) ⚡


State 3: START Button Released (Self-Hold Active)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.1: OFF                →  NC = Closed  ✅
I0.0: OFF (released)     →  NO = Open    ❌  Rung 0 FALSE
Q0.0: ON (from previous) →  NO = Closed  ✅  Rung 1 TRUE ⚡
Result: Q0.0 = ON (Motor STAYS ON via self-hold!)


State 4: STOP Button Pressed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.1: ON (pressed!)      →  NC = Open    ❌  Both rungs FALSE!
I0.0: OFF                →  NO = Open    ❌
Q0.0: ON                 →  NO = Closed  ✅ (but blocked by NC)
Result: Q0.0 = OFF (Motor STOP!) 🛑
```

### **🎮 Cara Membuat di Editor:**

```
Grid Layout:
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ Col0 │ Col1 │ Col2 │ Col3 │ Col4 │ Col5 │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NC   │ NO   │      │ COIL │      │      │ ← Rung 0
│ I0.1 │ I0.0 │      │ Q0.0 │      │      │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NC   │ NO   │      │ COIL │      │      │ ← Rung 1
│ I0.1 │ Q0.0 │      │ Q0.0 │      │      │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

**Langkah-langkah:**

**Rung 0 (Start Branch):**

1. Pilih **"NC"** → Klik Rung 0, Col 0 → `I0.1`
2. Pilih **"NO"** → Klik Rung 0, Col 1 → `I0.0`
3. Pilih **"COIL"** → Klik Rung 0, Col 3 → `Q0.0`

**Rung 1 (Self-Hold Branch):** 4. Pilih **"NC"** → Klik Rung 1, Col 0 → `I0.1` 5. Pilih **"NO"** → Klik Rung 1, Col 1 → `Q0.0` ⚠️ (self-hold!) 6. Pilih **"COIL"** → Klik Rung 1, Col 3 → `Q0.0`

### **✅ Test & Validasi:**

1. **Run PLC**
2. Toggle I0.0: OFF→ON→OFF
   - ✅ Motor start dan **tetap jalan** (self-hold aktif!)
3. Toggle I0.1: OFF→ON
   - ✅ Motor stop
4. Toggle I0.1: ON→OFF (release stop)
5. Toggle I0.0: OFF→ON→OFF
   - ✅ Motor start lagi
6. **Validate Challenge**

**Expected:** Motor start/stop dengan latching! ✅

---

## 🎯 CHALLENGE 3: Timer ON Delay

### **Task:**

Lampu **Q0.0** menyala **3 detik** setelah **I0.0** ON

### **Komponen yang Dibutuhkan:**

- 1x NO Contact (I0.0) - Trigger
- 1x TON Timer (T1, Preset=3)
- 1x NO Contact (T1) - Timer done bit
- 1x COIL (Q0.0)

### **📐 DIAGRAM LADDER LOGIC:**

```
┌──────────────────────────────────────────────────┐
│  Rung 0: Timer Enable                            │
│                                                  │
│  ──┤I0.0├────[TON]────                          │
│    [NO]       T1                                 │
│               PT: 3s                             │
│               ET: 0.0s                           │
│                                                  │
│  Rung 1: Timer Output → Lamp                    │
│                                                  │
│  ──┤T1├──────────────(Q0.0)──                   │
│    [NO]              [COIL]                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

### **📊 DIAGRAM TIMING:**

```
I0.0:  ──┐               ┌──────────
         │               │
         └───────────────┘

Timer: 0s ─→ 1s ─→ 2s ─→ 3s (DONE!)
       ET:  0.0   1.0   2.0   3.0

T1:    ──────────────────┐──────────
                         │ (Done bit)
                         └──────────

Q0.0:  ──────────────────┐──────────
                    delay│ ON!
                   3 sec └──────────

Timeline:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
t=0s:  I0.0 ON  → Timer mulai count
t=1s:  Timer counting... (ET=1.0)
t=2s:  Timer counting... (ET=2.0)
t=3s:  Timer DONE! → T1 bit ON → Q0.0 ON ⚡
```

### **📊 DIAGRAM VISUAL - Cara Kerja:**

```
Step 1: I0.0 OFF (Initial State)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.0: OFF  →  Timer T1: Disabled, ET=0
T1 done:   →  OFF
Q0.0:      →  OFF


Step 2: I0.0 ON (Timer Start)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.0: ON   →  Timer T1: Enabled, ET counting...
              ET: 0.0s → 0.1s → 0.2s → ... → 2.9s
T1 done:   →  OFF (still counting)
Q0.0:      →  OFF (waiting for timer)


Step 3: Timer DONE (After 3 seconds)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.0: ON   →  Timer T1: ET = 3.0s (DONE!) ✅
T1 done:   →  ON (done bit activated)
Q0.0:      →  ON (lamp turns on!) 💡


Step 4: I0.0 OFF (Timer Reset)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.0: OFF  →  Timer T1: Reset, ET=0
T1 done:   →  OFF
Q0.0:      →  OFF (lamp turns off)
```

### **🎮 Cara Membuat di Editor:**

```
Grid Layout:
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ Col0 │ Col1 │ Col2 │ Col3 │ Col4 │ Col5 │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │ TON  │      │      │      │ ← Rung 0
│ I0.0 │      │ T1   │      │      │      │
│      │      │ PT:3 │      │      │      │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │      │ COIL │      │      │ ← Rung 1
│ T1   │      │      │ Q0.0 │      │      │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

**Langkah-langkah:**

**Rung 0 (Timer Block):**

1. Pilih **"NO"** → Klik Rung 0, Col 0 → `I0.0`
2. Pilih **"TON"** → Klik Rung 0, Col 2
3. **Dialog muncul:**
   - Address: `T1`
   - Preset: `3` (detik)
   - Klik OK

**Rung 1 (Output Block):** 4. Pilih **"NO"** → Klik Rung 1, Col 0 → `T1` ⚠️ (timer done bit!) 5. Pilih **"COIL"** → Klik Rung 1, Col 3 → `Q0.0`

### **✅ Test & Validasi:**

1. **Run PLC**
2. Toggle I0.0: OFF → ON
3. **Tunggu 3 detik** (lihat timer counting di display)
4. ✅ Q0.0 menyala setelah 3 detik
5. Toggle I0.0: ON → OFF
6. ✅ Timer reset, Q0.0 mati
7. **Validate Challenge**

**Expected:** Delay 3 detik bekerja! ✅

---

## 🎯 CHALLENGE 4: Counter Produk

### **Task:**

Hitung **5 produk** dengan sensor **I0.0**, nyalakan **Q0.0** saat count = 5

### **Komponen yang Dibutuhkan:**

- 1x NO Contact (I0.0) - Sensor trigger
- 1x CTU Counter (C1, Preset=5)
- 1x NO Contact (C1) - Counter done bit
- 1x COIL (Q0.0)

### **📐 DIAGRAM LADDER LOGIC:**

```
┌──────────────────────────────────────────────────┐
│  Rung 0: Counter Input                           │
│                                                  │
│  ──┤I0.0├────[CTU]────                          │
│    [NO]        C1                                │
│                PV: 5                             │
│                CV: 0                             │
│                                                  │
│  Rung 1: Counter Done → Lamp                    │
│                                                  │
│  ──┤C1├──────────────(Q0.0)──                   │
│    [NO]              [COIL]                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

### **📊 DIAGRAM COUNTING:**

```
Sensor Trigger (Rising Edge Detection):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I0.0:  ─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─────
        │ │ │ │ │ │ │ │ │ │
        └─┘ └─┘ └─┘ └─┘ └─┘
        ↑   ↑   ↑   ↑   ↑
      Count Count Count Count Count
        1   2   3   4   5 ← DONE!

Counter Value:
CV: 0 → 1 → 2 → 3 → 4 → 5 (DONE!)

C1 Done Bit:
    ────────────────────┐────────
                        │ ON!
                        └────────

Q0.0:
    ────────────────────┐────────
                  Count=5│ 💡
                        └────────
```

### **📊 DIAGRAM VISUAL - Cara Kerja:**

```
Count 0: Initial State
━━━━━━━━━━━━━━━━━━━━━
I0.0: OFF  →  Counter C1: CV=0/PV=5
C1 done:   →  OFF
Q0.0:      →  OFF


Count 1: First Product Detected
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.0: OFF→ON→OFF  →  Rising Edge! Count+1
Counter C1:        →  CV=1/PV=5
C1 done:           →  OFF (need 5)
Q0.0:              →  OFF


Count 2-4: More Products
━━━━━━━━━━━━━━━━━━━━━━━
Toggle I0.0 3 more times...
CV: 1 → 2 → 3 → 4
C1 done: Still OFF
Q0.0: Still OFF


Count 5: Fifth Product (DONE!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I0.0: OFF→ON→OFF  →  Rising Edge! Count+1
Counter C1:        →  CV=5/PV=5 ✅ DONE!
C1 done:           →  ON (done bit activated)
Q0.0:              →  ON (batch complete!) 🎉


Count 6+: Overflow (Counter Stops)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Counter stays at CV=5
C1 done: ON
Q0.0: ON
```

### **🔧 RISING EDGE Explanation:**

```
Counter counts pada RISING EDGE (OFF→ON):

✅ Correct:
   OFF → ON → OFF  (1 count)
   │    ↑    │
   └────┴────┘ Rising Edge!

❌ Wrong:
   ON (hold)       (0 count - no edge!)
   OFF (hold)      (0 count - no edge!)
```

### **🎮 Cara Membuat di Editor:**

```
Grid Layout:
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ Col0 │ Col1 │ Col2 │ Col3 │ Col4 │ Col5 │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │ CTU  │      │      │      │ ← Rung 0
│ I0.0 │      │ C1   │      │      │      │
│      │      │ PV:5 │      │      │      │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │      │ COIL │      │      │ ← Rung 1
│ C1   │      │      │ Q0.0 │      │      │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

**Langkah-langkah:**

**Rung 0 (Counter Block):**

1. Pilih **"NO"** → Klik Rung 0, Col 0 → `I0.0`
2. Pilih **"CTU"** → Klik Rung 0, Col 2
3. **Dialog muncul:**
   - Address: `C1`
   - Preset: `5`
   - Klik OK

**Rung 1 (Output Block):** 4. Pilih **"NO"** → Klik Rung 1, Col 0 → `C1` ⚠️ (counter done bit!) 5. Pilih **"COIL"** → Klik Rung 1, Col 3 → `Q0.0`

### **✅ Test & Validasi:**

1. **Run PLC**
2. **Toggle I0.0** 5 kali:
   ```
   1st: OFF → ON → OFF  (CV=1)
   2nd: OFF → ON → OFF  (CV=2)
   3rd: OFF → ON → OFF  (CV=3)
   4th: OFF → ON → OFF  (CV=4)
   5th: OFF → ON → OFF  (CV=5) ✅ Q0.0 ON!
   ```
3. ✅ Q0.0 menyala setelah count ke-5
4. **Validate Challenge**

**Tips:**

- Setiap **rising edge** (OFF→ON) menambah counter
- JANGAN hold ON terus-menerus, harus toggle OFF→ON→OFF
- Watch counter display: CV=0→1→2→3→4→5

---

## 🎯 CHALLENGE 5: Traffic Light (ADVANCED!)

### **Task:**

Lampu lalu lintas 3 fase dengan timing:

- **Red (Q0.0)** - 5 detik
- **Yellow (Q0.1)** - 2 detik
- **Green (Q0.2)** - 5 detik
- Loop terus menerus

### **Komponen yang Dibutuhkan:**

- 1x NO Contact (I0.0) - Start trigger
- 3x TON Timers (T1, T2, T3)
- 3x COIL (Q0.0, Q0.1, Q0.2)
- NC/NO contacts untuk sequential & interlock

### **📐 DIAGRAM LADDER LOGIC (Sequential):**

```
┌──────────────────────────────────────────────────────────┐
│  Rung 0: RED Light (Phase 1)                             │
│                                                          │
│  ──┤I0.0├──┤/T3├──[TON]──┤T1├──(Q0.0)──               │
│    [START] [NOT T3] T1     [NO]  [RED]                  │
│                    PT:5s                                 │
│                                                          │
│  Rung 1: YELLOW Light (Phase 2)                         │
│                                                          │
│  ──┤T1├──┤/T2├──[TON]──┤T2├──(Q0.1)──                 │
│    [NO]  [NOT T2] T2     [NO]  [YELLOW]                 │
│                  PT:2s                                   │
│                                                          │
│  Rung 2: GREEN Light (Phase 3)                          │
│                                                          │
│  ──┤T2├──┤/T3├──[TON]──┤T3├──(Q0.2)──                 │
│    [NO]  [NOT T3] T3     [NO]  [GREEN]                  │
│                  PT:5s                                   │
│                                                          │
└──────────────────────────────────────────────────────────┘

Simplified Diagram:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase 1: RED
  ─┤I0.0├──[T1:5s]──(Q0.0)─   Start → T1 count → Red ON

Phase 2: YELLOW
  ─┤T1├────[T2:2s]──(Q0.1)─   T1 done → T2 count → Yellow ON

Phase 3: GREEN
  ─┤T2├────[T3:5s]──(Q0.2)─   T2 done → T3 count → Green ON

Loop Back:
  ─┤T3├──(trigger I0.0 again)  T3 done → Restart cycle
```

### **📊 TIMING DIAGRAM:**

```
Timeline (12 seconds per cycle):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Time:  0s        5s       7s           12s       17s    19s
       │─────────│────────│────────────│─────────│──────│
       │  RED    │ YELLOW │   GREEN    │  RED    │YELLOW│...
       └─────────┴────────┴────────────┴─────────┴──────┘

I0.0:  ┐────────────────────────────────────────────────
       │ (START pressed once)
       └

T1:    ┌─ 5s ──┐
       │  RED   │
Q0.0:  █████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

T2:              ┌ 2s ┐
                 │YELLW│
Q0.1:  ░░░░░░░░░░███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

T3:                     ┌──── 5s ────┐
                        │   GREEN    │
Q0.2:  ░░░░░░░░░░░░░░░░░████████████████░░░░░░░░░░░░░░░░

LOOP:                               ↑ T3 done → restart!
```

### **📊 DIAGRAM STATE MACHINE:**

```
     START
       │
       ↓
   ┌───────┐
   │  RED  │  Q0.0 ON (5s)
   │ T1:5s │
   └───┬───┘
       │ T1 done
       ↓
   ┌───────┐
   │YELLOW │  Q0.1 ON (2s)
   │ T2:2s │
   └───┬───┘
       │ T2 done
       ↓
   ┌───────┐
   │ GREEN │  Q0.2 ON (5s)
   │ T3:5s │
   └───┬───┘
       │ T3 done
       └────────┐
                │ LOOP BACK
                └─→ RED (repeat)
```

### **🎮 Cara Membuat di Editor (ADVANCED):**

**⚠️ Challenge ini KOMPLEKS! Ada beberapa strategi:**

### **Strategi 1: Sequential Timers (Recommended untuk Pemula)**

```
Grid Layout:
┌──────┬──────┬──────┬──────┬──────┬──────┐
│ Col0 │ Col1 │ Col2 │ Col3 │ Col4 │ Col5 │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │ TON  │      │ COIL │      │ ← Rung 0
│ I0.0 │      │ T1:5 │      │ Q0.0 │      │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │ TON  │      │ COIL │      │ ← Rung 1
│ T1   │      │ T2:2 │      │ Q0.1 │      │
├──────┼──────┼──────┼──────┼──────┼──────┤
│ NO   │      │ TON  │      │ COIL │      │ ← Rung 2
│ T2   │      │ T3:5 │      │ Q0.2 │      │
└──────┴──────┴──────┴──────┴──────┴──────┘
```

**Langkah-langkah:**

**Rung 0 - RED:**

1. NO (I0.0) → Col 0
2. TON (T1, PT=5) → Col 2
3. COIL (Q0.0) → Col 4

**Rung 1 - YELLOW:** 4. NO (T1) → Col 0 5. TON (T2, PT=2) → Col 2 6. COIL (Q0.1) → Col 4

**Rung 2 - GREEN:** 7. NO (T2) → Col 0 8. TON (T3, PT=5) → Col 2 9. COIL (Q0.2) → Col 4

### **Strategi 2: Self-Looping (Advanced)**

Tambahkan Rung 3 untuk auto-restart:

```
Rung 3: ──┤T3├──────(I0.0)──
          [NO]      [COIL]

Atau gunakan internal relay untuk loop
```

### **✅ Test & Validasi:**

1. **Run PLC**
2. **Toggle I0.0**: OFF → ON → OFF (start cycle)
3. **Observe timing:**
   ```
   0-5s:  ✅ Q0.0 (RED) ON
   5-7s:  ✅ Q0.1 (YELLOW) ON
   7-12s: ✅ Q0.2 (GREEN) ON
   12s+:  Cycle stops (manual restart) atau loop otomatis
   ```
4. **Validate Challenge**

### **💡 TIPS untuk Challenge 5:**

**Kriteria Minimal untuk Pass:**

- Minimal 2 timers berfungsi
- Minimal 3 coil (Q0.0, Q0.1, Q0.2) ada
- Sequential timing terlihat

**Tidak Harus Perfect Loop!**

- Cukup 1 cycle: RED → YELLOW → GREEN
- Loop otomatis adalah bonus

**Debugging:**

- Jika застряно di RED: Cek T1 preset = 5
- Jika langsung ke GREEN: Cek sequential NO contacts
- Jika semua nyala bersamaan: Perlu interlock (NC contacts)

### **🎓 Advanced: Interlock (Optional)**

Untuk memastikan HANYA 1 lampu menyala:

```
Rung 0: ──┤I0.0├──┤/Q0.1├──┤/Q0.2├──[T1]──(Q0.0)──
          [START] [NOT Y] [NOT G]

Rung 1: ──┤T1├────┤/Q0.0├──┤/Q0.2├──[T2]──(Q0.1)──

Rung 2: ──┤T2├────┤/Q0.0├──┤/Q0.1├──[T3]──(Q0.2)──
```

NC contacts mencegah multiple lampu ON!

**Strategi Sederhana:**

1. **Rung 0:** I0.0 trigger T1 (5s) → Q0.0 (Red)
2. **Rung 1:** T1 done trigger T2 (2s) → Q0.1 (Yellow)
3. **Rung 2:** T2 done trigger T3 (5s) → Q0.2 (Green)
4. **Rung 3:** T3 done reset I0.0/trigger ulang

**Tips:**

- Gunakan NC contacts untuk memastikan hanya 1 lampu menyala
- Tambahkan self-hold untuk maintain state
- Timer berjalan sequential (satu-satu)

### **Test:**

1. Run PLC
2. Toggle I0.0 ON
3. Red menyala 5 detik
4. Yellow menyala 2 detik
5. Green menyala 5 detik
6. Loop kembali ke Red
7. Validate Challenge

---

## 🎮 CARA MENGGUNAKAN EDITOR

### **Tools Panel:**

- **NO** - Normally Open Contact (─┤├─)
- **NC** - Normally Closed Contact (─┤/├─)
- **COIL** - Output (─( )─)
- **TON** - Timer ON Delay (─[TON]─)
- **CTU** - Counter Up (─[CTU]─)
- **EMPTY** - Hapus komponen

### **Cara Menempatkan Komponen:**

1. Klik tool yang ingin digunakan
2. Klik pada grid ladder (Rung 0-5, Kolom 0-5)
3. Ketik address (contoh: I0.0, Q0.0, T1, C1)
4. Untuk Timer/Counter, ketik juga preset value

### **Tombol Kontrol:**

- **Run PLC** (hijau) - Mulai simulasi
- **Stop PLC** (merah) - Stop simulasi
- **Clear Ladder** - Hapus semua komponen
- **Validate Challenge** - Cek apakah program benar

### **Input Simulator:**

Toggle switch untuk menguji program:

- I0.0, I0.1, I0.2, I0.3

### **Output States:**

Lihat status output real-time:

- Q0.0, Q0.1, Q0.2

---

## 📊 SYSTEM PENILAIAN

### **Passing Grade:**

- Minimal **3 dari 5 challenges** (60%)
- Perfect score: 5 dari 5 (100%)

### **Level Unlock:**

Menyelesaikan Level 11 akan membuka **Level 12 (Final Quiz)**

---

## 💡 TIPS & TRICKS

### **1. Selalu Test Sebelum Validate**

- Klik "Run PLC" dulu
- Toggle input I0.0, I0.1 secara manual
- Lihat apakah output Q0.0 bekerja sesuai logika
- Baru klik "Validate Challenge"

### **2. Pahami Ladder Logic Flow**

```
[Input] → [Logic] → [Output]
```

Rung dibaca dari KIRI ke KANAN seperti rangkaian listrik

### **3. NO vs NC:**

- **NO (Normally Open):** Closed saat input TRUE (ON)
- **NC (Normally Closed):** Open saat input TRUE (ON)

### **4. Self-Hold Pattern:**

```
─┤Start├─┬──────(Output)─
         │
─┤Stop├──┴┤Output├─
   NC
```

Ini pola umum untuk Start/Stop motor

### **5. Timer Pattern:**

```
─┤Input├───[TON]─     (Enable timer)
─┤Timer├───(Output)─  (Use done bit)
```

### **6. Counter Pattern:**

```
─┤Sensor├───[CTU]─    (Count rising edge)
─┤Counter├──(Output)─ (Use done bit)
```

---

## 🚨 TROUBLESHOOTING

### **❌ "Output tidak nyala"**

- Cek apakah sudah klik "Run PLC"
- Cek apakah input I0.0 di-toggle ON
- Cek apakah NO/NC contact address benar (I0.0 bukan 10.0)

### **❌ "Timer tidak jalan"**

- Pastikan preset value sudah diisi (contoh: 3)
- Pastikan input trigger timer dalam kondisi ON
- Timer hanya jalan saat rung TRUE

### **❌ "Validation failed"**

- Cek apakah address komponen sesuai task
- Challenge 1 butuh I0.0 (NO) dan Q0.0 (COIL)
- Pastikan semua komponen terhubung dalam 1 rung

### **❌ "Counter tidak count"**

- Counter count pada rising edge (OFF→ON)
- Toggle I0.0: OFF → ON → OFF (1 count)
- Bukan hold ON terus-menerus

---

## 🎓 STRATEGI MENYELESAIKAN

### **Recommended Order:**

1. ✅ Challenge 1 (Paling mudah - 1 NO + 1 COIL)
2. ✅ Challenge 3 (Belajar Timer)
3. ✅ Challenge 4 (Belajar Counter)
4. ✅ Challenge 2 (Self-hold butuh pemahaman)
5. ✅ Challenge 5 (Paling kompleks - Sequential timing)

### **Minimal untuk Pass:**

Selesaikan **Challenge 1, 3, dan 4** = 60% → **Level 12 Unlocked!** 🎉

---

## 📝 QUICK REFERENCE

### **Address Format:**

- **Input:** I0.0, I0.1, I0.2, I0.3
- **Output:** Q0.0, Q0.1, Q0.2
- **Timer:** T1, T2, T3
- **Counter:** C1, C2, C3

### **Component Symbols:**

- NO: `─┤├─`
- NC: `─┤/├─`
- COIL: `─( )─`
- TON: `─[TON]─`
- CTU: `─[CTU]─`

### **Keyboard Shortcuts:**

- Delete key: Hapus komponen yang dipilih
- Esc: Deselect tool

---

## 📐 DIAGRAM CHEAT SHEET - SEMUA CHALLENGE

### **Challenge 1: Simple ON/OFF**

```
┌─────────────────────────┐
│ ──┤I0.0├────(Q0.0)──   │  ← Paling mudah!
│   [Switch]  [Lamp]      │
└─────────────────────────┘
```

### **Challenge 2: Start/Stop Latching**

```
┌──────────────────────────────┐
│ ──┤I0.1├──┤I0.0├──(Q0.0)──  │  Start branch
│   [STOP]  [START] [Motor]    │
│                              │
│ ──┤I0.1├──┤Q0.0├──(Q0.0)──  │  Hold branch
│   [STOP]  [Seal]  [Motor]    │
└──────────────────────────────┘
```

### **Challenge 3: Timer Delay**

```
┌──────────────────────────────┐
│ ──┤I0.0├──[TON:3s]──         │  Timer enable
│   [Trig]    T1               │
│                              │
│ ──┤T1├────────(Q0.0)──       │  Output after 3s
│   [Done]      [Lamp]          │
└──────────────────────────────┘
```

### **Challenge 4: Counter**

```
┌──────────────────────────────┐
│ ──┤I0.0├──[CTU:5]──          │  Count rising edge
│   [Sensor]   C1               │
│                              │
│ ──┤C1├────────(Q0.0)──       │  Output at count=5
│   [Done]      [Lamp]          │
└──────────────────────────────┘
```

### **Challenge 5: Traffic Light Sequential**

```
┌─────────────────────────────────────┐
│ ──┤I0.0├──[TON:5s]──(Q0.0)──       │  RED
│   [Start]    T1      [Red]          │
│                                     │
│ ──┤T1├────[TON:2s]──(Q0.1)──       │  YELLOW
│   [Done]     T2      [Yellow]       │
│                                     │
│ ──┤T2├────[TON:5s]──(Q0.2)──       │  GREEN
│   [Done]     T3      [Green]        │
└─────────────────────────────────────┘

Timeline: RED(5s) → YELLOW(2s) → GREEN(5s) → Loop
```

---

## 🎯 VISUAL SUMMARY - ALL CHALLENGES

```
╔═══════════════════════════════════════════════════════════════╗
║                    LEVEL 11 PLC CHALLENGES                    ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Challenge 1: LAMPU SEDERHANA                                ║
║  ┌─────────────────────────────────────┐                     ║
║  │  Switch ──┤I0.0├──(Q0.0)── Lamp    │                     ║
║  └─────────────────────────────────────┘                     ║
║  Difficulty: ★☆☆☆☆                                          ║
║  Time: 1 min                                                  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Challenge 2: START/STOP MOTOR                               ║
║  ┌─────────────────────────────────────┐                     ║
║  │    START ┐                          │                     ║
║  │  STOP ──┤├─┴─── Motor ──┐          │                     ║
║  │          └─ SEAL ────────┘          │                     ║
║  └─────────────────────────────────────┘                     ║
║  Difficulty: ★★★☆☆                                          ║
║  Time: 3 min                                                  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Challenge 3: TIMER DELAY                                    ║
║  ┌─────────────────────────────────────┐                     ║
║  │  Trigger ──[T1:3s]─┬─ Lamp          │                     ║
║  │                    │                 │                     ║
║  │  3 second delay ───┘                │                     ║
║  └─────────────────────────────────────┘                     ║
║  Difficulty: ★★☆☆☆                                          ║
║  Time: 2 min                                                  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Challenge 4: COUNTER                                        ║
║  ┌─────────────────────────────────────┐                     ║
║  │  Sensor ──[C1:5]─┬─ Done            │                     ║
║  │   ↑↑↑↑↑          │                 │                     ║
║  │   12345 ─────────┘                 │                     ║
║  └─────────────────────────────────────┘                     ║
║  Difficulty: ★★☆☆☆                                          ║
║  Time: 2 min                                                  ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  Challenge 5: TRAFFIC LIGHT                                  ║
║  ┌─────────────────────────────────────┐                     ║
║  │  🔴 RED    ──[5s]──┐               │                     ║
║  │  🟡 YELLOW ──[2s]──┤               │                     ║
║  │  🟢 GREEN  ──[5s]──┘               │                     ║
║  │         └─ Loop ─┘                 │                     ║
║  └─────────────────────────────────────┘                     ║
║  Difficulty: ★★★★★                                          ║
║  Time: 5-10 min                                               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## ✅ CHECKLIST SEBELUM VALIDATE

Sebelum klik "Validate Challenge", pastikan:

- [ ] Semua komponen sudah terpasang
- [ ] Address sudah benar (I0.0, Q0.0, dll)
- [ ] Sudah test dengan "Run PLC"
- [ ] Output bekerja sesuai task
- [ ] Timer/Counter preset value sudah diisi

---

## 🎉 SELAMAT!

Setelah menyelesaikan **3+ challenges**, Anda akan:

- ✅ Progress tersimpan otomatis
- ✅ Level 12 (Final Quiz) terbuka
- ✅ Badge "PLC Programmer" unlocked

**Good luck!** 🚀

---

**Butuh bantuan spesifik?**
Tanyakan challenge mana yang sulit, saya bisa kasih diagram lebih detail! 😊
