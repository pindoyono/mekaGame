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

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: "mekaGame_currentUser",
  ALL_USERS: "mekaGame_allUsers",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
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
  }, []);

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

    // Check if username already exists
    const allUsers = getAllUsers();
    const existingUser = allUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (existingUser) {
      alert("Username sudah terdaftar!");
      return false;
    }

    // Check if email already exists
    const existingEmail = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingEmail) {
      alert("Email sudah terdaftar!");
      return false;
    }

    // Create new user
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

    // If running inside Electron, use IPC to register user in SQLite
    // @ts-ignore
    if (typeof window !== "undefined" && (window as any).electronAPI) {
      try {
        // electron main will return { success, userId }
        // We still create a client-side user object for the session
        const resp = await (window as any).electronAPI.registerUser({
          username,
          password,
          name: displayName,
        });
        if (resp && resp.success) {
          const createdUser: User = {
            id: String(resp.userId),
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
        }

        alert(resp.error || "Gagal mendaftar (Electron)");
        return false;
      } catch (err) {
        console.error("Electron register error", err);
        alert("Terjadi kesalahan saat mendaftar");
        return false;
      }
    }

    // Save to localStorage (web fallback)
    const updatedUsers = [...allUsers, newUser];
    saveAllUsers(updatedUsers);

    // Auto login
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

    return true;
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
    // If in Electron, call IPC login which checks DB
    // @ts-ignore
    if (typeof window !== "undefined" && (window as any).electronAPI) {
      try {
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
          localStorage.setItem(
            STORAGE_KEYS.CURRENT_USER,
            JSON.stringify(userFromDb)
          );
          return true;
        }
        alert(resp.error || "Login gagal (Electron)");
        return false;
      } catch (err) {
        console.error("Electron login error", err);
        alert("Terjadi kesalahan saat login");
        return false;
      }
    }

    // Web fallback: localStorage-based login
    const allUsers = getAllUsers();
    const foundUser = allUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!foundUser) {
      alert("Username tidak ditemukan!");
      return false;
    }

    if (password.length < 6) {
      alert("Password salah!");
      return false;
    }

    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(foundUser));

    return true;
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

    // If running inside Electron, delegate save to main process
    // @ts-ignore
    if (typeof window !== "undefined" && (window as any).electronAPI) {
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
      // Keep local session updated for UI
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

      const totalScore = updatedProgress.reduce(
        (sum, p) => sum + p.bestScore,
        0
      );
      const levelsCompleted = updatedProgress.filter((p) => p.completed).length;

      const updatedUser: User = {
        ...user,
        progress: updatedProgress,
        totalScore,
        levelsCompleted,
      };

      setUser(updatedUser);
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(updatedUser)
      );
      return;
    }

    // Web fallback: localStorage update logic
    const existingProgressIndex = user.progress.findIndex(
      (p) => p.levelId === levelId
    );
    let updatedProgress = [...user.progress];

    if (existingProgressIndex !== -1) {
      // Update existing progress
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
      // Add new progress
      updatedProgress.push({
        levelId,
        completed,
        score,
        attempts: 1,
        bestScore: score,
        completedAt: completed ? new Date().toISOString() : undefined,
      });
    }

    // Calculate total score and completed levels
    const totalScore = updatedProgress.reduce((sum, p) => sum + p.bestScore, 0);
    const levelsCompleted = updatedProgress.filter((p) => p.completed).length;

    const updatedUser: User = {
      ...user,
      progress: updatedProgress,
      totalScore,
      levelsCompleted,
    };

    // Update state
    setUser(updatedUser);

    // Update localStorage for current user
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(updatedUser)
    );

    // Update in all users list
    const allUsers = getAllUsers();
    const userIndex = allUsers.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser;
      saveAllUsers(allUsers);
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
