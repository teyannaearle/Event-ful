import React from "react";
// import "./Event.css";
import { Link } from "react-router-dom";

function Event({ event, user_id }) {
  return (
    <div>
      <Link to={`/event/${event.event_id}`}>
        <h2>{event.event_name}</h2>
      </Link>
      <Link to={`/dashboard/${user_id}/edit`}>
        <button>Edit {event.event_name}</button>
      </Link>
    </div>
  );
}

export default Event;
