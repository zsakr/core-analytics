import { NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

const db = adminDb

export async function GET(request: Request) {
  console.log('Starting email verification process...')
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const plan = searchParams.get('plan')
    const oobCode = searchParams.get('oobCode') // Firebase's email verification code
    
    console.log('Received params:', { userId, plan, hasOobCode: !!oobCode })

    // If we have an oobCode, this is a direct email verification from Firebase
    if (oobCode) {
      try {
        // Get the user record from the verification code
        const userRecord = await adminAuth.verifyIdToken(oobCode)
        const email = userRecord.email
        
        if (!email) {
          throw new Error('No email found in verification data')
        }

        // Update the user's email verified status
        await adminAuth.updateUser(userRecord.uid, {
          emailVerified: true
        })

        // Update Firestore document
        const userDoc = db.collection('users').doc(email)
        await userDoc.update({
          emailVerified: true
        })

        // Redirect to success page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/email-verified`)
      } catch (error) {
        console.error('Error verifying email:', error)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/error?message=email-verification-failed`)
      }
    }

    // If we don't have userId or plan, this is an error for the checkout flow
    if (!userId || !plan) {
      return NextResponse.json(
        { error: 'Missing userId or plan for checkout flow' },
        { status: 400 }
      )
    }

    // Update user's email verification status
    const userDoc = db.collection('users').doc(userId)
    const userSnap = await userDoc.get()
    
    if (!userSnap.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update email verification status
    await userDoc.update({
      emailVerified: true
    })

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3000'
    console.log('Creating checkout session with:', { baseUrl, userId, plan })
    
    const response = await fetch(`${baseUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ userId, plan })
    })
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Checkout session creation failed:', errorData)
      throw new Error(`Failed to create checkout session: ${errorData}`)
    }

    const { url, error } = await response.json()
    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      )
    }

    // Redirect to Stripe checkout
    return NextResponse.redirect(url)
  } catch (error) {
    console.error('Error in verify-email route:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
