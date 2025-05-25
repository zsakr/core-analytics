import { collection, doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { UserProfile, UserSubscription, MembershipPlan } from '@/types/user'

const PLAN_FEATURES: Record<MembershipPlan, { uploads: number; credits: number }> = {
  'core-beta': {
    uploads: 6,
    credits: 3,
  },
  performance: {
    uploads: 10,
    credits: 3,
  },
  pro: {
    uploads: 25,
    credits: 6,
  }
}

export const createUserProfile = async (profile: UserProfile) => {
  const userDoc = doc(db, 'users', profile.id)
  
  // Set usage fields based on plan
  const plan = profile.membershipPlan || 'core-beta'
  const usageFields = {
    monthlyUploads: PLAN_FEATURES[plan].uploads,
    monthlyCredits: PLAN_FEATURES[plan].credits,
    usedUploads: 0,
    usedCredits: 0
  }

  await setDoc(userDoc, {
    ...profile,
    ...usageFields,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const userDoc = doc(db, 'users', userId)
  await updateDoc(userDoc, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}

export const getUserProfile = async (userId: string) => {
  const userDoc = doc(db, 'users', userId)
  const snapshot = await getDoc(userDoc)
  return snapshot.exists() ? snapshot.data() as UserProfile : null
}

export const createUserSubscription = async (subscription: UserSubscription) => {
  const subscriptionDoc = doc(db, 'subscriptions', subscription.userId)
  await setDoc(subscriptionDoc, subscription)
}

export const updateUserSubscription = async (userId: string, updates: Partial<UserSubscription>) => {
  const subscriptionDoc = doc(db, 'subscriptions', userId)
  await updateDoc(subscriptionDoc, {
    ...updates,
    updatedAt: Timestamp.now(),
  })
}

export const getUserSubscription = async (userId: string) => {
  const subscriptionDoc = doc(db, 'subscriptions', userId)
  const snapshot = await getDoc(subscriptionDoc)
  return snapshot.exists() ? snapshot.data() as UserSubscription : null
}
