import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentFailedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 py-12">
      <div className="container max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-2xl">Payment Failed</CardTitle>
            <CardDescription>There was a problem with your payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              We were unable to process your payment. Please try again or contact support if the problem persists.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" asChild>
              <Link href="/memberships">Try Again</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
