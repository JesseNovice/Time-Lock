import { initializeApp, getApps } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Firebase Configuration (Ensure Environment Variables are Set)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Log Firebase config (without sensitive data)
console.log("Initializing Firebase with project ID:", firebaseConfig.projectId);
console.log("Auth Domain:", firebaseConfig.authDomain);

// Initialize Firebase (Only Once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with settings
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: true, // This helps with CORS issues
  ignoreUndefinedProperties: true,
});

console.log("Firestore initialized with database:", (db as any)._databaseId?.projectId);

// Enable offline persistence
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("Firestore persistence enabled successfully");
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firebase persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('Firebase persistence not supported in this browser');
      }
      console.error("Persistence error details:", err);
    });
}

// Analytics: Use a Promise to Ensure It's Available
let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Analytics initialized successfully");
    } else {
      console.log("Analytics not supported in this environment");
    }
  });
}

// Export a Getter Function for Analytics
const getAnalyticsInstance = async (): Promise<Analytics | null> => {
  if (analytics) return analytics;
  const supported = await isSupported();
  return supported ? getAnalytics(app) : null;
};

export { db, getAnalyticsInstance };
