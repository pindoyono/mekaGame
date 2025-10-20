/**
 * MekaGame Standalone Server (sql.js version)
 * Menggunakan sql.js (SQLite compiled to WebAssembly) - NO NATIVE BINDINGS!
 * 100% portable, works everywhere including PKG bundles
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 1878;

// Get the correct base directory
const getBaseDir = () => {
  if (process.pkg) {
    return path.dirname(process.execPath);
  }
  return __dirname;
};

const baseDir = getBaseDir();
const outDir = path.join(baseDir, 'out');
const dataDir = path.join(baseDir, 'data');
const dbPath = path.join(dataDir, 'mekagame.db');

// Path to sql.js WASM file
const wasmPath = process.pkg 
  ? path.join(baseDir, 'sql-wasm.wasm')
  : path.join(__dirname, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');

console.log('🔍 Base directory:', baseDir);
console.log('📁 Out directory:', outDir);
console.log('💾 Data directory:', dataDir);
console.log('🔧 WASM path:', wasmPath);

// Middleware
app.use(express.json());

// Serve static files
if (fs.existsSync(outDir)) {
  app.use(express.static(outDir));
  console.log('✅ Serving static files from:', outDir);
} else {
  console.error('❌ ERROR: Out directory not found:', outDir);
  console.error('   Make sure "out" folder exists next to the executable!');
  process.exit(1);
}

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  console.log('📁 Creating data directory:', dataDir);
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database instance
let db = null;
let SQL = null;

// Initialize database
async function initDatabase() {
  try {
    console.log('💾 Initializing sql.js database...');
    
    // Check if WASM file exists
    if (!fs.existsSync(wasmPath)) {
      throw new Error(`WASM file not found at: ${wasmPath}`);
    }
    console.log('✅ WASM file found');
    
    // Initialize sql.js with WASM path
    SQL = await initSqlJs({
      locateFile: file => {
        console.log('📂 Loading WASM file:', file);
        return wasmPath;
      }
    });
    
    // Load existing database or create new one
    if (fs.existsSync(dbPath)) {
      console.log('📂 Loading existing database from:', dbPath);
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
    } else {
      console.log('📝 Creating new database at:', dbPath);
      db = new SQL.Database();
    }
    
    // Create tables
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        level INTEGER NOT NULL,
        score INTEGER NOT NULL,
        completed BOOLEAN DEFAULT 0,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, level)
      );
    `);
    
    // Save to disk
    saveDatabase();
    
    console.log('✅ Database initialized at:', dbPath);
    console.log('✅ Database ready!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  }
}

// Save database to disk
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

// API Routes

// Register user
app.post('/api/register', (req, res) => {
  const { username, password, name } = req.body;
  
  try {
    db.run('INSERT INTO users (username, password, name) VALUES (?, ?, ?)', 
           [username, password, name]);
    saveDatabase();
    
    const result = db.exec('SELECT last_insert_rowid() as id');
    const userId = result[0].values[0][0];
    
    res.json({ success: true, userId });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = db.exec(
      'SELECT id, username, name FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    
    if (result.length > 0 && result[0].values.length > 0) {
      const row = result[0].values[0];
      const user = {
        id: row[0],
        username: row[1],
        name: row[2]
      };
      res.json({ success: true, user });
    } else {
      res.json({ success: false, error: 'Invalid username or password' });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Get user progress
app.get('/api/progress/:userId', (req, res) => {
  const { userId } = req.params;
  
  try {
    const result = db.exec(
      'SELECT * FROM progress WHERE user_id = ? ORDER BY level ASC',
      [userId]
    );
    
    let progress = [];
    if (result.length > 0) {
      const columns = result[0].columns;
      progress = result[0].values.map(row => {
        let obj = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        return obj;
      });
    }
    
    res.json({ success: true, progress });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Update progress
app.post('/api/progress', (req, res) => {
  const { userId, level, score, completed } = req.body;
  
  try {
    // Check if exists
    const check = db.exec(
      'SELECT id FROM progress WHERE user_id = ? AND level = ?',
      [userId, level]
    );
    
    if (check.length > 0 && check[0].values.length > 0) {
      // Update
      db.run(
        'UPDATE progress SET score = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND level = ?',
        [score, completed ? 1 : 0, userId, level]
      );
    } else {
      // Insert
      db.run(
        'INSERT INTO progress (user_id, level, score, completed) VALUES (?, ?, ?, ?)',
        [userId, level, score, completed ? 1 : 0]
      );
    }
    
    saveDatabase();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const result = db.exec(`
      SELECT 
        u.name,
        u.username,
        SUM(p.score) as totalScore,
        SUM(CASE WHEN p.completed = 1 THEN 1 ELSE 0 END) as completedLevels
      FROM users u
      LEFT JOIN progress p ON u.id = p.user_id
      GROUP BY u.id
      ORDER BY totalScore DESC, completedLevels DESC
      LIMIT 10
    `);
    
    let leaderboard = [];
    if (result.length > 0) {
      const columns = result[0].columns;
      leaderboard = result[0].values.map(row => {
        let obj = {};
        columns.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        return obj;
      });
    }
    
    res.json({ success: true, leaderboard });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// SPA fallback
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) {
    const indexPath = path.join(outDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('index.html not found');
    }
  } else {
    next();
  }
});

// Start server
console.log('\n🚀 Starting MekaGame Server...\n');

// Get local IP address
function getLocalIP() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    
    console.log('');
    console.log('=' .repeat(60));
    console.log('  🎮 MekaGame Server (sql.js)');
    console.log('=' .repeat(60));
    console.log('');
    console.log(`  ✅ Server running at:`);
    console.log(`     • Local:   http://localhost:${PORT}`);
    console.log(`     • Network: http://${localIP}:${PORT}`);
    console.log('');
    console.log(`  📁 Database location: ${dbPath}`);
    console.log(`  📂 Static files from: ${outDir}`);
    console.log('');
    console.log(`  📌 Akses dari komputer ini:`);
    console.log(`     http://localhost:${PORT}`);
    console.log('');
    console.log(`  🌐 Akses dari komputer lain (LAN):`);
    console.log(`     http://${localIP}:${PORT}`);
    console.log('');
    console.log('  ⚠️  Jangan tutup window ini!');
    console.log('');
    console.log('=' .repeat(60));
    console.log('');
    
    // Auto-open browser
    try {
      const open = require('open');
      open(`http://localhost:${PORT}`);
    } catch (err) {
      // Silently fail
    }
  });
}).catch(error => {
  console.error('\n' + '='.repeat(60));
  console.error('❌ FATAL ERROR: Server failed to start!');
  console.error('='.repeat(60) + '\n');
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  console.error('\n📋 Please check:');
  console.error('  1. Folder "out" exists next to MekaGame.exe');
  console.error('  2. File "sql-wasm.wasm" exists next to MekaGame.exe');
  console.error('  3. Folder "data" is writable');
  console.error(`  4. Port ${PORT} is not already in use`);
  console.error('  5. Firewall allows port ' + PORT + ' (for network access)');
  console.error('\n🔍 Paths:');
  console.error('  Base:', baseDir);
  console.error('  Out:', outDir);
  console.error('  Data:', dataDir);
  console.error('  WASM:', wasmPath);
  console.error('\n⏸️  Press Ctrl+C to exit...\n');
  
  // Keep process alive so user can read error
  setInterval(() => {}, 1000);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Server dihentikan. Terima kasih!');
  if (db) saveDatabase();
  process.exit(0);
});

// Catch unhandled errors
process.on('uncaughtException', (error) => {
  console.error('\n❌ UNCAUGHT EXCEPTION:', error);
  console.error('Stack:', error.stack);
  console.error('\n⏸️  Press Ctrl+C to exit...\n');
  setInterval(() => {}, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ UNHANDLED REJECTION:', reason);
  console.error('Promise:', promise);
  console.error('\n⏸️  Press Ctrl+C to exit...\n');
  setInterval(() => {}, 1000);
});

// Periodic save (every 30 seconds)
setInterval(() => {
  if (db) saveDatabase();
}, 30000);
