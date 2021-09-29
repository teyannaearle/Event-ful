import React, { useCallback, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignInForm.css";
import { userGoogleSignIn, userSignIn } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";

export default function SignInForm() {
  const history = useHistory();
  const currentUser = useContext(UserContext);


  const signIn = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(e);
      const { email, password } = e.target.elements;
      // console.log(email.value);
      // console.log(password.value);
      try {
        await userSignIn(email.value, password.value);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

 const signInGoogle = useCallback(
    async (e) => {
      try {
        await userGoogleSignIn();
console.log(`Google sign in, line 32`)
console.log(currentUser)
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  // if (currentUser) {
  //   console.log(Object.keys(currentUser));
  // }

  // if (currentUser.uid) {
  //   history.push("/dashboard");
  // }

  return (
    <div className="newForm">
      <form onSubmit={signIn}>
        <label htmlFor="Email"></label>
        <input type="email" name="email" placeholder="Email" /> <br />
        <label htmlFor="Password"></label>
        <input type="password" name="password" placeholder="Password" /> <br />
        <button type="submit" className="Login">
          Sign In
        </button>
        <br />
        <div className="divider"></div>
        <br />
      </form>
      <button type="button" className="Login" onClick={signInGoogle}>
        Sign In with Google
      </button>
      <Link to="/SignUp">
        <button type="button">Sign Up</button>
      </Link>
    </div>
  );
}
