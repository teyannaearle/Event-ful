import React, { useCallback, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import { userSignUp } from "../Services/Firebase";

export default function SignUp() {
  const history = useHistory();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();

      const { email, password } = event.target.elements;
      await userSignUp(email.value, password.value);
      try {
        await userSignUp(email.value, password.value);

        // history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="Container">
      <form onSubmit={handleSignUp}>
        {/* <h1>Sign up for Event(ful) Here!</h1> */}
        {/* <label htmlFor="FullName">Please Enter Your Full Name</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Full Name"/> <br/>
               <br/>

               <label htmlFor="UserName">Select a Username</label> <br/>
               <input 
               type="text" 
               value="" 
               placeholder="Username"/> <br/>
               <br/> */}
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
    </div>
  );
}
