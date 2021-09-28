import React from "react";
import { Link } from "react-router-dom";
import CapitalizeEvent from "../CapitalizeEvent";

function Event({ event, user_id, handleDelete }) {
  return (
    <div className="event-sq">
      <Link to={`/event/${event.event_id}`}>
        <p className="plan-ev">
          &#x261E;Plan {CapitalizeEvent(event.event_name)}
        </p>
      </Link>
      <span className="ed-but">
        <Link to={`/dashboard/${user_id}/edit`}>
          <button className="pg-buttons edit-ev">Edit Event Details</button>
        </Link>
        <button
          onClick={() => handleDelete(event.event_id)}
          className="pg-buttons edit-ev"
        >
          Delete Event
        </button>
      </span>
    </div>
  );
}

export default Event;
