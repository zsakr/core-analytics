import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const PLANS = [
  {
    id: 'core-beta',
    name: 'Core Beta Plan',
    price: '$44.99',
    interval: 'month',
    features: [
      'Basic match analysis',
      'Performance tracking',
      'Training recommendations',
      'Access to community forums'
    ]
  },
  {
    id: 'performance',
    name: 'Performance Plan',
    price: '$64.99',
    interval: 'month',
    features: [
      'Advanced match analysis',
      'Detailed performance metrics',
      'Personalized training plans',
      'Priority support',
      'Video analysis tools'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$99.99',
    interval: 'month',
    features: [
      'All Performance features',
      'AI-powered insights',
      'Custom analytics dashboard',
      'Private coaching sessions',
      'Tournament strategy planning'
    ]
  },
  {
    id: 'team-core-beta',
    name: 'Team Core Beta Plan',
    price: '$249',
    interval: 'month',
    features: [
      'Up to 5 team members',
      'Team performance tracking',
      'Basic team analytics',
      'Shared training plans',
      'Team chat'
    ]
  },
  {
    id: 'team-performance',
    name: 'Team Performance Plan',
    price: '$349',
    interval: 'month',
    features: [
      'Up to 15 team members',
      'Advanced team analytics',
      'Team strategy tools',
      'Custom team reports',
      'Priority team support'
    ]
  },
  {
    id: 'team-pro',
    name: 'Team Pro Plan',
    price: '$499',
    interval: 'month',
    features: [
      'Unlimited team members',
      'AI team insights',
      'Tournament management',
      'Team performance prediction',
      'Dedicated success manager'
    ]
  }
]

export function PricingCards() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
      {PLANS.map((plan) => (
        <Card key={plan.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription className="text-lg">
              {plan.price}/{plan.interval}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/signup?plan=${plan.id}`}>
                Get Started
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
