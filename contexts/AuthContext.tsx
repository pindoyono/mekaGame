'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Types
export interface LevelProgress {
  levelId: number
  completed: boolean
  score: number
  attempts: number
  bestScore: number
  completedAt?: string
}

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  createdAt: string
  totalScore: number
  levelsCompleted: number
  progress: LevelProgress[]
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string, displayName: string) => Promise<boolean>
  logout: () => void
  updateProgress: (levelId: number, score: number, completed: boolean) => void
  getLevelProgress: (levelId: number) => LevelProgress | null
  getAllUsers: () => User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Storage keys
const STORAGE_KEYS = {
  CURRENT_USER: 'mekaGame_currentUser',
  ALL_USERS: 'mekaGame_allUsers',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
      }
    }
  }, [])

  // Get all users from localStorage
  const getAllUsers = (): User[] => {
    const usersData = localStorage.getItem(STORAGE_KEYS.ALL_USERS)
    if (!usersData) return []
    try {
      return JSON.parse(usersData)
    } catch {
      return []
    }
  }

  // Save all users to localStorage
  const saveAllUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users))
  }

  // Register new user
  const register = async (
    username: string,
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    // Validation
    if (!username || !email || !password || !displayName) {
      alert('Semua field harus diisi!')
      return false
    }

    if (username.length < 3) {
      alert('Username minimal 3 karakter!')
      return false
    }

    if (password.length < 6) {
      alert('Password minimal 6 karakter!')
      return false
    }

    // Check if username already exists
    const allUsers = getAllUsers()
    const existingUser = allUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    )

    if (existingUser) {
      alert('Username sudah terdaftar!')
      return false
    }

    // Check if email already exists
    const existingEmail = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )

    if (existingEmail) {
      alert('Email sudah terdaftar!')
      return false
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
    }

    // Save to localStorage
    const updatedUsers = [...allUsers, newUser]
    saveAllUsers(updatedUsers)

    // Auto login
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))

    return true
  }

  // Login user
  const login = async (username: string, password: string): Promise<boolean> => {
    if (!username || !password) {
      alert('Username dan password harus diisi!')
      return false
    }

    const allUsers = getAllUsers()
    const foundUser = allUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    )

    if (!foundUser) {
      alert('Username tidak ditemukan!')
      return false
    }

    // In real app, we would verify password hash
    // For demo, we just check if password length matches expected
    if (password.length < 6) {
      alert('Password salah!')
      return false
    }

    setUser(foundUser)
    setIsAuthenticated(true)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(foundUser))

    return true
  }

  // Logout user
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }

  // Update level progress
  const updateProgress = (levelId: number, score: number, completed: boolean) => {
    if (!user) return

    const existingProgressIndex = user.progress.findIndex((p) => p.levelId === levelId)
    let updatedProgress = [...user.progress]

    if (existingProgressIndex !== -1) {
      // Update existing progress
      const existing = updatedProgress[existingProgressIndex]
      updatedProgress[existingProgressIndex] = {
        ...existing,
        score,
        completed: completed || existing.completed,
        attempts: existing.attempts + 1,
        bestScore: Math.max(existing.bestScore, score),
        completedAt: completed ? new Date().toISOString() : existing.completedAt,
      }
    } else {
      // Add new progress
      updatedProgress.push({
        levelId,
        completed,
        score,
        attempts: 1,
        bestScore: score,
        completedAt: completed ? new Date().toISOString() : undefined,
      })
    }

    // Calculate total score and completed levels
    const totalScore = updatedProgress.reduce((sum, p) => sum + p.bestScore, 0)
    const levelsCompleted = updatedProgress.filter((p) => p.completed).length

    const updatedUser: User = {
      ...user,
      progress: updatedProgress,
      totalScore,
      levelsCompleted,
    }

    // Update state
    setUser(updatedUser)

    // Update localStorage for current user
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser))

    // Update in all users list
    const allUsers = getAllUsers()
    const userIndex = allUsers.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser
      saveAllUsers(allUsers)
    }
  }

  // Get progress for specific level
  const getLevelProgress = (levelId: number): LevelProgress | null => {
    if (!user) return null
    return user.progress.find((p) => p.levelId === levelId) || null
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProgress,
    getLevelProgress,
    getAllUsers,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
