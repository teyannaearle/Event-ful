import React, { useContext } from "react";
import EventList from "../Components/Dashboard/EventList";
import { UserContext } from "../Providers/UserProvider";

export default function Dashboard({ user_id, name }) {
  const user = useContext(UserContext)
  console.log(user)
  return (
    <div className="page">
      <h1 className="pg-head">{name}'s Dashboard </h1>
      <div className="dash-container three-d">
        <EventList user_id={user_id} />
      </div>
    </div>
  );
}
