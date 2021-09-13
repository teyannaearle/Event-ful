// import React from "react";
// import "./SignUp.css";

// export default function SignUp() {
//   return (
//     <div className="SignUp_Form">
//       <form className="Container">
//         <h1>Sign up for Event(ful) Here!</h1>
//         <label htmlFor="FullName">Please Enter Your Full Name</label> <br />
//         <input type="text" value="" placeholder="Full Name" /> <br />
//         <br />
//         <label htmlFor="UserName">Select a Username</label> <br />
//         <input type="text" value="" placeholder="Username" /> <br />
//         <br />
//         <label htmlFor="PassWord">Select a Password</label> <br />
//         <input type="text" value="" placeholder="Password" /> <br />
//         <br />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }


import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../util/firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div lassName="SignUp_Form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className="Container">
        <label>
          Email <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password{" "}
          <input type="password" name="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
