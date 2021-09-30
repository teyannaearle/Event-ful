import React, { useCallback, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import { userSignUp } from "../Services/Firebase";

export default function SignUp() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });
// console.log(input.userName)
console.log(input.email)
// console.log(input.password)

const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: [e.target.value] });
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      setErrorMessage(null);
      //   const { userName, email, password } = event.target.elements;
      console.log(`Here is your input.email: ${input.email}`);
    //   try {
    //     let res = await userSignUp(input.userName, input.email, input.password);
    //     if (res === null) {
    //       //   history.push("/dashboard");
    //       console.log("great success");
    //     } else {
    //       setErrorMessage("please enter all required info");
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    },
    [history]
  );

  return (
    <div className="three-d">
      <form onSubmit={handleSignUp}>
        <h1>Sign up for Event(ful) Here!</h1>
        <label htmlFor="userName">Please Enter Your Name</label> <br />
        <input
          type="text"
          name="userName"
          value={input.userName}
          onChange={handleChange}
        
          placeholder="Name"
        />{" "}
        <br />
        <label htmlFor="Email">Please Enter your Email</label> <br />
        <input
          type="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          
          placeholder="Email"
        />
        <br />
        <label htmlFor="PassWord">Select a Password</label> <br />
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
         
          placeholder="Password"
        />{" "}
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
}
