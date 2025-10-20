const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');

// Simple dev check without external dependency
const isDev = !app.isPackaged;

let mainWindow;
let db;

// Initialize SQLite database
function initDatabase() {
  const dbPath = path.join(app.getPath('userData'), 'mekagame.db');
  db = new Database(dbPath);
  
  // Create tables if not exists
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

  console.log('Database initialized at:', dbPath);
}

// IPC Handlers for database operations
function setupIPC() {
  // Register user
  ipcMain.handle('register-user', async (event, { username, password, name }) => {
    try {
      const stmt = db.prepare('INSERT INTO users (username, password, name) VALUES (?, ?, ?)');
      const result = stmt.run(username, password, name);
      return { success: true, userId: result.lastInsertRowid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Login user
  ipcMain.handle('login-user', async (event, { username, password }) => {
    try {
      const stmt = db.prepare('SELECT id, username, name FROM users WHERE username = ? AND password = ?');
      const user = stmt.get(username, password);
      if (user) {
        return { success: true, user };
      } else {
        return { success: false, error: 'Invalid username or password' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Get user progress
  ipcMain.handle('get-progress', async (event, { userId }) => {
    try {
      const stmt = db.prepare('SELECT * FROM progress WHERE user_id = ? ORDER BY level ASC');
      const progress = stmt.all(userId);
      return { success: true, progress };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Update progress
  ipcMain.handle('update-progress', async (event, { userId, level, score, completed }) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO progress (user_id, level, score, completed, updated_at) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, level) 
        DO UPDATE SET score = ?, completed = ?, updated_at = CURRENT_TIMESTAMP
      `);
      stmt.run(userId, level, score, completed ? 1 : 0, score, completed ? 1 : 0);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Get leaderboard
  ipcMain.handle('get-leaderboard', async () => {
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
      return { success: true, leaderboard };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    backgroundColor: '#1e293b',
  });

  // Load app
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../out/index.html')}`;

  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  initDatabase();
  setupIPC();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (db) {
    db.close();
  }
});
