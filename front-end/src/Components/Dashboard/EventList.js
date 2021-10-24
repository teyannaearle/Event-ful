import React from "react";
import Event from "./Event";

function EventList({ events, deleteEvent }) {
  return (
    <>
      <div className="dash-container">
        <p className="new"> ( Events ) </p>

        {events[0] ? null : (
          <h2> No Existing Events. Create one above to begin planning ! </h2>
        )}
        <div className="dash-containers">
          <ul
            className={`${
              events.length === 1
                ? "one-event"
                : events.length === 2
                ? "two-event"
                : "dash-events"
            } `}
          >
            {events
              ? events.map((event) => {
                  return (
                    <li key={event.event_id} className="dash-event drop">
                      <Event event={event} deleteEvent={deleteEvent} />
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default EventList;
