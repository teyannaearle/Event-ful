import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Event from "./Event";
import { Link } from "react-router-dom";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

function EventList({ user_id }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/events/${user_id}`)
      .then(
        (res) => {
          setEvents(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, [user_id]);

  return (
    <>
      <ul className="dash-events">
        <span className="dash-event new-sq">
      <Link to={`/dashboard/new_event`} className="new-event" >

<p id="new">Create a new event and start planning! </p>
 <p className="plus-sign"> 	&#x002B;</p>

</Link>
</span>
        {events.map((event) => {
          return (
            <li key={event.event_id} className="dash-event">
              <Event event={event} user_id={user_id} />
            </li>
          );
        })}

      </ul>
    </>
  );
}

export default EventList;
