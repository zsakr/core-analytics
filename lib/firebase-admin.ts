import admin from 'firebase-admin';

if (!admin.apps.length) {
  // Check if required environment variables are present
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    // For static export, use mock values
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      const mockServiceAccount = {
        projectId: 'mock-project-id',
        clientEmail: 'mock@example.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9QFxsbqGSimRP\n-----END PRIVATE KEY-----'
      };
      admin.initializeApp({
        credential: admin.credential.cert(mockServiceAccount)
      });
      console.log('Using mock Firebase configuration for static export');
    }
    throw new Error('Missing Firebase Admin SDK environment variables');
  }

  // Handle private key formatting
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log('Firebase Admin SDK initialized successfully with:', {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.slice(0, 10) + '...',
    hasPrivateKey: !!privateKey,
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
