import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCnagEaSHpU6at1mf3PjqmM7odW8KqwpBM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "promptwars-7a808.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "promptwars-7a808",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "promptwars-7a808.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "309698863092",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:309698863092:web:42c271e532a29bdeeb63a1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VGEN3WL78X"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
