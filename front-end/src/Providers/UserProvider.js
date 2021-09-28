import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Services/Firebase";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("onAuthStateChanged")
      console.log(user)
      if (user) {
        console.log(user);
        history.push("/dashboard");
            const {email, displayName, photoURL, phoneNumber, uid} = user
            setUser({
              email,
              displayName,
              photoURL,
              phoneNumber,
              uid
         })
      } else {
        setUser(null);
      }
    });
  }, [history]);

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};
