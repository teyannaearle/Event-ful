import React from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";
import Loading from "../Components/Loading";

export default function Favorites({ user_id, formattedName }) {
  return (
    <div className="page fave-page">
      {user_id ? (
        <>
          <h1 className="pg-head">{`${formattedName}'s Favorites`}</h1>
          <FavoriteList />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
