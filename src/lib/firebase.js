import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const env = import.meta.env;

const hasConfig = Boolean(
  env.VITE_FIREBASE_API_KEY &&
    env.VITE_FIREBASE_AUTH_DOMAIN &&
    env.VITE_FIREBASE_PROJECT_ID &&
    env.VITE_FIREBASE_APP_ID
);

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const app = hasConfig ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null;

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;