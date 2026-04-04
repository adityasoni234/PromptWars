import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnagEaSHpU6at1mf3PjqmM7odW8KqwpBM",
  authDomain: "promptwars-7a808.firebaseapp.com",
  projectId: "promptwars-7a808",
  storageBucket: "promptwars-7a808.firebasestorage.app",
  messagingSenderId: "309698863092",
  appId: "1:309698863092:web:42c271e532a29bdeeb63a1",
  measurementId: "G-VGEN3WL78X"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
