import { initializeApp, getApps, FirebaseApp } from 'firebase/app';

let firebaseApp: FirebaseApp | undefined;

export function getFirebaseApp() {
  if (!firebaseApp) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    };

    if (!firebaseConfig.apiKey) {
      throw new Error('Firebase API key is not configured');
    }

    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApps()[0];
    }
  }
  return firebaseApp;
}
