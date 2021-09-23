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
        {events.map((event) => {
          return (
            <li key={event.event_id} className="dash-event">
              <Event event={event} user_id={user_id} />
            </li>
          );
        })}
        <Link to={`/dashboard/new_event`} className="dash-event new-event" >

        <h2 id="new-event">Create a new event and start planning! </h2>
         <p className="plus-sign"> 	&#x002B;</p>

        </Link>
      </ul>
    </>
  );
}

export default EventList;
