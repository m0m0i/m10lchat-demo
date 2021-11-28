import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_POJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (typeof window !== "undefined" && !getApps().length) {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const analytics: Analytics = getAnalytics(app);
}

const auth: Auth = getAuth();

const gAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
gAuthProvider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = (): Promise<UserCredential> =>
  signInWithPopup(auth, gAuthProvider);

const signOut = (): Promise<void> =>
  auth.signOut().then(() => window.location.reload());

export { auth, signInWithGoogle, signOut };
