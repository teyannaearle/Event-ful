import React, { useContext } from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";
import { UserContext } from "../Providers/UserProvider";

export default function Favorites() {
  const loggedInUser = useContext(UserContext);
  const formattedName = loggedInUser
    ? loggedInUser.displayName.split(" ")[0][0].toUpperCase() +
      loggedInUser.displayName.split(" ")[0].substring(1)
    : "default name";

  return (
    <div className="page fave-page">
      <h1 className="pg-head">{loggedInUser && `${formattedName}'s Favorites`}</h1>
      <FavoriteList />
    </div>
  );
}
