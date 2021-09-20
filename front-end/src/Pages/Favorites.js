import React from "react";
import FavoriteList from "../Components/FavoriteList";

export default function Favorites({user_id}) {
  return (
    <div>
      Favorites Page
      <FavoriteList user_id={user_id} />
    </div>
  );
}
