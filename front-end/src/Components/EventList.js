import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Event from "./Event";
import api from "../util/apiCalls"; // edit after backend/database is created

const API = api; //Edit when database for events is created

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/events`)
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
  }, []);

  return (
    <ul>
      {events.map((event) => {
        return (
          <li key={event.id}>
            <Event event={event} />
          </li>
        );
      })}
    </ul>
  );
}

export default EventList;
