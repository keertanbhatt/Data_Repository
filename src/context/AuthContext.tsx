import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { DEMO_CREDENTIALS, type User, type UserRole } from '../types'

interface AuthContextValue {
  user: User | null
  login: (role: UserRole, username: string, password: string) => string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (role: UserRole, username: string, password: string): string | null => {
    const cred = DEMO_CREDENTIALS[role]
    if (username.trim() !== cred.username || password !== cred.password) {
      return 'Invalid username or password for the selected role.'
    }
    setUser({
      username: cred.username,
      displayName: cred.displayName,
      role,
    })
    return null
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
