import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import "./SignInForm.css";
import { userGoogleSignIn, userSignIn } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";
import axios from "axios";
import { apiURL } from "../util/apiURL";

const API = apiURL();

function SignInForm() {
  const history = useHistory();
  const loggedInUser = useContext(UserContext);
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
  };

  const signInGoogle = async (e) => {
    try {
      let res = await userGoogleSignIn();
      if (res.email) {
        const { email } = res;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          history.push("/dashboard");
        } else {
          const newUser = { email: res.email, password: "password" };
          let result = await axios.post(`${API}/users`, newUser);
          if (result.data.success) {
            history.push("/dashboard");
          } else {
            console.warn("could not add new user to backend database");
          }
        }
      } else {
        console.warn("Google user could not sign in");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="SignIn-Form ">
      <p> &nbsp; </p>
      <div className=" newForm three-d">
        &nbsp;
        <form onSubmit={signIn}>
          <label htmlFor="Email">Please Enter your Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="Email"
          />{" "}
          <label htmlFor="Password">Please Enter Your Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            placeholder="Password"
          />{" "}
          <button type="submit" className="Login pg-buttons">
            Sign In
          </button>
          <div className="divider"></div>
          <p>{errorMessage}</p>
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
          <p>
            {" "}
            Dont have an account? <br />
            Click Here to make one!
          </p>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(SignInForm);
