import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { userGoogleSignIn, userSignIn } from "../../Services/Firebase";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { ToastContainer, toast } from "react-toastify";
import "./SignInForm.css";

const API = apiURL();

function SignInForm({setUserId}) {
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      let res = await userSignIn(input.email, input.password);
      if (res.email) {
        const { email, accessToken } = res;
        try {
          await axios
            .get(`${API}/users/${email}`, {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            })
            .then((res) => {
              if (res.data.success) {
                setUserId(res.data.payload.user_id)
                history.push("/dashboard");
              } else {
                toast.error("Error: Something Went Wrong. Please try again", {
                  toastId: "customId",
                });
                setInput({
                  email: "",
                  password: "",
                });
              }
            });
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error("Error: Wrong email or password. Please try again", {
          toastId: "customId",
        });
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
      if (res.email) {
        const { email, accessToken, displayName } = res;
        try {
          await axios
            .get(`${API}/users/${email}`, {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            })
            .then((res) => {
              if (res.data.success) {
                setUserId(res.data.payload.user_id)
                history.push("/dashboard");
              } else {
                signUp(email, accessToken, displayName);
              }
            });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const signUp = async (email, accessToken, displayName) => {
    let newUser = { email, displayName };
    try {
      await axios
        .post(`${API}/users/`, newUser, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setUserId(res.data.payload.user_id)
            history.push("/dashboard");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <div className="SignIn-Form ">
      <p> &nbsp; </p>
      <div className=" newForm three-d">
        &nbsp;
        <form onSubmit={signIn}>
          <span className="SignIn-Labels">
            <label htmlFor="Email">Please Enter Your Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />{" "}
            <label htmlFor="Password">Please Enter Your Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="off"
              required
            />{" "}
          </span>
          <button type="submit" className="Login pg-buttons">
            Sign In
          </button>
          <div className="divider"></div>
        </form>
        <button
          type="button"
          className="Login pg-buttons"
          onClick={signInGoogle}
        >
          Sign In with Google
        </button>
        <div className="divider"></div>
        <Link to="/SignUp" className="SignUp-But">
          <p> Dont have an account? Click Here to make one!</p>
        </Link>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}

export default withRouter(SignInForm);
