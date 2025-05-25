import { Timestamp } from "firebase/firestore"
import { Location } from "./location"

export type AgeCategory = "U11" | "U13" | "U15" | "U17" | "U19" | "College" | "Over19" | "Professional"
export type PlayerLevel = 'Amateur' | 'Professional'
export type MembershipPlan = "core-beta" | "performance" | "pro"
export type SubscriptionStatus = "active" | "pending" | "cancelled" | "expired"

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  emailVerified: boolean
  ageCategory: AgeCategory
  location: Location
  rating?: number | null
  worldRanking?: number | null
  club?: string | null
  membershipPlan: MembershipPlan
  subscriptionStatus: SubscriptionStatus
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  extraCredits?: number
  extraCost?: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface UserSubscription {
  userId: string
  planId: string
  planName: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  stripeCustomerId: string
  stripeSubscriptionId: string
  currentPeriodStart: Timestamp
  currentPeriodEnd: Timestamp
  cancelAtPeriodEnd: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}
