"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
  error: null,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user)
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

