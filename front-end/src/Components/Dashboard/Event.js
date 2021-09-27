import React from "react";
import { Link } from "react-router-dom";
import CapitalizeEvent from "../CapitalizeEvent";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { useState, useEffect } from "react";

const API = apiURL();

function Event({ history, event, user_id }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/events/${user_id}/${event.event_id}`)
      .then(
        (res) => {
          console.log(res.data);
          setEvents(res.data.payload.event_id);
        },
        (error) => {
          history.push("/not-found");
        }
      )
      .catch((c) => console.warn("catch", c));
  }, [history, event.event_id]);

  const handleDelete = () => {
    axios
      .delete(`${API}/events/${user_id}/${event.event_id}`)
      .then(
        () => history.push("/dashboard"),
        (error) => console.warn(error)
      )
      .catch((c) => console.error(c));
  };

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
        <button onClick={handleDelete} className="pg-buttons edit-ev">
          Delete Event
        </button>
      </span>
    </div>
  );
}

export default Event;
