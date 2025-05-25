import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Copy, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ReferralPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get a Free Month of Core Analytics</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Refer a friend and both of you will receive a free month of our Pro subscription.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Three simple steps to get your free month of Core Analytics Pro.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
              <h3 className="text-xl font-bold">Sign Up</h3>
              <p className="text-center text-muted-foreground">
                Create your free Core Analytics account to get your unique referral link.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
              <h3 className="text-xl font-bold">Share</h3>
              <p className="text-center text-muted-foreground">
                Share your referral link with friends, teammates, or coaches who would benefit from Core Analytics.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
              <h3 className="text-xl font-bold">Get Rewarded</h3>
              <p className="text-center text-muted-foreground">
                When someone signs up using your link and activates their account, you both get a free month of Pro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Link Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Your Referral Link</CardTitle>
                <CardDescription>Sign in to get your unique referral link and start sharing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="relative">
                      <Input
                        value="Sign in to generate your unique referral link"
                        readOnly
                        className="pr-12 bg-muted"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full aspect-square"
                        disabled
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You need to sign in to generate and share your referral link
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button className="flex-1" asChild>
                      <Link href="/dashboard">
                        Sign In <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/dashboard">Create Account</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pro Benefits You'll Both Enjoy
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  When you refer a friend, you both get access to all these Pro features for a full month:
                </p>
              </div>
              <ul className="grid gap-2 py-4">
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <span>10 reports per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <span>AI-powered coaching recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <span>Opponent analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <span>Custom training programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <span>Priority video processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <span>Unlimited data retention</span>
                </li>
              </ul>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="aspect-video overflow-hidden rounded-xl border bg-muted">
                <Image
                  src="/placeholder.svg?height=1080&width=1920"
                  alt="Core Analytics Pro Dashboard"
                  width={1920}
                  height={1080}
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to know about our referral program.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:gap-8">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-bold">How many friends can I refer?</h3>
              <p className="mt-2 text-muted-foreground">
                You can refer up to 5 friends per month. Each successful referral gives both you and your friend one
                free month of Pro.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-bold">When do we get the free month?</h3>
              <p className="mt-2 text-muted-foreground">
                The free month is applied immediately when your friend signs up using your referral link and completes
                their account setup.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-bold">Can I stack multiple free months?</h3>
              <p className="mt-2 text-muted-foreground">
                Yes! Each successful referral adds one month to your subscription. Refer 5 friends and get 5 free months
                of Pro.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-lg font-bold">What if I'm already a Pro subscriber?</h3>
              <p className="mt-2 text-muted-foreground">
                If you're already a Pro subscriber, each successful referral will extend your current subscription by
                one month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-electric-gradient text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Share the Benefits?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up now to get your referral link and start earning free months of Core Analytics Pro.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/subscription">View Subscription</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

