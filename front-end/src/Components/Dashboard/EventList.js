import React from "react";
import Event from "./Event";
import { Link } from "react-router-dom";

function EventList({ events, deleteEvent }) {
  return (
    <>
      <ul className={`dash-events ${events.length <= 3 ? "inital-box" : null}`}>
        <span className="dash-event new-sq">
          <Link to={`/dashboard/new_event`} className="new-event">
            <p id="new">Create a new event and start planning! </p>
            <p className="plus-sign"> &#x002B;</p>
          </Link>
        </span>
        {events
          ? events.map((event) => {
              return (
                <li key={event.event_id} className="dash-event">
                  <Event event={event} deleteEvent={deleteEvent} />
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}

export default EventList;
