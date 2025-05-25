// Redesigned SignUpForm.tsx with improved plan card sizing and spacing
"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { UserProfile } from "@/types/user"
import { emailService } from "@/lib/email-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "../ui/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUserProfile } from "@/lib/firebase/user"
import { AgeCategory, PlayerLevel, MembershipPlan } from "@/types/user"
import { Country, State } from "@/types/location"
import { Check, X } from "lucide-react"

// Import JSON data
import countries from "@/data/countries.json"
import usStates from "@/data/us-states.json"

const CREDIT_PACKS = [
  {
    value: 'basic',
    label: 'Basic Pack',
    credits: 3,
    price: 15,
  },
  {
    value: 'standard',
    label: 'Standard Pack',
    credits: 6,
    price: 30,
  },
  {
    value: 'pro',
    label: 'Pro Pack',
    credits: 10,
    price: 50,
  },
] as const

const PLAN_OPTIONS = [
  {
    value: 'core-beta',
    label: 'Core Beta',
    price: 14.99,
    description: 'Ideal for casual players seeking insights on a budget',
    features: [
      '6 uploads per month',
      'One Time 3 credits included',
      'Basic match analysis',
      'Core Connect',
    ],
  },
  /**
  {
    value: 'performance',
    label: 'Performance',
    originalPrice: 89.99,
    price: 53.99,
    discount: 40,
    description: 'Best for players ready to level up with coaching and networking',
    features: [
      '10 uploads per month',
      '3 monthly credits ($15 value)',
      'All in Core Beta',
      'Core Hub + AI Squash Coach Chat',
    ],
  },
  {
    value: 'pro',
    label: 'Pro',
    originalPrice: 139.99,
    price: 83.99,
    discount: 40,
    description: 'For elite players and coaches with full flexibility',
    features: [
      '25 uploads per month',
      '6 monthly credits ($30 value)',
      'All in Performance',
    ],
  },
   */
] as const

export function SignUpForm() {
  const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>("")
  const [ageCategory, setAgeCategory] = React.useState<AgeCategory>("U19")
  const [country, setCountry] = React.useState<string>("")
  const [state, setState] = React.useState<string>("")
  const [city, setCity] = React.useState<string>("")
  const [rating, setRating] = React.useState<string>("")
  const [worldRanking, setWorldRanking] = React.useState<string>("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = React.useState<MembershipPlan>(
    (searchParams?.get('plan') as MembershipPlan) || 'core-beta'
  )
  const [selectedCreditPack, setSelectedCreditPack] = React.useState<string | undefined>(undefined)
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [passwordValidation, setPasswordValidation] = React.useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumbers: false,
    hasSpecialChar: false,
    passwordsMatch: false
  })

  // Update password validation in real-time
  const validatePassword = (newPassword: string, confirmPass: string) => {
    setPasswordValidation({
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumbers: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      passwordsMatch: newPassword === confirmPass && newPassword !== ''
    })
  }

  const isProfessional = ageCategory === "Professional"
  const needsRating = !isProfessional && ageCategory

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.target as HTMLFormElement)
    const email = formData.get("email") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const club = formData.get("club") as string || ""

    // Validate required fields
    if (!email || !firstName || !lastName || !password || !selectedPlan || !country || !city) {
      setError("Please complete all required fields")
      setIsLoading(false)
      return
    }

    // Validate US state
    if (country === "United States" && !state) {
      setError("Please select a state for US addresses")
      setIsLoading(false)
      return
    }

    // Validate rating if needed
    if (needsRating && !rating) {
      setError("Please provide your current rating or enter 'NA' if not available")
      setIsLoading(false)
      return
    }

    // Validate world ranking for professionals
    if (isProfessional && !worldRanking) {
      setError("Please provide your current world ranking")
      setIsLoading(false)
      return
    }

    try {
      // Check if email already exists
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (data.exists) {
        setError("This email address is already registered. Please use a different email or sign in.")
        setIsLoading(false)
        return
      }
      // Create temporary user document in Firestore
      const tempUserDoc = doc(db, "tempUsers", email)
      // Create user profile with all required fields
      const userProfile = {
        id: email,
        email,
        firstName,
        lastName,
        password, // Store password for Firebase Auth creation
        club: club || null,
        country,
        state: country === "United States" ? state : "",
        city,
        ageCategory,
        selectedPlan,
        selectedCreditPack: selectedCreditPack || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isEmailVerified: false,
        paymentStatus: "pending",
        subscriptionStatus: "inactive",
        location: {
          country,
          state: country === "United States" ? state : "",
          city
        },
        ...(needsRating && rating ? { rating: parseFloat(rating) || null } : { rating: null }),
        ...(isProfessional && worldRanking ? { worldRanking: parseInt(worldRanking) } : { worldRanking: null })
      }

      await setDoc(tempUserDoc, userProfile)

      // Redirect to payment page with email identifier
      router.push(`/payment?plan=${selectedPlan}&email=${encodeURIComponent(email)}`)
    } catch (error) {
      console.error("Error during sign up:", error)
      setError(error instanceof Error ? error.message : "An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full px-4 py-12">
      <h1 className="text-3xl font-semibold text-center mb-6">Create an Account</h1>
      <p className="text-center text-muted-foreground mb-12">Choose a plan and tell us about yourself</p>

      {/* Plan Cards */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {PLAN_OPTIONS.map((plan) => (
            <div
              key={plan.value}
              className={`relative rounded-lg border p-4 cursor-pointer transition-all duration-200 ${selectedPlan === plan.value
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/50'
                }`}
              onClick={() => setSelectedPlan(plan.value as MembershipPlan)}
            >  
              <h3 className="text-lg font-semibold">{plan.label}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <div className="flex items-center gap-2 mt-4">
                <Badge>-{plan.discount}%</Badge>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <div className="text-2xl font-bold">${plan.price}<span className="text-sm font-normal">/month</span></div>
                <div className="text-sm text-muted-foreground line-through">${plan.originalPrice}</div>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      
        {/* Credit Packs */}
        {/*
        <div className="mt-8 mb-4">
          <h3 className="text-lg font-semibold mb-4">Want Extra Credits?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Each credit can be used for: 1 match upload and analysis, or 5 AI Squash Coach chatbot responses
          </p>
          

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CREDIT_PACKS.map((pack) => (
              <div
                key={pack.value}
                className={`relative rounded-lg border p-4 cursor-pointer transition-all duration-200 ${selectedCreditPack === pack.value
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50'
                  }`}
                onClick={() => setSelectedCreditPack(selectedCreditPack === pack.value ? undefined : pack.value)}
              >
                <div className="flex flex-col h-full">
                  <h4 className="font-medium">{pack.label}</h4>
                  <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 w-fit">
                    <span className="text-sm font-medium text-primary">{pack.credits} Credits</span>
                  </div>
                  <p className="mt-4 flex items-baseline gap-x-1">
                    <span className="text-2xl font-bold">${pack.price}</span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>

      {/* Sign Up Form */}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="space-y-4">
          <Label>First Name</Label>
          <Input name="firstName" type="text" required disabled={isLoading} />
          <Label>Last Name</Label>
          <Input name="lastName" type="text" required disabled={isLoading} />
          <Label>Email</Label>
          <Input name="email" type="email" required disabled={isLoading} />
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              validatePassword(e.target.value, confirmPassword)
            }}
          />
          <div className="text-sm space-y-2">
            <p className="font-medium">Password requirements:</p>
            <ul className="space-y-1">
              <li className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}>
                {passwordValidation.minLength ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                At least 8 characters
              </li>
              <li className={`flex items-center gap-2 ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-red-600'}`}>
                {passwordValidation.hasUpperCase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                One uppercase letter
              </li>
              <li className={`flex items-center gap-2 ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-red-600'}`}>
                {passwordValidation.hasLowerCase ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                One lowercase letter
              </li>
              <li className={`flex items-center gap-2 ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-red-600'}`}>
                {passwordValidation.hasNumbers ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                One number
              </li>
              <li className={`flex items-center gap-2 ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}>
                {passwordValidation.hasSpecialChar ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                One special character (!@#$%^&*(),.?":{}|{'<>'})
              </li>
            </ul>
          </div>
          <Label>Confirm Password</Label>
          <Input
            name="confirmPassword"
            type="password"
            required
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              validatePassword(password, e.target.value)
            }}
          />
          {confirmPassword && (
            <p className={`text-sm mt-1 ${passwordValidation.passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
              <span className="flex items-center gap-2">
                {passwordValidation.passwordsMatch ? (
                  <>
                    <Check className="h-4 w-4" /> Passwords match
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" /> Passwords do not match
                  </>
                )}
              </span>
            </p>
          )}
          <Label>Country</Label>
          <Select value={country} onValueChange={setCountry} required>
            <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.code} value={c.name}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {country === "United States" && (
            <div className="space-y-2">
              <Label>State</Label>
              <Select value={state} onValueChange={setState} required>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {usStates.map((s) => (
                    <SelectItem key={s.code} value={s.name}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Label>City</Label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-4">
          <Label>Age Category</Label>
          <Select value={ageCategory} onValueChange={(v: string) => setAgeCategory(v as AgeCategory)}>
            <SelectTrigger><SelectValue placeholder="Select age category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="U11">U11</SelectItem>
              <SelectItem value="U13">U13</SelectItem>
              <SelectItem value="U15">U15</SelectItem>
              <SelectItem value="U17">U17</SelectItem>
              <SelectItem value="U19">U19</SelectItem>
              <SelectItem value="College">College</SelectItem>
              <SelectItem value="Over19">Over 19</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
            </SelectContent>
          </Select>

          {needsRating && (
            <div className="space-y-2">
              <Label>Current Rating (Required)</Label>
              <Input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="text"
                placeholder="Enter rating, country ranking, or NA"
                required
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground">
                <span>Enter one of:</span>
                <ul className="list-disc pl-5 mt-1">
                  <li>Your current rating</li>
                  <li>Your country ranking (e.g., "UK #5")</li>
                  <li>'NA' if neither is available</li>
                </ul>
              </div>
            </div>
          )}

          {isProfessional && (
            <div className="space-y-2">
              <Label>World Ranking (Required)</Label>
              <Input
                value={worldRanking}
                onChange={(e) => setWorldRanking(e.target.value)}
                type="number"
                min={1}
                placeholder="Enter your world ranking"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <Label>Club (optional)</Label>
          <Input name="club" placeholder="Club name" disabled={isLoading} />
        </div>

        {error && <div className="md:col-span-2 text-red-600 bg-red-50 p-3 rounded">{error}</div>}

        <div className="md:col-span-2">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
}