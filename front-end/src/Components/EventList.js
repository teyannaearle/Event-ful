import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Event from "./Event";
import { apiURL } from "../util/apiURL";

const API = apiURL();

function EventList({ match }) {
  const [events, setEvents] = useState([]);
  const { user_id } = match.params;

  useEffect(() => {
    axios
      .get(`${API}/events/${user_id}`)
      .then(
        (res) => {
          setEvents(res.data);
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
    <ul>
      {events.map((event) => {
        return (
          <li key={event.user_id}>
            <Event event={event} />
          </li>
        );
      })}
    </ul>
  );
}

export default EventList;
