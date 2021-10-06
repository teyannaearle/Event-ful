import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";

dotenv.config();

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth();

export const userSignUp = async (userName, email, password) => {
  let result = null;
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        updateProfile(userCredential.user, { displayName: userName });
      }
    );
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userSignIn = async (email, password) => {
  let result = null;
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        console.log(`${userCredential.user.displayName} is signed in`);
      }
    );
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userGoogleSignIn = async () => {
  let result = null;
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider).then((userCredential) => {
      result = userCredential.user;
    });
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userSignOut = async () => {
  let result = null;
  try {
    await signOut(auth).then(() => {
      console.log("user signed out");
    });
  } catch (e) {
    result = e.code;
    console.warn(e.message);
  }
  return result;
};
