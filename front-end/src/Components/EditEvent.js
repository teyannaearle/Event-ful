import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import "./EditEvent.css"

const API = apiURL();

function EditEvent({ user_id }) {
  const { event_id } = useParams();

  const [event, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
  });

  const [checklist, setChecklist] = useState({
    djs: false,
    musicians: false,
    photographers: false,
    party_rental: false,
    videographers: false,
    venues: false,
    balloons: false,
    floral: false,
  });

  let history = useHistory();

  const updateEvent = (updatedEvent) => {
    axios
      .put(`${API}/events/${event_id}`, updatedEvent)
      .then(
        () => history.push(`/events/${event_id}`),
        (c) => console.warn("catch", c)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    updateEvent(event, event_id);
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setChecklist((prevState) => ({ ...prevState, [val]: !prevState[val] }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          id="event_name"
          type="text"
          required
          value={event.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          id="event_budget"
          type="number"
          required
          value={event.budget}
          placeholder="$0.00"
          onChange={handleChange}
        />
        <input
          id="appt-time"
          type="time"
          min="1:00"
          max="12:00"
          required
          value={event.time}
          placeholder="Time"
          onChange={handleChange}
        />
        <input
          id="event_date"
          type="date"
          required
          value={event.date}
          placeholder="Date"
          onChange={handleChange}
        />
        <label>
          DJs
          <input
            value="dj"
            type="checkbox"
            checked={checklist["Djs"]}
            onChange={toggleState}
          />
        </label>
        <label>
          Musicians
          <input
            value="musician"
            type="checkbox"
            checked={checklist["Musician"]}
            onChange={toggleState}
          />
        </label>
        <label>
          Photographer
          <input
            value="photographer"
            type="checkbox"
            checked={checklist["photographer"]}
            onChange={toggleState}
          />
        </label>
        <label>
          Videographer
          <input
            value="videographer"
            type="checkbox"
            checked={checklist["Videographer"]}
            onChange={toggleState}
          />
        </label>
        <label>
          Venue
          <input
            value="venue"
            type="checkbox"
            checked={checklist["Venue"]}
            onChange={toggleState}
          />
        </label>
        <label>
          Balloons
          <input
            value="balloons"
            type="checkbox"
            checked={checklist["Balloons"]}
            onChange={toggleState}
          />
        </label>
        <label>
          Floral
          <input
            value="floral"
            type="checkbox"
            checked={checklist["floral"]}
            onChange={toggleState}
          />
        </label>
        <button className="pg-buttons">Save Changes</button>
        <Link to={`/dashboard/${user_id}`}>
          <button className="pg-buttons">Cancel Edit</button>
        </Link>
      </form>
    </div>
  );
}

export default EditEvent;
