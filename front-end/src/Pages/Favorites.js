import React from "react";
import FavoriteList from "../Components/Favorites/FavoriteList";
import Loading from "../Components/Loading";
import NavBar from "../Components/NavBar/NavBar";

export default function Favorites({ user_id, formattedName }) {
  return (
    <>
      <NavBar />
      <div className="page fave-page">
        {user_id ? (
          <>
            <h1 className="pg-head">{`${formattedName}'s Favorites`}</h1>
            <FavoriteList user_id={user_id} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
