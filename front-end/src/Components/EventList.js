import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Event from "./Event";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../util/apiURL";

const API = apiURL();

function EventList() {
  const [events, setEvents] = useState([]);
  const { user_id } = useParams();

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
    <div>
      <ul>
        {events.map((event) => {
          return (
            <li key={event.user_id}>
              <Event event={event} />
            </li>
          );
        })}
      </ul>
      <Link to={`${API}/events/${user_id}/new`}>
        <button>New Event Form</button>
      </Link>
    </div>
  );
}

export default EventList;
