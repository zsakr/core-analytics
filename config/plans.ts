export const MEMBERSHIP_PLANS = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for getting started with AI-powered tennis analysis",
    price: 15,
    features: [
      "3 match analysis credits",
      "Basic shot analysis",
      "Performance tracking",
      "Email support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    description: "Great for regular players looking to improve",
    price: 30,
    features: [
      "6 match analysis credits",
      "Advanced shot analysis",
      "Performance tracking",
      "Strategy recommendations",
      "Priority email support",
      "Access to training drills",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious players and coaches",
    price: 50,
    features: [
      "10 match analysis credits",
      "Advanced shot analysis",
      "Performance tracking",
      "Strategy recommendations",
      "Priority email support",
      "Access to training drills",
      "Custom training plans",
      "Video consultations",
    ],
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)
}
