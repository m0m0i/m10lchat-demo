import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import {
  Auth,
  AuthError,
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIRESTORE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIRESTORE,
  databaseURL: process.env.REACT_APP_DATABASE_URL_FIRESTORE,
  projectId: process.env.REACT_APP_PROJECT_ID_FIRESTORE,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIRESTORE,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIRESTORE,
  appId: process.env.REACT_APP_APP_ID_FIRESTORE,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_FIRESTORE,
};

// Initialize Firebase app
if (typeof window !== "undefined" && !getApps().length) {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  getAnalytics(app);
}

// Export Firebase auth Sign in/out methods
export const auth: Auth = getAuth();
auth.useDeviceLanguage();

const gAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
gAuthProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = async (): Promise<UserCredential | void> => {
  try {
    await signInWithPopup(auth, gAuthProvider);
  } catch (error) {
    console.log((error as AuthError).message);
  }
};

export const signOut = (): Promise<void> =>
  auth.signOut().catch((error) => console.log(error));

// Export Firestore component
export const db: Firestore = getFirestore();
