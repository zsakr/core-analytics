import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBUHBbrckrtj5zdd2asnCuCVMaq1a8m-c",
  authDomain: "core-analytics-ai-ff40e.firebaseapp.com",
  projectId: "core-analytics-ai-ff40e",
  storageBucket: "core-analytics-ai-ff40e.firebasestorage.app",
  messagingSenderId: "487617706713",
  appId: "1:487617706713:web:2e7a41a8723452b139cc8",
  measurementId: "G-5XDQL0L5C8"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Set language and persistence
auth.useDeviceLanguage();

// Configure Auth persistence
auth.setPersistence(browserLocalPersistence);

// Export action code settings for email verification
export const actionCodeSettings = {
  url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/verify-email`,
  handleCodeInApp: true
};
