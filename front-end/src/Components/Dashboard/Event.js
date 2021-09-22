import React from "react";
import { Link } from "react-router-dom";

function Event({ event, user_id }) {
  return (
    <div className="event-sq">
      <Link to={`/event/${event.event_id}`}>
        <h2 >Plan {event.event_name}</h2>
      </Link>
      <Link to={`/dashboard/${user_id}/edit`}>
        <button className="pg-buttons edit-ev">Edit {event.event_name} Details</button>
      </Link>
    </div>
  );
}

export default Event;
