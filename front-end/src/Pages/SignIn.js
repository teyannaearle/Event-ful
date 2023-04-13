import React from "react";
import SignInForm from "../Components/Landing/SignInForm";

export default function SignIn({setUserId}) {
  return (
    <div className="Landing-Container signIn-container">
      <SignInForm setUserId={setUserId} />
    </div>
  );
}
