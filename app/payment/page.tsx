"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useAuth } from "@/components/auth-provider"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe with a check for the publishable key
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

// Plan data
const plans = {
  "core-beta": {
    name: "Core Beta",
    type: "Individual",
    price: 14.99,
    billingCycle: "monthly",
    features: [
      "6 uploads per month",
      "One Time 3 credits included",
      "Basic match analysis",
      "Core Connect",
    ],
  },
  "performance": {
    name: "Performance",
    type: "Individual",
    price: 53.99,
    billingCycle: "monthly",
    features: [
      "10 uploads per month",
      "3 monthly credits ($15 value)",
      "All in Core Beta",
      "Core Hub + AI Squash Coach Chat",
    ],
  },
  "pro": {
    name: "Pro",
    type: "Individual",
    price: 83.99,
    billingCycle: "monthly",
    features: [
      "25 uploads per month",
      "6 monthly credits ($30 value)",
      "All in Performance",
    ],
  },
}

// CheckoutForm component for Stripe Elements
function CheckoutForm({
  planId,
  billingCycle,
  price,
  onSuccess,
}: {
  planId: string
  billingCycle: "monthly" | "annual"
  price: string
  onSuccess: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: "if_required",
      })

      if (error) {
        throw new Error(error.message || "An error occurred during payment")
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        try {
          // Payment succeeded, record the subscription
          const response = await fetch("/api/confirm-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              planId,
              billingCycle,
              price,
            }),
          })

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || "Failed to confirm subscription")
          }

          // Call the success callback
          onSuccess()
        } catch (error: any) {
          console.error("Error confirming subscription:", error)
          throw new Error(error.message || "Failed to confirm subscription")
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during payment")
      toast({
        title: "Payment failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {errorMessage && (
          <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">{errorMessage}</div>
        )}

        <PaymentElement />

        <div className="flex items-center space-x-2 rounded-lg border p-4">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">Your payment information is encrypted and secure.</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" type="submit" disabled={loading || !stripe || !elements}>
          {loading ? "Processing..." : `Pay $${price}`}
        </Button>
      </CardFooter>
    </form>
  )
}

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Get the selected plan
  const planId = searchParams ? searchParams.get("plan") ?? "performance" : "performance"
  const billingCycleParam = searchParams ? searchParams.get("billing") ?? "monthly" : "monthly"
  const billingCycle = billingCycleParam === "annual" ? "annual" : "monthly" as const
  const selectedPlan = plans[planId as keyof typeof plans]

  // Calculate price based on billing cycle
  const price =
    billingCycle === "annual"
      ? (selectedPlan.price * 10).toFixed(2) // 2 months free with annual
      : selectedPlan.price.toFixed(2)

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      setLoading(true);
      try {
        // Get the email from the URL params
        if (!searchParams) {
          throw new Error("Search params not available");
        }
        const email = searchParams.get("email");
        if (!email) {
          throw new Error("Email is required");
        }

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId,
            billingCycle,
            price,
            planName: `${selectedPlan.name} ${selectedPlan.type}`,
            email,
          }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || "Failed to create payment intent")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "There was an error setting up the payment. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [planId, billingCycle, price, user, toast, selectedPlan.name, selectedPlan.type, stripePromise])

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
    toast({
      title: "Payment successful!",
      description: "Your subscription has been activated.",
    })
    router.push("/payment/success")
  }

  // ...
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-muted/40 py-12">
  //       <div className="container max-w-md">
  //         <Card>
  //           <CardHeader className="text-center">
  //             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
  //             <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
  //           </div>
  //           <CardTitle className="text-2xl">Payment Successful!</CardTitle>
  //           <CardDescription>Your subscription has been activated</CardDescription>
  //         </CardHeader>
  //         <CardContent className="space-y-4 text-center">
  //           <p>
  //             Thank you for subscribing to our {selectedPlan.name} plan. Your account has been upgraded and you now
  //             have access to all the features included in your subscription.
  //           </p>
  //           <div className="rounded-lg bg-muted p-4">
  //             <p className="font-medium">
  //               {selectedPlan.name} - {selectedPlan.type}
  //             </p>
  //             <p className="text-sm text-muted-foreground">
  //               {billingCycle === "annual" ? "Annual" : "Monthly"} billing
  //             </p>
  //             <p className="text-xl font-bold mt-2">${price}</p>
  //           </div>
  //         </CardContent>
  //         <CardFooter className="flex flex-col space-y-2">
  //           <Button className="w-full" onClick={() => router.push("/dashboard")}>
  //             Go to Dashboard
  //           </Button>
  //           <Button variant="outline" className="w-full" asChild>
  //             <Link href="/account/subscription">Manage Subscription</Link>
  //           </Button>
  //         </CardFooter>
  //       </Card>
  //     </div>
  //   </div>
  //   )
  // }

  // return (
  //   <div className="flex min-h-screen bg-muted/40 py-12">
  //     <div className="container grid flex-1 items-start gap-12 px-4 md:grid-cols-5 lg:px-6">
  //       <div className="col-span-3 space-y-6">
  //         <div className="flex items-center space-x-2">
  //           <Button variant="outline" size="icon" asChild>
  //             <Link href="/pricing">
  //               <ArrowLeft className="h-4 w-4" />
  //               <span className="sr-only">Back</span>
  //             </Link>
  //           </Button>
  //           <h1 className="text-2xl font-bold">Checkout</h1>
  //         </div>

  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Payment Information</CardTitle>
  //             <CardDescription>Enter your card details to complete your subscription</CardDescription>
  //           </CardHeader>
  //           {clientSecret ? (
  //             <Elements
  //               stripe={stripePromise}
  //               options={{
  //                 clientSecret,
  //                 appearance: {
  //                   theme: "stripe",
  //                 },
  //               }}
  //             >
  //               <CheckoutForm
  //                 planId={planId}
  //                 billingCycle={billingCycle}
  //                 price={price}
  //                 onSuccess={handlePaymentSuccess}
  //               />
  //             </Elements>
  //           ) : (
  //             <CardContent className="flex items-center justify-center p-6">
  //               <div className="flex flex-col items-center space-y-2">
  //                 <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
  //                 <p className="text-sm text-muted-foreground">Loading payment form...</p>
  //               </div>
  //             </CardContent>
  //           )}
  //         </Card>

  //         <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
  //           <Shield className="h-4 w-4" />
  //           <span>Secure payment processing</span>
  //         </div>
  //       </div>

  //       <div className="col-span-2 space-y-6">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Order Summary</CardTitle>
  //           </CardHeader>
  //           <CardContent className="space-y-4">
  //             <div className="rounded-lg bg-muted p-4">
  //               <div className="flex items-center justify-between">
  //                 <div>
  //                   <p className="font-medium">{selectedPlan.name}</p>
  //                   <p className="text-sm text-muted-foreground">{selectedPlan.type} Plan</p>
  //                 </div>
  //                 <div className="text-right">
  //                   <p className="font-medium">${price}</p>
  //                   <p className="text-sm text-muted-foreground">
  //                     {billingCycle === "annual" ? "per year" : "per month"}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>

  //             <RadioGroup
  //               defaultValue={billingCycle}
  //               onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
  //               className="space-y-2"
  //             >
  //               <div className="flex items-center space-x-2 rounded-lg border p-4">
  //                 <RadioGroupItem value="monthly" id="monthly" />
  //                 <Label htmlFor="monthly" className="flex-1 cursor-pointer">
  //                   <div className="font-medium">Monthly billing</div>
  //                   <div className="text-sm text-muted-foreground">${selectedPlan.price.toFixed(2)} per month</div>
  //                 </Label>
  //               </div>
  //               <div className="flex items-center space-x-2 rounded-lg border p-4">
  //                 <RadioGroupItem value="annual" id="annual" />
  //                 <Label htmlFor="annual" className="flex-1 cursor-pointer">
  //                   <div className="font-medium">Annual billing</div>
  //                   <div className="text-sm text-muted-foreground">
  //                     ${(selectedPlan.price * 10).toFixed(2)} per year (save 16%)
  //                   </div>
  //                 </Label>
  //                 <div className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
  //                   Save 16%
  //                 </div>
  //               </div>
  //             </RadioGroup>

  //             <Separator />

  //             <div className="space-y-1.5">
  //               <div className="flex items-center justify-between">
  //                 <span className="text-muted-foreground">Subtotal</span>
  //                 <span>${price}</span>
  //               </div>
  //               <div className="flex items-center justify-between">
  //                 <span className="text-muted-foreground">Tax</span>
  //                 <span>$0.00</span>
  //               </div>
  //               <Separator className="my-2" />
  //               <div className="flex items-center justify-between font-medium">
  //                 <span>Total</span>
  //                 <span>${price}</span>
  //               </div>
  //             </div>
  //           </CardContent>
  //         </Card>

  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Plan Features</CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <ul className="space-y-2">
  //               {selectedPlan.features.map((feature, index) => (
  //                 <li key={index} className="flex items-start gap-2">
  //                   <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
  //                   <span className="text-sm">{feature}</span>
  //                 </li>
  //               ))}
  //             </CardContent>
  //           </Card>

  //         <div className="text-center text-sm text-muted-foreground">
  //           <p>
  //             Need help?{" "}
  //             <Link href="/contact" className="text-primary hover:underline">
  //               Contact support
  //             </Link>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
  if (!stripePromise) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Preparing payment form...</div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="flex min-h-screen bg-muted/40 py-12">
        <div className="container max-w-md mx-auto">
          <div className="flex items-center space-x-2 mb-6">
            <Button variant="outline" size="icon" asChild>
              <Link href="/memberships">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Complete Your Subscription</h1>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedPlan.name} Plan</CardTitle>
                  <CardDescription>{selectedPlan.type} - {billingCycle} billing</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${price}</div>
                  <div className="text-sm text-muted-foreground">
                    {billingCycle === "annual" ? "per year" : "per month"}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CheckoutForm
                planId={planId}
                billingCycle={billingCycle}
                price={price}
                onSuccess={handlePaymentSuccess}
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Plan Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-4 w-4" />
              <span>Secure payment powered by Stripe</span>
            </div>
            <p>
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Elements>
  )
}

