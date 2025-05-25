import { NextResponse } from 'next/server'
import { auth } from '@/lib/firebase/admin'
import { UserProfile } from '@/types/user'

export async function POST(request: Request) {
  try {
    const { userId, profile } = await request.json()
    
    // Update user custom claims with profile data
    await auth.setCustomUserClaims(userId, {
      ageCategory: profile.ageCategory,
      playerLevel: profile.playerLevel,
      location: profile.location,
      rating: profile.rating,
      club: profile.club,
    })

    // Update user display name to show category and level
    await auth.updateUser(userId, {
      displayName: `${profile.playerLevel} - ${profile.ageCategory}`,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}
