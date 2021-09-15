import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../util/firebase";
import { AuthContext } from "./Auth";
import firebase from "firebase";

const Login = ({ history }) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider);
  };

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    //   console.log(currentUser.email)
    return <Redirect to="/" />;
  }
  console.log(currentUser);

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email <input type="email" name="email" placeholder="email" />
        </label>
        <label>
          Password{" "}
          <input type="password" name="password" placeholder="password" />
        </label>
        <button type="submit">Log in</button>
      </form>
      <button onClick={authWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default withRouter(Login);
