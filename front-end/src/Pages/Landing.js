import React, { useContext } from "react";
import app from "../util/firebase";
import { AuthContext } from "../Components/Auth";

export default function Landing() {
  const { currentUser } = useContext(AuthContext);
  console.log(JSON.stringify(currentUser));

  return (
    <div>
      <h1>EVENT(FUL)</h1>
      <h3>Landing page</h3>

      {currentUser && (
        <>
          <p>Hello, {currentUser.displayName}</p>
          <p>email: {currentUser.email}</p>

          {currentUser.photoURL && (<img
            src={currentUser.photoURL}
            width="100"
            height="100"
            alt="avatar"
          />)}
        </>
      )}
      <br />

      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
}
