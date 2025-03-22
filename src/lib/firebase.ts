import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// ✅ Firebase Configuration (Ensure Environment Variables are Set)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ✅ Initialize Firebase (Only Once)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Analytics: Use a Promise to Ensure It's Available
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      console.log("Logging analytics");
      analytics = getAnalytics(app);
    }
  });
}

// ✅ Export a Getter Function for Analytics
const getAnalyticsInstance = async (): Promise<Analytics | null> => {
  if (analytics) return analytics;
  const supported = await isSupported();
  return supported ? getAnalytics(app) : null;
};

export { db, getAnalyticsInstance };
