import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase-admin";
import Stripe from "stripe";
import { createClient } from '@supabase/supabase-js';
import { initializeApp, getApps } from 'firebase/app';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Initialize Firebase app only if it hasn't been initialized
function initializeFirebase() {
  if (getApps().length === 0) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
    };
    if (!firebaseConfig.apiKey) {
      throw new Error('Firebase API key is not configured');
    }
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: Request) {
  try {
    // Log Firebase environment variables (redact sensitive parts)
    console.log('Firebase config:', {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.slice(0, 10) + '...',
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    });

    const body = await request.json();
    const { paymentIntentId, planId, billingCycle, price } = body;

    if (!paymentIntentId || !planId || !billingCycle || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify the payment intent
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error: any) {
      console.error("Error retrieving payment intent:", error);
      return NextResponse.json(
        { error: "Invalid payment intent" },
        { status: 400 }
      );
    }

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment has not been completed" },
        { status: 400 }
      );
    }

    // Get user email from metadata
    const email = paymentIntent.metadata.email;
    if (!email) {
      return NextResponse.json(
        { error: "No email found in payment intent metadata" },
        { status: 400 }
      );
    }

    // Get temp user data
    let tempUserDoc;
    try {
      tempUserDoc = await adminDb.collection("tempUsers").doc(email).get();
    } catch (error: any) {
      console.error("Error accessing Firestore:", error);
      return NextResponse.json(
        { error: "Database access error" },
        { status: 500 }
      );
    }

    const tempUserData = tempUserDoc.data();
    if (!tempUserData) {
      return NextResponse.json(
        { error: "No temporary user data found" },
        { status: 400 }
      );
    }

    try {
      // Update the user document with subscription details
      await adminDb.collection("users").doc(email).set({
        ...tempUserData,
        subscriptionStatus: "active",
        paymentStatus: "completed",
        planId,
        billingCycle,
        price: parseFloat(price),
        lastPaymentDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      }, { merge: true });

      // Delete temp user data
      await adminDb.collection("tempUsers").doc(email).delete();

      // Handle Firebase Auth user
      try {
        let userRecord;

        try {
          // Try to get existing user
          userRecord = await adminAuth.getUserByEmail(email);
          console.log('Found existing user:', userRecord.uid);
        } catch (error) {
          // If user doesn't exist, create new user
          if (!tempUserData.password) {
            throw new Error('No password found in temporary user data');
          }
          userRecord = await adminAuth.createUser({
            email,
            password: tempUserData.password,
            displayName: `${tempUserData.firstName} ${tempUserData.lastName}`,
            emailVerified: true, // Since they've already paid, we can trust their email
          });
          console.log('Created new user:', userRecord.uid);
        }

        // Update user profile if needed
        await adminAuth.updateUser(userRecord.uid, {
          displayName: `${tempUserData.firstName} ${tempUserData.lastName}`,
          emailVerified: true, // Since they've already paid, we can trust their email
        });

        // Also update the Firestore document to reflect email verification
        await adminDb.collection('users').doc(email).update({
          emailVerified: true
        });

        // Send verification email
        try {
          // Set up action code settings
          const actionCodeSettings = {
            url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
            handleCodeInApp: true
          };

          // Create a custom token for the user
          const customToken = await adminAuth.createCustomToken(userRecord.uid);

          // Initialize Firebase and get API key
          initializeFirebase();
          const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY;
          if (!apiKey) {
            throw new Error('Firebase API key is not configured');
          }

          const signInResponse = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: customToken, returnSecureToken: true })
            }
          );

          if (!signInResponse.ok) {
            const errorData = await signInResponse.json();
            console.error('Error signing in with custom token:', errorData);
            throw new Error('Failed to sign in with custom token');
          }

          const signInData = await signInResponse.json();
          const idToken = signInData.idToken;

          // Send verification email
          const verifyResponse = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: idToken
              })
            }
          );

          if (!verifyResponse.ok) {
            const errorData = await verifyResponse.json();
            console.error('Error sending verification email:', errorData);
            throw new Error('Failed to send verification email');
          }

          console.log('Verification email sent to:', email);
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          throw emailError;
        }

      } catch (authError: any) {
        console.error("Error creating Firebase user:", authError);
        // Don't return error here, as payment was successful
      }
    } catch (error: any) {
      console.error("Error updating user data:", error);
      return NextResponse.json(
        { error: "Failed to update user data: " + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error confirming subscription:", error);
    return NextResponse.json(
      { error: error.message || "Failed to confirm subscription" },
      { status: 500 }
    );
  }
}
