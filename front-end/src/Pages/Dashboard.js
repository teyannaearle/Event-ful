import React from "react";
import EventList from "../Components/Dashboard/EventList";

export default function Dashboard({ user_id, name }) {
  return (
    <div className="page">
      <h1 className="pg-head">{name}'s Dashboard </h1>
      <div className="dash-container three-d">
        <EventList user_id={user_id} />
      </div>
    </div>
  );
}
