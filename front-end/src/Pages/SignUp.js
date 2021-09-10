import React from "react";
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="SignUp_Form">
      <form className="Container">
        <h1>Sign up for Event(ful) Here!</h1>
        <label htmlFor="FullName">Please Enter Your Full Name</label> <br />
        <input type="text" value="" placeholder="Full Name" /> <br />
        <br />
        <label htmlFor="UserName">Select a Username</label> <br />
        <input type="text" value="" placeholder="Username" /> <br />
        <br />
        <label htmlFor="PassWord">Select a Password</label> <br />
        <input type="text" value="" placeholder="Password" /> <br />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
