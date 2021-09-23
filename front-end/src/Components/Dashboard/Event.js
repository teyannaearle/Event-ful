import React from "react";
import { Link } from "react-router-dom";
import CapitalizeEvent from "../CapitalizeEvent";

function Event({ event, user_id }) {
  return (
    <div className="event-sq">
      <Link to={`/event/${event.event_id}`}>
        <h2>Plan {CapitalizeEvent(event.event_name)}</h2>
      </Link>
      <Link to={`/dashboard/${user_id}/edit`}>
        <button className="pg-buttons edit-ev">Edit {CapitalizeEvent(event.event_name)} Details</button>
      </Link>
    </div>
  );
}

export default Event;
