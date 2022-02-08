/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase app
if (typeof window !== "undefined" && !getApps().length) {
  // eslint-disable-next-line
  const app: FirebaseApp = initializeApp(firebaseConfig);
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
