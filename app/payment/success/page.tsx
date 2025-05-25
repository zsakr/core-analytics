import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 py-12">
      <div className="container max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Welcome to Core Analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              Thank you for subscribing! Your payment has been processed successfully, and your account has been created.
            </p>
            <div className="rounded-lg bg-yellow-50 p-4 text-left">
              <h4 className="mb-2 font-semibold text-yellow-800">Important Next Steps:</h4>
              <ol className="list-decimal pl-5 text-sm text-yellow-700 space-y-2">
                <li>Check your email for a verification link</li>
                <li>Click the link to verify your email address</li>
                <li>Once verified, you'll have full access to Core Analytics</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Please verify your email within 24 hours to ensure uninterrupted access to your account.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" asChild>
              <Link href="/profile">Go to Profile</Link>
            </Button>

          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

