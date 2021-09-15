import React from "react";
import { Link } from "react-router-dom";

function Event({ event, user_id, event_id }) {
  return (
    <div>
      <Link to={`/event/${user_id}/${event_id}`}>
        <h2>{event.event_name}</h2>
      </Link>
    </div>
  );
}

export default Event;
