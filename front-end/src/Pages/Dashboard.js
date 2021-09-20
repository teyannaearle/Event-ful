import React from "react";
import EventList from "../Components/EventList";

export default function Dashboard({user_id}) {
  return (
    <div className="page dash-container three-d">
      <EventList user_id={user_id} />
    </div>
  );
}
