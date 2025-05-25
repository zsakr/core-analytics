import { NextRequest, NextResponse } from "next/server"
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth } from "@/lib/firebase"
import { emailService } from "@/lib/email-service"
import { createUserProfile } from "@/lib/firebase/user"
import { UserProfile, AgeCategory, MembershipPlan } from "@/types/user"

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')
    const success = searchParams.get('success') === 'true'
    const sessionId = searchParams.get('session_id')

    if (!email || !sessionId) {
      console.error("Missing email or sessionId", { email, sessionId })
      return NextResponse.redirect(new URL('/payment/failed', req.url))
    }

    try {
      // Get temporary user data from Firestore
      const tempUserDoc = await getDoc(doc(db, "tempUsers", email))
      if (!tempUserDoc.exists()) {
        console.error("Temporary user not found", { email })
        return NextResponse.redirect(new URL('/payment/failed', req.url))
      }

      interface TempUserData {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        club?: string;
        country: string;
        state: string;
        city: string;
        ageCategory: string;
        rating?: string;
        worldRanking?: number;
        selectedPlan: string;
        selectedCreditPack?: string;
        createdAt: any;
        updatedAt: any;
        isEmailVerified: boolean;
        paymentStatus: string;
        subscriptionStatus: string;
      }

      const tempUserData = tempUserDoc.data() as TempUserData

      if (success) {
        try {
          // Create Firebase user
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            tempUserData.password
          )

          // Create user profile in Firestore
          const { password, ...userData } = tempUserData
          const userProfile: UserProfile = {
            id: email,
            email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            emailVerified: false,
            ageCategory: userData.ageCategory as AgeCategory,
            location: {
              country: userData.country,
              state: userData.state,
              city: userData.city
            },
            club: userData.club || null,
            membershipPlan: userData.selectedPlan as MembershipPlan,
            subscriptionStatus: "active",
            rating: userData.rating ? parseFloat(userData.rating) : null,
            worldRanking: userData.worldRanking || null
          }

          // Save user profile with usage fields
          await createUserProfile(userProfile)

          // Delete temporary user data
          await deleteDoc(doc(db, "tempUsers", email))

          // Send verification email
          await emailService.sendVerificationEmail(userCredential.user, {
            url: `${req.nextUrl.origin}/auth/verify-email?userId=${userCredential.user.uid}`,
          })

          // Send subscription confirmation email
          await emailService.sendPaymentConfirmation(
            email,
            tempUserData.selectedPlan,
            tempUserData.firstName
          )

          // Redirect to success page
          return NextResponse.redirect(new URL('/payment/success', req.url))
        } catch (error) {
          console.error("Error creating user:", error)
          return NextResponse.redirect(new URL('/payment/failed', req.url))
        }
      } else {
        // Payment was not successful
        console.log(`Payment failed for user ${email} with session ${sessionId}`)
        return NextResponse.redirect(new URL('/payment/failed', req.url))
      }
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.redirect(new URL('/payment/failed', req.url))
    }
  } catch (error) {
    console.error("Payment confirmation error:", error)
    return NextResponse.redirect(new URL('/payment/failed', req.url))
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, success } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Get temporary user data from Firestore
    const tempUserDoc = await getDoc(doc(db, "tempUsers", email))
    if (!tempUserDoc.exists()) {
      return NextResponse.json(
        { error: "Temporary user not found" },
        { status: 404 }
      )
    }

    interface TempUserData {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      club?: string;
      country: string;
      state: string;
      city: string;
      ageCategory: string;
      rating?: string;
      worldRanking?: number;
      selectedPlan: string;
      selectedCreditPack?: string;
      createdAt: any;
      updatedAt: any;
      isEmailVerified: boolean;
      paymentStatus: string;
      subscriptionStatus: string;
    }

    const tempUserData = tempUserDoc.data() as TempUserData

    if (success) {
      try {
        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          tempUserData.password
        )

        // Create user profile in Firestore
        const { password, ...userData } = tempUserData
        const userProfile: UserProfile = {
          id: email,
          email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          emailVerified: false,
          ageCategory: userData.ageCategory,
          location: {
            country: userData.country,
            state: userData.state,
            city: userData.city
          },
          club: userData.club || null,
          membershipPlan: userData.selectedPlan,
          subscriptionStatus: "active",
          rating: userData.rating ? parseFloat(userData.rating) : null,
          worldRanking: userData.worldRanking || null
        }

        // Save user profile with usage fields
        await createUserProfile(userProfile)

        // Delete temporary user data
        await deleteDoc(doc(db, "tempUsers", email))

        // Send verification email
        await emailService.sendVerificationEmail(userCredential.user, {
          url: `${req.nextUrl.origin}/auth/verify-email?userId=${userCredential.user.uid}`,
        })

        // Send subscription confirmation email
        await emailService.sendPaymentConfirmation(
          email,
          tempUserData.selectedPlan,
          tempUserData.firstName
        )

        return NextResponse.json({ success: true, userId: userCredential.user.uid })
      } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Failed to create user" },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment confirmation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    )
  }
}
