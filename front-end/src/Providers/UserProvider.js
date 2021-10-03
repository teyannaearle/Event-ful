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
      if (loggedInUser) {
        // history.push("/dashboard");
        console.log(`User provider current user is ${loggedInUser.email}`)
        setCurrentUser(loggedInUser);
      } else {
        // history.push("/signin")
        setCurrentUser(null);
      }
    });
  }, [history]);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
