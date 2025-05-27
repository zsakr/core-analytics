import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;
import { adminDb, adminAuth } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode');
    const oobCode = url.searchParams.get('oobCode');

    // Check if this is an email verification request
    if (mode !== 'verifyEmail' || !oobCode) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=invalid_request`);
    }

    try {
      // Verify the action code (oobCode)
      const email = await adminAuth.verifyIdToken(oobCode);
      
      // Get user by email
      const userRecord = await adminAuth.getUserByEmail(email.email!);

      // Update user's emailVerified status in Firebase Auth
      await adminAuth.updateUser(userRecord.uid, {
        emailVerified: true
      });

      // Update user's emailVerified status in Firestore
      await adminDb.collection('users').doc(userRecord.email!).update({
        emailVerified: true,
        updatedAt: new Date().toISOString()
      });

      // Redirect to success page
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/success`);

    } catch (error) {
      console.error('Error verifying email:', error);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=verification_failed`);
    }

  } catch (error) {
    console.error('Error in verification callback:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/error?error=server_error`);
  }
}
