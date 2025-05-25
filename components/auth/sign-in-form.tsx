"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "../ui/icons"

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      console.log('Attempting to sign in with:', { email }); // Don't log password
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!result.user.emailVerified) {
        // Send verification email again
        await sendEmailVerification(result.user, {
          url: `${window.location.origin}/auth/callback`,
          handleCodeInApp: true
        });
        
        setError('Please verify your email address. A new verification email has been sent.');
        return;
      }
      
      console.log('Sign in successful:', result.user.uid);
      router.push('/profile');
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else {
        setError('An error occurred during sign in. Please try again.');
      }
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="grid gap-6">
      <p className="text-lg md:text-xl font-medium leading-relaxed text-muted-foreground text-center mb-8 lg:hidden">
        From squash footage to feedback in minutes — Core AI shows you what happened, why it happened, and what others miss: patterns, pressure, and performance
      </p>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">
              {error.includes("auth/invalid-credential") 
                ? "Invalid email or password. Please make sure you've verified your email address."
                : error}
            </p>
          )}
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>

    </div>
  )
}
