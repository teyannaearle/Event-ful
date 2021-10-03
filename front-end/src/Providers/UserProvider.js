import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Services/Firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      console.log("onAuthStateChanged")
      // console.log(`userprovider line 14, user is ${user}`)
      // console.log(Object.keys(user))
      console.log(`User provider current user is ${loggedInUser}`)
      if (loggedInUser) {
        // history.push("/dashboard");
        setCurrentUser(loggedInUser);
      } else {
        // history.push("/signin")
        setCurrentUser(null);
      }
    });
  }, [history]);
console.log(`user provider currentUser ${currentUser}`)
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
