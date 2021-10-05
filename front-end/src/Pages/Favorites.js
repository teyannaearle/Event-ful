import React, { useContext } from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";
import { UserContext } from "../Providers/UserProvider";
import Loading from "../Components/Loading";

export default function Favorites() {
  const loggedInUser = useContext(UserContext);
  const user_id = loggedInUser ? loggedInUser.user_id : null;
  const formattedName = loggedInUser
    ? loggedInUser.displayName.split(" ")[0][0].toUpperCase() +
      loggedInUser.displayName.split(" ")[0].substring(1)
    : "default name";

  return (
    <div className="page fave-page">
      {user_id ? (
        <>
          <h1 className="pg-head">
            {loggedInUser && `${formattedName}'s Favorites`}
          </h1>
          <FavoriteList />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
