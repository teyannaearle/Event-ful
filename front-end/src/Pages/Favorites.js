import React from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";

export default function Favorites({ user_id, name }) {
  return (
    <div className="page">
      <h1 className="pg-head">{name}'s Favorites</h1>
      <FavoriteList user_id={user_id} />
    </div>
  );
}
