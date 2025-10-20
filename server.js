/**
 * MekaGame Standalone Server
 * Portable Node.js server dengan SQLite database
 * Untuk di-bundle menjadi single .exe menggunakan PKG
 */

const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const { app: electronApp } = process.versions.electron ? require('electron') : { app: null };

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'out')));

// Database setup
let db;
const dbPath = electronApp 
  ? path.join(electronApp.getPath('userData'), 'mekagame.db')
  : path.join(__dirname, 'data', 'mekagame.db');

// Ensure data directory exists
const fs = require('fs');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
function initDatabase() {
  db = new Database(dbPath);
  
  db.exec(`
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

  console.log('✅ Database initialized at:', dbPath);
}

// API Routes

// Register user
app.post('/api/register', (req, res) => {
  const { username, password, name } = req.body;
  
  try {
    const stmt = db.prepare('INSERT INTO users (username, password, name) VALUES (?, ?, ?)');
    const result = stmt.run(username, password, name);
    res.json({ success: true, userId: result.lastInsertRowid });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  try {
    const stmt = db.prepare('SELECT id, username, name FROM users WHERE username = ? AND password = ?');
    const user = stmt.get(username, password);
    
    if (user) {
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
    const stmt = db.prepare('SELECT * FROM progress WHERE user_id = ? ORDER BY level ASC');
    const progress = stmt.all(userId);
    res.json({ success: true, progress });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Update progress
app.post('/api/progress', (req, res) => {
  const { userId, level, score, completed } = req.body;
  
  try {
    const stmt = db.prepare(`
      INSERT INTO progress (user_id, level, score, completed, updated_at) 
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(user_id, level) 
      DO UPDATE SET score = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
    `);
    stmt.run(userId, level, score, completed ? 1 : 0, score, completed ? 1 : 0);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT 
        u.name,
        u.username,
        SUM(p.score) as totalScore,
        COUNT(CASE WHEN p.completed = 1 THEN 1 END) as completedLevels
      FROM users u
      LEFT JOIN progress p ON u.id = p.user_id
      GROUP BY u.id
      ORDER BY totalScore DESC, completedLevels DESC
      LIMIT 10
    `);
    const leaderboard = stmt.all();
    res.json({ success: true, leaderboard });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Serve static files from 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// SPA fallback - serve index.html for any non-API routes
// This should be LAST after all other routes
app.use((req, res, next) => {
  // Only serve HTML for non-API routes
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
  } else {
    next();
  }
});

// Start server
initDatabase();

app.listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('=' .repeat(60));
  console.log('  🎮 MekaGame Server');
  console.log('=' .repeat(60));
  console.log('');
  console.log(`  ✅ Server running at: http://localhost:${PORT}`);
  console.log(`  📁 Database location: ${dbPath}`);
  console.log('');
  console.log('  📌 Buka browser dan akses: http://localhost:3000');
  console.log('  ⚠️  Jangan tutup window ini!');
  console.log('');
  console.log('=' .repeat(60));
  console.log('');
  
  // Auto-open browser (optional, may not work in WSL)
  try {
    const open = require('open');
    open(`http://localhost:${PORT}`);
  } catch (err) {
    // Silently fail if 'open' doesn't work
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Server dihentikan. Terima kasih!');
  if (db) db.close();
  process.exit(0);
});
