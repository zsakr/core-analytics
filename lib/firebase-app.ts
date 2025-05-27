import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let firebaseApp: FirebaseApp | undefined;

export function getFirebaseApp() {
  if (!firebaseApp) {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (!apiKey) {
      throw new Error('Firebase API key is not configured');
    }
    if (!projectId) {
      throw new Error('Firebase Project ID is not configured');
    }

    const firebaseConfig = {
      apiKey,
      projectId,
      authDomain: `${projectId}.firebaseapp.com`,
    };

    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApps()[0];
    }

    // Initialize Auth
    getAuth(firebaseApp);
  }
  return firebaseApp;
}
