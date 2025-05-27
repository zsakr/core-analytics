import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;
import { adminAuth } from '@/lib/firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth, sendEmailVerification } from 'firebase/auth';

// Initialize Firebase client
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

export async function GET() {
  const email = 'ziad.sakr40@gmail.com';
  
  try {
    console.log('Firebase Config:', {
      apiKey: process.env.FIREBASE_API_KEY?.slice(0, 5) + '...',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID
    });

    // 1. Get or create user with admin SDK
    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      console.log('Found existing user:', userRecord.uid);
    } catch (error) {
      userRecord = await adminAuth.createUser({
        email,
        emailVerified: false,
        displayName: 'Ziad Sakr'
      });
      console.log('Created new user:', userRecord.uid);
    }

    // 2. Generate verification link
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    };

    console.log('Action Code Settings:', actionCodeSettings);

    // 3. Generate link and log it
    const link = await adminAuth.generateEmailVerificationLink(
      email,
      actionCodeSettings
    );

    console.log('Generated verification link:', link);

    // 4. Get current user state
    const updatedUser = await adminAuth.getUser(userRecord.uid);
    
    return NextResponse.json({
      success: true,
      message: 'Debug info gathered',
      debug: {
        userId: userRecord.uid,
        verificationLink: link,
        userState: {
          emailVerified: updatedUser.emailVerified,
          displayName: updatedUser.displayName,
          email: updatedUser.email,
          disabled: updatedUser.disabled
        },
        config: {
          projectId: process.env.FIREBASE_PROJECT_ID,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          appUrl: process.env.NEXT_PUBLIC_APP_URL
        }
      }
    });

  } catch (error: any) {
    console.error('Error in debug-email:', error);
    return NextResponse.json({
      error: error.message,
      code: error.code,
      fullError: error
    }, { status: 500 });
  }
}
