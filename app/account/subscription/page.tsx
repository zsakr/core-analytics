import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen bg-muted/40 py-12">
      <div className="container max-w-4xl">
        <div className="mb-6 flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/core-insights">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Subscription Management</h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Demo Mode</CardTitle>
            <CardDescription>Subscription management is currently in demo mode</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              In a real application, you would be able to manage your subscription here. Currently, we're in demo mode
              without active subscription management.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <p className="font-medium">Performance Plan</p>
              <p className="text-sm text-muted-foreground">Individual</p>
              <p className="text-xl font-bold mt-2">$64.99/month</p>
              <p className="text-sm text-muted-foreground mt-1">Demo subscription</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/memberships">View Plans</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

