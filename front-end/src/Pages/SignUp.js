import React, { useCallback, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import { userSignUp } from "../Services/Firebase";

export default function SignUp() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      setErrorMessage(null);
      const { userName, email, password } = event.target.elements;
      //   await userSignUp(userName.value, email.value, password.value);
      try {
        let res = await userSignUp(userName.value, email.value, password.value);
        if (res === null) {
          history.push("/dashboard");
        } else {
          setErrorMessage("please enter all required info");
        }
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="three-d">
      <form onSubmit={handleSignUp}>
        <h1>Sign up for Event(ful) Here!</h1>
        <label htmlFor="userName">Please Enter Your Name</label> <br />
        <input type="text" name="userName" placeholder="Name" /> <br />
        <br />
        {/* <label htmlFor="UserName">Select a Username</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Username"/> <br/> */}
        <br />
        <label htmlFor="Email">Please Enter your Email</label> <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <br />
        <label htmlFor="PassWord">Select a Password</label> <br />
        <input type="password" name="password" placeholder="Password" /> <br />
        <br />
        {/* <Link to="/dashboard"> */}
        <button type="submit">Sign Up</button>
        {/* </Link> */}
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}
