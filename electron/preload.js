const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // User authentication
  registerUser: (data) => ipcRenderer.invoke('register-user', data),
  loginUser: (data) => ipcRenderer.invoke('login-user', data),
  
  // Progress management
  getProgress: (data) => ipcRenderer.invoke('get-progress', data),
  updateProgress: (data) => ipcRenderer.invoke('update-progress', data),
  
  // Leaderboard
  getLeaderboard: () => ipcRenderer.invoke('get-leaderboard'),
  
  // Check if running in Electron
  isElectron: true,
});
