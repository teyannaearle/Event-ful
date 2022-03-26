import React from "react";
import SignInForm from "../Components/Landing/SignInForm";

export default function SignIn({getId}) {
  return (
    <div className="Landing-Container signIn-container">
      <SignInForm getId={getId} />
    </div>
  );
}
