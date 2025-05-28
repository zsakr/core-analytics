import admin from 'firebase-admin';
import { join } from 'path';

if (!admin.apps.length) {
  try {
    // Get absolute path to service account file
    const serviceAccountPath = join(process.cwd(), 'service-account.json');

    // Initialize Firebase Admin with service account file
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath)
    });

    console.log('Firebase Admin SDK initialized successfully with service account file');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
