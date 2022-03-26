import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Services/Firebase";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setCurrentUser(loggedInUser);
      } else {
        setCurrentUser(null);
      }
    });
  }, [history]);

  // useEffect(() => {
  //   (async () => {
  //     if (currentUser) {
  //       const email = currentUser.email;
  //       let checkUser = await axios.get(`${API}/users/${email}`);
  //       if (checkUser.data.success) {
  //         currentUser.user_id = checkUser.data.payload.user_id;
  //       }
  //     }
  //   })();
  // }, [currentUser]);

  return (
    <UserContext.Provider value={{currentUser}}>{children}</UserContext.Provider>
  );
};
