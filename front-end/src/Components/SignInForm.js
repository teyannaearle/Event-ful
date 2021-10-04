import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignInForm.css";
import { userGoogleSignIn, userSignIn } from "../Services/Firebase";
// import { UserContext } from "../Providers/UserProvider";
import axios from "axios";
import { apiURL } from "../util/apiURL";

const API = apiURL();

export default function SignInForm() {
  const history = useHistory();
  // const currentUser = useContext(UserContext);
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
    try {
      let res = await userSignIn(input.email, input.password);
      //  console.log(res)
      if (res === null) {
        setErrorMessage("");
        history.push("/");
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
  };

  const signInGoogle = async (e) => {
    try {
      let res = await userGoogleSignIn();
      console.log("awaiting google sign in");
      console.log(res);
      if (res.email) {
        const { email } = res;
        let checkUser = await axios.get(`${API}/users/${email}`)
        console.log("checkUser");
        console.log(checkUser);
        if (checkUser.data.success) {
          history.push("/");
        } else {
          console.log("no such user found, creating new user");
          const newUser = { email: res.email, password: "password" };
          console.log(newUser)
          let result = await axios.post(`${API}/users`, newUser);
          console.log(result);
          if (result.data.success) {
            history.push("/dashboard");
          } else {
            console.log("could not add new user to backend database");
          }
        }
      } else {
        console.log("Google user could not sign in");
      }
    } catch (error) {
      console.log("caught an error");
      console.warn(error);
    }
  };

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
      <button type="button" className="Login" onClick={signInGoogle}>
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
