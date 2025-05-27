import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;
import { adminAuth } from '@/lib/firebase-admin';

export async function GET() {
  const email = 'ziad.sakr40@gmail.com';
  
  try {
    // Get user record
    const userRecord = await adminAuth.getUserByEmail(email);
    
    // Create custom token
    const customToken = await adminAuth.createCustomToken(userRecord.uid);
    
    // Exchange custom token for ID token
    const signInResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: customToken, returnSecureToken: true })
      }
    );

    const signInData = await signInResponse.json();
    const idToken = signInData.idToken;

    // Send verification email with correct continue URL
    const verificationResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: idToken,
          continueUrl: 'https://core-analytics-ai-ff40e.firebaseapp.com/__/auth/action'
        })
      }
    );

    const verificationData = await verificationResponse.json();

    return NextResponse.json({
      success: true,
      message: 'Verification email sent v2',
      debug: {
        userId: userRecord.uid,
        email: userRecord.email,
        response: verificationData
      }
    });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      error: error.message,
      code: error.code,
      fullError: error
    }, { status: 500 });
  }
}
