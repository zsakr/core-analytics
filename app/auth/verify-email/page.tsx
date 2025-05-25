"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { emailService } from "@/lib/email-service"
import { doc, updateDoc, getDoc, Timestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { CreditCard } from "lucide-react"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [userProfile, setUserProfile] = useState<any>(null)
  const router = useRouter()
  const [plan, setPlan] = useState<string>("")  // Add state for plan

  // Get plan from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const planParam = searchParams.get('plan')
    if (!planParam) {
      setError("Missing plan parameter")
      router.push("/memberships")
      return
    }
    setPlan(planParam)
  }, [router])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/sign-in")
        return
      }

      // Get user profile
      const userDoc = doc(db, "users", user.uid)
      const userSnap = await getDoc(userDoc)
      const profile = userSnap.data()
      setUserProfile(profile)

      if (user.emailVerified) {
        // Update Firestore user document
        await updateDoc(doc(db, "users", user.uid), {
          emailVerified: true
        })

        // Check subscription status
        if (profile?.subscriptionStatus === "pending") {
          // Automatically redirect to Stripe payment
          try {
            const response = await fetch('/api/create-checkout-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: user.uid, plan }),
            })
            const { url, error } = await response.json()
            if (error) {
              setError(error)
              setIsLoading(false)
              return
            }
            window.location.href = url
          } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to start checkout')
            setIsLoading(false)
          }
          return
        }

        // If subscription is active, redirect to core insights
        router.push("/core-insights")
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  const handleResendEmail = async () => {
    try {
      setIsLoading(true)
      const user = auth.currentUser
      if (!user) throw new Error("No user found")
      
      await emailService.sendVerificationEmail(user, {
        url: `${window.location.origin}/auth/verify-email?userId=${user.uid}&plan=${plan}`,
      })
      setError("")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.spinner className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  const handleCompletePayment = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: auth.currentUser?.uid, plan }),
      })
      const { url, error } = await response.json()
      if (error) {
        setError(error)
        return
      }
      window.location.href = url
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start checkout')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    try {
      setIsLoading(true)
      await updateDoc(doc(db, "users", auth.currentUser?.uid || ''), {
        subscriptionStatus: "cancelled",
        cancelledAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      router.push("/memberships")
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to cancel subscription')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="space-y-8">
        {!userProfile?.emailVerified ? (
          // Email Verification Section
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Check your email
              </h1>
              <p className="text-sm text-muted-foreground">
                We sent you a verification link. Please check your email and click the
                link to verify your account.
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center bg-red-50 p-3 rounded">{error}</p>
            )}

            <Button
              onClick={handleResendEmail}
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Resend verification email
            </Button>
          </div>
        ) : userProfile?.subscriptionStatus === "pending" ? (
          // Loading state while redirecting to Stripe
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Redirecting to Payment</h2>
              <p className="text-muted-foreground">
                Your email is verified! You'll be redirected to complete your payment shortly.
              </p>
              <div className="flex justify-center mt-4">
                <Icons.spinner className="h-6 w-6 animate-spin" />
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-3 rounded text-center">{error}</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
