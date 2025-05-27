import admin from 'firebase-admin';

if (!admin.apps.length) {
  // Check if required environment variables are present
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    // For static export, use mock values
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      const mockServiceAccount = {
        projectId: 'mock-project-id',
        clientEmail: 'mock@example.com',
        privateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAwJENcRev+eXZKvhhWLiV3Lz2MvO+naQRHo59g3vaNQnbgyduN/L4krlr\nY9OVIQL5WfGnJYAHAC8A9aTLFNy0GcpjG6GpOS0BbNZVomlxf/gtJoXC0kk7zAOh6Q5V7n3h\nKy6lhNrLjPcjS2Rh2f2GokN1Ey0IwxJNSLTqmyEjNn3xu3Y7JQXOCQU/sGnM30eU/xUn5t4R\nk11gjN6YYjE6KUMgk4rTyTQwJU0+/Q6wQeEE5YDGsrBkw/PnfYAC0mu/gkZiHAeAuPCDwhJU\nTL5/1Y8YS0AGRlmrTZ7/wX5t4jfE0H1PGZqH7eqW0TXRuCAeqCLT119Hx78bqYU29QIDAQAB\n-----END RSA PRIVATE KEY-----'
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
