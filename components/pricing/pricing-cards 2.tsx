import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MEMBERSHIP_PLANS, formatPrice } from "@/config/plans"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingCards() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      {MEMBERSHIP_PLANS.map((plan) => (
        <Card key={plan.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription className="text-lg">
              {formatPrice(plan.price)}/month
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="mb-4 text-gray-600">{plan.description}</p>
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
                Get Started with {plan.name}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
