import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
// import "firebase/auth";\import firebase from "firebase/compat/app";
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
      // console.log('logged in with google')
      // console.log(userCredential);
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(userCredential);
      // const token = credential.accessToken;
      // The signed-in user info.
      result = userCredential.user;
      // ...
    });
  } catch (e) {
    // {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    result = e.code;
  }
  // console.log(result)
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
