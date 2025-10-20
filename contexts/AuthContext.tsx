"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Types
export interface LevelProgress {
  levelId: number;
  completed: boolean;
  score: number;
  attempts: number;
  bestScore: number;
  completedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  createdAt: string;
  totalScore: number;
  levelsCompleted: number;
  progress: LevelProgress[];
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
    displayName: string
  ) => Promise<boolean>;
  logout: () => void;
  updateProgress: (levelId: number, score: number, completed: boolean) => void;
  getLevelProgress: (levelId: number) => LevelProgress | null;
  getAllUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Detect storage mode
function getStorageMode() {
  if (typeof window === "undefined") return "localStorage";

  // Check if running in Electron
  if ((window as any).electronAPI) {
    return "electron";
  }

  // Check if API server is available
  if (
    window.location.protocol === "http:" &&
    window.location.hostname === "localhost"
  ) {
    return "api";
  }

  // Default to localStorage
  return "localStorage";
}

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: "mekaGame_currentUser",
  ALL_USERS: "mekaGame_allUsers",
};

// API helper functions
async function apiCall(endpoint: string, method: string = "GET", data?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(
      `http://localhost:3000/api${endpoint}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    return { success: false, error: "Network error" };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storageMode, setStorageMode] = useState<
    "electron" | "api" | "localStorage"
  >("localStorage");

  // Detect storage mode on mount
  useEffect(() => {
    const mode = getStorageMode();
    setStorageMode(mode);
    console.log("🔧 Storage mode:", mode);
  }, []);

  // Load user from storage on mount
  useEffect(() => {
    if (storageMode === "localStorage") {
      const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
      }
    }
  }, [storageMode]);

  // Get all users from localStorage
  const getAllUsers = (): User[] => {
    const usersData = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
    if (!usersData) return [];
    try {
      return JSON.parse(usersData);
    } catch {
      return [];
    }
  };

  // Save all users to localStorage
  const saveAllUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
  };

  // Register new user
  const register = async (
    username: string,
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    // Validation
    if (!username || !email || !password || !displayName) {
      alert("Semua field harus diisi!");
      return false;
    }

    if (username.length < 3) {
      alert("Username minimal 3 karakter!");
      return false;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return false;
    }

    try {
      // Mode: Electron IPC
      if (
        storageMode === "electron" &&
        typeof window !== "undefined" &&
        (window as any).electronAPI
      ) {
        const resp = await (window as any).electronAPI.registerUser({
          username,
          password,
          name: displayName,
        });

        if (resp && resp.success) {
          const createdUser: User = {
            id: resp.userId.toString(),
            username,
            email,
            displayName,
            createdAt: new Date().toISOString(),
            totalScore: 0,
            levelsCompleted: 0,
            progress: [],
          };
          setUser(createdUser);
          setIsAuthenticated(true);
          return true;
        } else {
          alert(resp.error || "Registrasi gagal!");
          return false;
        }
      }

      // Mode: API Server
      if (storageMode === "api") {
        const resp = await apiCall("/register", "POST", {
          username,
          password,
          name: displayName,
        });

        if (resp.success) {
          const createdUser: User = {
            id: resp.userId.toString(),
            username,
            email,
            displayName,
            createdAt: new Date().toISOString(),
            totalScore: 0,
            levelsCompleted: 0,
            progress: [],
          };
          setUser(createdUser);
          setIsAuthenticated(true);
          localStorage.setItem(
            STORAGE_KEYS.CURRENT_USER,
            JSON.stringify(createdUser)
          );
          return true;
        } else {
          alert(resp.error || "Registrasi gagal!");
          return false;
        }
      }

      // Mode: localStorage (default)
      const allUsers = getAllUsers();
      const existingUser = allUsers.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );

      if (existingUser) {
        alert("Username sudah terdaftar!");
        return false;
      }

      const existingEmail = allUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingEmail) {
        alert("Email sudah terdaftar!");
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        displayName,
        createdAt: new Date().toISOString(),
        totalScore: 0,
        levelsCompleted: 0,
        progress: [],
      };

      // Save to localStorage
      const updatedUsers = [...allUsers, newUser];
      saveAllUsers(updatedUsers);

      // Auto login
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

      return true;
    } catch (err) {
      console.error("Register error:", err);
      alert("Terjadi kesalahan saat mendaftar");
      return false;
    }
  };

  // Login user
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    if (!username || !password) {
      alert("Username dan password harus diisi!");
      return false;
    }

    try {
      // Mode: Electron IPC
      if (
        storageMode === "electron" &&
        typeof window !== "undefined" &&
        (window as any).electronAPI
      ) {
        const resp = await (window as any).electronAPI.loginUser({
          username,
          password,
        });

        if (resp && resp.success && resp.user) {
          const userFromDb: User = {
            id: String(resp.user.id),
            username: resp.user.username,
            email: resp.user.email || "",
            displayName: resp.user.name || resp.user.username,
            createdAt: new Date().toISOString(),
            totalScore: 0,
            levelsCompleted: 0,
            progress: [],
          };
          setUser(userFromDb);
          setIsAuthenticated(true);
          return true;
        }

        alert(resp.error || "Login gagal!");
        return false;
      }

      // Mode: API Server
      if (storageMode === "api") {
        const resp = await apiCall("/login", "POST", {
          username,
          password,
        });

        if (resp.success && resp.user) {
          const userFromApi: User = {
            id: String(resp.user.id),
            username: resp.user.username,
            email: username + "@local", // placeholder
            displayName: resp.user.name || resp.user.username,
            createdAt: new Date().toISOString(),
            totalScore: 0,
            levelsCompleted: 0,
            progress: [],
          };
          setUser(userFromApi);
          setIsAuthenticated(true);
          localStorage.setItem(
            STORAGE_KEYS.CURRENT_USER,
            JSON.stringify(userFromApi)
          );
          return true;
        }

        alert(resp.error || "Login gagal!");
        return false;
      }

      // Mode: localStorage (default)
      const allUsers = getAllUsers();
      const foundUser = allUsers.find(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      );

      if (!foundUser) {
        alert("Username tidak ditemukan!");
        return false;
      }

      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(foundUser)
      );

      return true;
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login");
      return false;
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  // Update level progress
  const updateProgress = (
    levelId: number,
    score: number,
    completed: boolean
  ) => {
    if (!user) return;

    // Mode: Electron IPC
    if (
      storageMode === "electron" &&
      typeof window !== "undefined" &&
      (window as any).electronAPI
    ) {
      try {
        (window as any).electronAPI.updateProgress({
          userId: user.id,
          level: levelId,
          score,
          completed,
        });
      } catch (err) {
        console.error("Electron updateProgress error", err);
      }
    }

    // Mode: API Server
    if (storageMode === "api") {
      apiCall("/progress", "POST", {
        userId: user.id,
        level: levelId,
        score,
        completed,
      }).catch((err) => console.error("API updateProgress error", err));
    }

    // Update local state for UI (all modes)
    const existingProgressIndex = user.progress.findIndex(
      (p) => p.levelId === levelId
    );
    let updatedProgress = [...user.progress];

    if (existingProgressIndex !== -1) {
      const existing = updatedProgress[existingProgressIndex];
      updatedProgress[existingProgressIndex] = {
        ...existing,
        score,
        completed: completed || existing.completed,
        attempts: existing.attempts + 1,
        bestScore: Math.max(existing.bestScore, score),
        completedAt: completed
          ? new Date().toISOString()
          : existing.completedAt,
      };
    } else {
      updatedProgress.push({
        levelId,
        completed,
        score,
        attempts: 1,
        bestScore: score,
        completedAt: completed ? new Date().toISOString() : undefined,
      });
    }

    const totalScore = updatedProgress.reduce((sum, p) => sum + p.bestScore, 0);
    const levelsCompleted = updatedProgress.filter((p) => p.completed).length;

    const updatedUser: User = {
      ...user,
      progress: updatedProgress,
      totalScore,
      levelsCompleted,
    };

    setUser(updatedUser);

    // Save to localStorage for session persistence
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(updatedUser)
    );

    // Update all users list (localStorage mode)
    if (storageMode === "localStorage") {
      const allUsers = getAllUsers();
      const updatedUsers = allUsers.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      saveAllUsers(updatedUsers);
    }
  };

  // Get progress for specific level
  const getLevelProgress = (levelId: number): LevelProgress | null => {
    if (!user) return null;
    return user.progress.find((p) => p.levelId === levelId) || null;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProgress,
    getLevelProgress,
    getAllUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
