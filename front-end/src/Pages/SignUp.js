import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import { userSignUp } from "../Services/Firebase";
import axios from "axios";
import { apiURL } from "../util/apiURL";

const API = apiURL();

export default function SignUp() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      let res = await userSignUp(input.userName, input.email, input.password);
      if (res === null) {
        const newUser = { email: input.email, password: input.password };
        let result = await axios.post(`${API}/users`, newUser);
        console.log(result);
        if (result.data.success) {
          history.push("/dashboard");
        } else {
          console.warn("could not add new user to backend database");
        }
      } else {
        setErrorMessage("please enter all required info");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Landing-Container">
      <div className="SignUp-Form">
        <div className="Container three-d">
          <form onSubmit={handleSignUp}>
            <h1>Sign up Here!</h1>
            <label htmlFor="userName">Please Enter Your Name</label> <br />
            <input
              type="text"
              id="userName"
              value={input.userName}
              onChange={handleChange}
              placeholder="Name"
            />{" "}
            <br />
            <label htmlFor="Email">Please Enter your Email</label> <br />
            <input
              type="email"
              id="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <br />
            <label htmlFor="PassWord">
              Select a Password (min 6 characters)
            </label>{" "}
            <br />
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
            />{" "}
            <br />
            <button type="submit" className="pg-buttons">
              Sign Up
            </button>
          </form>
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}
