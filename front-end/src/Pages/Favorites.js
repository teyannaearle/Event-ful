import React, { useContext } from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";
import { UserContext } from "../Providers/UserProvider";

export default function Favorites({ userName }) {
  const user = useContext(UserContext);
  if (user) {
    console.log(`Favorites user is ${user.displayName}`);
  }

  return (
    <div className="page fave-page">
      <h1 className="pg-head">{userName && `${userName}'s Favorites'`}</h1>
      <FavoriteList />
    </div>
  );
}
