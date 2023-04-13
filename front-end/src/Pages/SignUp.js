import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { userSignUp } from "../Services/Firebase";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import { ToastContainer, toast } from "react-toastify";


const API = apiURL();

export default function SignUp({setUserId}) {
  const history = useHistory();
  const [input, setInput] = useState({
    display_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      let res = await userSignUp(input.display_name.trim(), input.email, input.password);
      if (res.email) {
        const { email, displayName, accessToken } = res;
        const newUser = { email, displayName, accessToken };
        let result = await axios.post(`${API}/users`, newUser, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        if (result.data.success) {
          setUserId(result.data.user_id)
          history.push("/dashboard");
        } else { 
          console.warn("could not add new user to backend database");
          toast.error("Error: Please try again later.", {
            toastId: "customId",
          });
        }
      } else if (res === "auth/email-already-in-use") {
        toast.error("Error: Email already in use.", {
          toastId: "customId",
        });
      } else {
        toast.error(
          "Error: Please review your information or try again later.",
          {
            toastId: "customId",
          }
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Landing-Container">
      <div className="SignIn-Form ">
        <p> &nbsp; </p>
        <div className="newForm three-d">
          &nbsp;
          <form onSubmit={handleSignUp}>
            <span className="SignIn-Labels">
              <label htmlFor="display_name">Please Enter Your Name</label>
              <input
                type="text"
                id="display_name"
                value={input.display_name}
                onChange={handleChange}
                placeholder="Name"
              />{" "}
              <label htmlFor="Email">Please Enter your Email</label>
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <label htmlFor="Password">
                Select a Password (min 6 characters)
              </label>{" "}
              <input
                type="password"
                id="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="off"
              />{" "}
            </span>
            <button type="submit" className="Login SignUp pg-buttons">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
