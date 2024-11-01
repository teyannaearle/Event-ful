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

export const auth = getAuth();

export const userSignUp = async (display_name, email, password) => {
  let result = null;
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        updateProfile(userCred.user, userCred.user.displayName = display_name)
        result = userCred.user;
        sessionStorage.setItem("loggedIn", true);
      }
    );
  } catch (error) {
    result = error.code;
  }
  return result;
};

export const userSignIn = async (email, password) => {
  let result = null;
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        result = userCred.user;
        sessionStorage.setItem("loggedIn", true);
      }
    );
  } catch (e) {
    result = e.code;
  }
  return result;
};

export const userGoogleSignIn = async () => {
  const googleProvider = new GoogleAuthProvider();
  let result = null;

  try {
    await signInWithPopup(auth, googleProvider).then((userCred) => {
      result = userCred.user;
      sessionStorage.setItem("loggedIn", true);
    });
  } catch (error) {
    result = error.code;
  }
  return result;
};

export const userSignOut = async () => {
  let result = null;
  try {
    await signOut(auth).then(() => {
      sessionStorage.setItem("loggedIn", false);
    });
  } catch (e) {
    result = e.code;
    console.warn(e.message);
  }
  return result;
};
