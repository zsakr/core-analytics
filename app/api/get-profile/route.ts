import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return NextResponse.json({ error: 'No ID token provided' }, { status: 401 });
    }

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const email = decodedToken.email;

    if (!email) {
      return NextResponse.json({ error: 'No email found in token' }, { status: 400 });
    }

    // Get user profile from Firestore
    const userDoc = await adminDb.collection('users').doc(email).get();
    
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile: userDoc.data() });
  } catch (error) {
    console.error('Error in get-profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
