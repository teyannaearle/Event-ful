import React from "react";
import { Link } from "react-router-dom";
import CapitalizeEvent from "../CapitalizeEvent";

function Event({ event, handleDelete }) {
  const emoji = () => {
    let item = "";
    const name = event.event_name.toLowerCase();
    if (name.includes("baby" || "babies")) {
      item = <>&#128118;</>;
    } else if (name.includes("birthday" || "surprise")) {
      item = <>&#129395;</>;
    } else if (name.includes("retire")) {
      item = <>&#127870;</>;
    } else if (name.includes("new")) {
      item = <>&#127879;</>;
    } else if (name.includes("holiday" || "christmas")) {
      item = <>&#65039;</>;
    } else if (name.includes("halloween")) {
      item = <>&#127875;</>;
    } else {
      item = <>&#127882;</>;
    }

    return item;
  };

  return (
    <div className="event-sq">
      <button onClick={() => handleDelete(event.event_id)} className="del-but">
        &#x2718;
      </button>
      <h2>
        {" "}
        {emoji()} {CapitalizeEvent(event.event_name)}{" "}
      </h2>
      <Link to={`/event/${event.event_id}`} className="pg-buttons plan">
        <span> Let's plan ! </span>
      </Link>
      <span className="ed-but">
        <Link to={`/dashboard/${event.event_id}/edit`}>Edit Event Details</Link>
      </span>
    </div>
  );
}

export default Event;
