import React, { useState, useCallback, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignInForm.css";
import { userGoogleSignIn, userSignIn } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";

export default function SignInForm() {
  const history = useHistory();
  const currentUser = useContext(UserContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
      e.preventDefault();
      // console.log(e);
      // const { email, password } = e.target.elements;
      // console.log(email.value);
      // console.log(password.value);
      console.log(input.email, input.password)
      try {
        let res = await userSignIn(input.email, input.password);
        //  console.log(res)
        if (res === null) {
          setErrorMessage("");
          history.push("/dashboard");
        } else {
          setErrorMessage("Wrong email or password. Please try again");
          setInput({
            email: "",
            password: "",
          });
        }
      } catch (error) {
        alert(error);
      }
    }
  ;

  const signInGoogle = async (e) => {
      try {
        let res = await userGoogleSignIn();
        if (res === null) {
          // console.log(currentUser);
          history.push("/dashboard");
        }
      } catch (error) {
        alert(error);
      }
    }
  

  // if (currentUser) {
  //   console.log(Object.keys(currentUser));
  // }

  // if (currentUser.uid) {
  //   history.push("/dashboard");
  // }

  return (
    <div className="newForm three-d">
      <form onSubmit={signIn}>
        <label htmlFor="Email"></label>
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          placeholder="Email"
        />{" "}
        <label htmlFor="Password"></label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          placeholder="Password"
        />{" "}
        <button type="submit" className="Login">
          Sign In
        </button>
        <div className="divider"></div>
        <p>{errorMessage}</p>
      </form>
      <button type="button" className="pg-button" onClick={signInGoogle}>
        Sign In with Google
      </button>
      <div className="divider"></div>
      <div className="divider"></div>
      <Link to="/signup">
        <button type="button" className="Login">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
