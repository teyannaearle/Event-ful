import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../Services/Firebase";
import { apiURL } from "../util/apiURL";
import axios from "axios";
import Loading from "../Components/Loading";

const API = apiURL();
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true)
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      console.log("onAuthStateChanged");
      console.log("!!!!!!!!!!!")
      console.log(loggedInUser)
      if (loggedInUser) {
        console.log(`User provider current user is ${loggedInUser.email}`);
        setCurrentUser(loggedInUser);
      } else {
        setCurrentUser(null);
      }
    });
  }, [history]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const email = currentUser.email;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          currentUser.user_id = checkUser.data.payload.user_id;
          setPending(false)
        }
      }
    })();
    return () => {
      // cleanup
      // setUserId(null)
    };
  }, [currentUser]);

  if (pending) {
    return <Loading />;
};

  console.log("current user");
  console.log(currentUser);
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
};
