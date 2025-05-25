"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export default function AdminSetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const createAdmin = async () => {
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/create-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "ziad.sakr40@gmail.com",
          password: "CoreTestZeNaAdmin123@321"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create admin account")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/login")
      }, 2000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Setup</h1>
          <p className="text-muted-foreground mt-2">Create the admin account</p>
        </div>

        {success ? (
          <div className="bg-green-50 text-green-600 p-4 rounded">
            Admin account created successfully! Redirecting to login...
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded text-sm">
                {error}
              </div>
            )}
            <Button onClick={createAdmin} disabled={loading} className="w-full">
              {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Create Admin Account
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
