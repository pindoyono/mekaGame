# Fix: PLC Editor - Address Input Problem

## 🐛 Masalah yang Dilaporkan:

User melaporkan: **"saat saya coba di editor input I0.0 semua dan Q.0 sepertinya itu bermasalah"**

Dari screenshot yang diberikan, terlihat bahwa:

- ❌ Semua komponen NO/NC menampilkan address **I0.0**
- ❌ Semua komponen COIL menampilkan address **Q0.0**
- ❌ Tidak ada cara untuk mengubah address komponen
- ❌ User tidak bisa membuat I0.1, I0.2, Q0.1, Q0.2, dll

## 🔍 Root Cause Analysis:

### **Problem 1: Hard-coded Default Address**

**File:** `app/levels/level10/page.tsx` line 319

```typescript
const getDefaultAddress = (type: ComponentType): string => {
  switch (type) {
    case "NO":
    case "NC":
      return "I0.0"; // ❌ ALWAYS returns I0.0!
    case "COIL":
      return "Q0.0"; // ❌ ALWAYS returns Q0.0!
    case "TON":
      return "T1";
    case "CTU":
      return "C1";
    default:
      return "";
  }
};
```

**Impact:**

- Semua NO/NC contact dibuat dengan address "I0.0"
- Semua COIL dibuat dengan address "Q0.0"
- User tidak bisa membuat ladder logic dengan multiple inputs/outputs

### **Problem 2: No Edit Functionality**

**Original Code:**

```typescript
const addComponent = (rung: number, col: number) => {
  if (selectedTool === "EMPTY") return;

  const newComponent: LadderComponent = {
    id: `comp_${Date.now()}`,
    type: selectedTool,
    address: getDefaultAddress(selectedTool), // ❌ Always same address
    position: { rung, col },
    preset: selectedTool === "TON" ? 3 : selectedTool === "CTU" ? 5 : undefined,
    accum: 0,
  };

  setLadder([...ladder, newComponent]); // ❌ No way to change address!
};
```

**Impact:**

- No `editComponent()` function
- No way to change address after component is placed
- User stuck with default addresses

### **Problem 3: Click to Remove Only**

**Original UI:**

```tsx
<div
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  onClick={() => removeComponent(component.id)} // ❌ Only removes
>
  {component.address} // Shows I0.0 for all
</div>
```

**Impact:**

- Clicking component removes it completely
- No edit functionality
- User has to delete and recreate to try changing address (which still uses default)

## ✅ Solusi yang Diimplementasikan:

### **Fix 1: Prompt for Address on Add**

```typescript
const addComponent = (rung: number, col: number) => {
  if (selectedTool === "EMPTY") return;

  // ✅ Prompt for address
  const defaultAddr = getDefaultAddress(selectedTool);
  let addressPrompt = "";

  if (selectedTool === "NO" || selectedTool === "NC") {
    addressPrompt = `Masukkan address input (I0.0, I0.1, I0.2, I0.3, T1, C1):`;
  } else if (selectedTool === "COIL") {
    addressPrompt = `Masukkan address output (Q0.0, Q0.1, Q0.2):`;
  } else if (selectedTool === "TON") {
    addressPrompt = `Masukkan address timer (T1, T2, T3):`;
  } else if (selectedTool === "CTU") {
    addressPrompt = `Masukkan address counter (C1, C2, C3):`;
  }

  const address = window.prompt(addressPrompt, defaultAddr);
  if (!address) return; // User cancelled

  // ✅ Prompt for preset if timer or counter
  let preset = undefined;
  if (selectedTool === "TON") {
    const presetStr = window.prompt("Masukkan preset timer (detik):", "3");
    preset = presetStr ? parseInt(presetStr) : 3;
  } else if (selectedTool === "CTU") {
    const presetStr = window.prompt("Masukkan preset counter:", "5");
    preset = presetStr ? parseInt(presetStr) : 5;
  }

  const newComponent: LadderComponent = {
    id: `comp_${Date.now()}`,
    type: selectedTool,
    address: address.trim(), // ✅ User-provided address
    position: { rung, col },
    preset: preset, // ✅ User-provided preset
    accum: 0,
  };

  setLadder([...ladder, newComponent]);
};
```

### **Fix 2: Add Edit Component Function**

```typescript
const editComponent = (id: string) => {
  const component = ladder.find((c) => c.id === id);
  if (!component) return;

  // ✅ Prompt for new address
  let addressPrompt = "";
  if (component.type === "NO" || component.type === "NC") {
    addressPrompt = `Edit address input (I0.0, I0.1, I0.2, I0.3, T1, C1):`;
  } else if (component.type === "COIL") {
    addressPrompt = `Edit address output (Q0.0, Q0.1, Q0.2):`;
  } else if (component.type === "TON") {
    addressPrompt = `Edit address timer (T1, T2, T3):`;
  } else if (component.type === "CTU") {
    addressPrompt = `Edit address counter (C1, C2, C3):`;
  }

  const newAddress = window.prompt(addressPrompt, component.address);
  if (newAddress === null) return; // User cancelled

  // ✅ Prompt for preset if timer or counter
  let newPreset = component.preset;
  if (component.type === "TON" || component.type === "CTU") {
    const presetStr = window.prompt(
      `Edit preset ${component.type === "TON" ? "(detik)" : "(count)"}:`,
      component.preset?.toString() || "3"
    );
    newPreset = presetStr ? parseInt(presetStr) : component.preset;
  }

  // ✅ Update component in ladder
  setLadder(
    ladder.map((c) =>
      c.id === id ? { ...c, address: newAddress.trim(), preset: newPreset } : c
    )
  );
};
```

### **Fix 3: Updated UI with Edit/Remove**

```tsx
<div className="relative group">
  <div
    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-mono text-sm cursor-pointer hover:bg-blue-700"
    onClick={() => editComponent(component.id)} // ✅ Click to Edit
    onContextMenu={(e) => {
      e.preventDefault();
      removeComponent(component.id); // ✅ Right-click to Remove
    }}
  >
    {getComponentIcon(component.type)}
    <br />
    <span className="text-xs font-bold">
      {component.address} // ✅ Shows user-entered address
    </span>
    {component.preset && (
      <div className="text-xs">
        PT: {component.preset}
        {component.type === "TON" ? "s" : ""}
      </div>
    )}
  </div>

  {/* ✅ New tooltip */}
  <div className="absolute -top-10 left-0 bg-blue-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
    Click: Edit | Right-click: Remove
  </div>
</div>
```

## 🎮 Cara Kerja Baru:

### **Skenario 1: Menambah Komponen Baru**

```
1. User pilih tool "NO" (Normally Open)
2. User klik pada grid (Rung 0, Col 0)
3. ✅ Dialog muncul: "Masukkan address input (I0.0, I0.1, I0.2, I0.3, T1, C1):"
4. User ketik: I0.1
5. Komponen dibuat dengan address I0.1 ✅
```

### **Skenario 2: Menambah Output dengan Address Berbeda**

```
1. User pilih tool "COIL"
2. User klik pada grid (Rung 0, Col 3)
3. ✅ Dialog muncul: "Masukkan address output (Q0.0, Q0.1, Q0.2):"
4. User ketik: Q0.1
5. Komponen dibuat dengan address Q0.1 ✅
```

### **Skenario 3: Edit Komponen yang Sudah Ada**

```
1. User melihat komponen dengan address I0.0 (salah)
2. User klik komponen tersebut
3. ✅ Dialog muncul: "Edit address input (I0.0, I0.1, I0.2, I0.3, T1, C1):"
4. User ubah ke: I0.2
5. Address komponen berubah menjadi I0.2 ✅
```

### **Skenario 4: Hapus Komponen**

```
1. User right-click komponen
2. ✅ Komponen terhapus
```

### **Skenario 5: Menambah Timer dengan Preset Custom**

```
1. User pilih tool "TON"
2. User klik grid
3. ✅ Dialog 1: "Masukkan address timer (T1, T2, T3):"
   User ketik: T2
4. ✅ Dialog 2: "Masukkan preset timer (detik):"
   User ketik: 5
5. Timer dibuat: T2 dengan preset 5 detik ✅
```

## 📊 Before vs After:

### **BEFORE:**

```
User Action: Click + to add NO contact
Result: ❌ Component created with I0.0 (always same)

User Action: Click + to add another NO contact
Result: ❌ Component created with I0.0 (duplicate address!)

User Action: Click component
Result: ❌ Component removed (no edit option)

User Action: Try to make I0.1
Result: ❌ IMPOSSIBLE! No way to change address
```

**Ladder Logic yang Dihasilkan:**

```
❌ WRONG:
Rung 0: ─┤I0.0├──┤I0.0├──┤I0.0├──(Q0.0)─
         ALL same address!
```

### **AFTER:**

```
User Action: Click + to add NO contact
Result: ✅ Prompt: "Masukkan address input..."
        User enters: I0.0
        Component created with I0.0

User Action: Click + to add another NO contact
Result: ✅ Prompt: "Masukkan address input..."
        User enters: I0.1
        Component created with I0.1 ✅

User Action: Click component
Result: ✅ Edit prompt appears, user can change address

User Action: Right-click component
Result: ✅ Component removed
```

**Ladder Logic yang Dihasilkan:**

```
✅ CORRECT:
Rung 0: ─┤I0.0├──┤I0.1├──┤I0.2├──(Q0.0)─
         Different addresses!
```

## 🎯 Challenge Examples:

### **Challenge 2: Start/Stop Motor**

**BEFORE:**

```
❌ User tries to make:
Rung 0: ─┤I0.1├──┤I0.0├──(Q0.0)─
        [STOP]  [START]

But gets:
❌ ─┤I0.0├──┤I0.0├──(Q0.0)─
    Both same address!
```

**AFTER:**

```
✅ User clicks + for NC contact
   Dialog: "Masukkan address input..."
   User enters: I0.1

✅ User clicks + for NO contact
   Dialog: "Masukkan address input..."
   User enters: I0.0

Result:
✅ ─┤I0.1├──┤I0.0├──(Q0.0)─
    [STOP]  [START]  Correct!
```

## 🔧 Technical Details:

### **Prompt System:**

1. **window.prompt()** digunakan untuk input
2. **Default value** ditampilkan (I0.0, Q0.0, dll)
3. **User bisa cancel** dengan klik Cancel atau kosong
4. **trim()** untuk remove whitespace
5. **parseInt()** untuk preset values

### **Component State Update:**

```typescript
// Update uses map() to replace specific component
setLadder(
  ladder.map((c) =>
    c.id === id ? { ...c, address: newAddress.trim(), preset: newPreset } : c
  )
);
```

### **UI Event Handling:**

- **onClick**: Edit component
- **onContextMenu**: Remove component (right-click)
- **Tooltip**: Shows instructions on hover

## ✅ Testing:

### **Test Case 1: Multiple Inputs**

```
1. Add NO contact → Enter I0.0
2. Add NO contact → Enter I0.1
3. Add NO contact → Enter I0.2
4. ✅ All three show different addresses
```

### **Test Case 2: Multiple Outputs**

```
1. Add COIL → Enter Q0.0
2. Add COIL → Enter Q0.1
3. Add COIL → Enter Q0.2
4. ✅ All three show different addresses
```

### **Test Case 3: Edit Address**

```
1. Add NO contact with I0.0
2. Click component
3. Change to I0.3
4. ✅ Address updates to I0.3
```

### **Test Case 4: Timer with Custom Preset**

```
1. Add TON timer
2. Enter address: T2
3. Enter preset: 10
4. ✅ Timer shows T2 with PT: 10s
```

### **Test Case 5: Remove Component**

```
1. Add any component
2. Right-click component
3. ✅ Component removed from grid
```

## 📝 Status:

- ✅ Address prompt added for all component types
- ✅ Edit functionality implemented
- ✅ Remove via right-click
- ✅ Preset prompts for timer/counter
- ✅ UI tooltip shows instructions
- ✅ No compilation errors
- ✅ Ready for testing!

## 🎉 Result:

User sekarang bisa:

1. ✅ Membuat komponen dengan address custom (I0.0, I0.1, I0.2, dll)
2. ✅ Edit address komponen yang sudah ada
3. ✅ Membuat ladder logic yang kompleks dengan multiple inputs/outputs
4. ✅ Menyelesaikan Challenge 2 (Start/Stop dengan I0.0 dan I0.1)
5. ✅ Menggunakan different addresses untuk setiap komponen

**Problem solved!** 🚀
