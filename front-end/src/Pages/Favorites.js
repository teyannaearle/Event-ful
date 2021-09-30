import React, { useContext } from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";
import { UserContext } from "../Providers/UserProvider";


export default function Favorites({ user_id, name }) {
  const user = useContext(UserContext);
  if (user) {
    console.log(`Favorites user is ${user.displayName}`)
  }

  return (
    <div className="page">
      <h1 className="pg-head">{name}'s Favorites</h1>
      <FavoriteList user_id={user_id} />
    </div>
  );
}
