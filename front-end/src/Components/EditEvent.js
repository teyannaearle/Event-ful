import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import "./EditEvent.css";

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
    catering: false,
    djs: false,
    musicians: false,
    photographers: false,
    party_rental: false,
    videographers: false,
    venues: false,
    balloons: false,
    floral: false,
    party_magician: false,
    party_characters: false,
    party_clown: false,
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
      <form className="edit-eventform" onSubmit={handleSubmit}>
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

        <span className="checkbox-span">
          <label className="check-container edit-checkbox">
            <input
              value="catering"
              type="checkbox"
              checked={checklist["catering"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category">Caterer</span>
          </label>

          <label className="check-container edit-checkbox">
            <input
              value="dj"
              type="checkbox"
              checked={checklist["Djs"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category">DJ</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="musician"
              type="checkbox"
              checked={checklist["Musician"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Musician</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="photographer"
              type="checkbox"
              checked={checklist["photographer"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Photographer</span>
          </label>

          <label className="check-container edit-checkbox">
            <input
              value="party_rental"
              type="checkbox"
              checked={checklist["party_rental"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Party Rental</span>
          </label>

          <label className="check-container edit-checkbox">
            <input
              value="videographer"
              type="checkbox"
              checked={checklist["Videographer"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Videographer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="venue"
              type="checkbox"
              checked={checklist["Venue"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Venues</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="balloons"
              type="checkbox"
              checked={checklist["Balloons"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Balloon Services</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="floral"
              type="checkbox"
              checked={checklist["floral"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Floral Designer</span>
          </label>

          <label className="check-container edit-checkbox">
            <input
              value="party_magician"
              type="checkbox"
              checked={checklist["party_magician"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Magician</span>
          </label>

          <label className="check-container edit-checkbox">
            <input
              value="party_characters"
              type="checkbox"
              checked={checklist["party_characters"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Character Actors</span>
          </label>

          <label className="check-container edit-checkbox">
            <input
              value="party_clown"
              type="checkbox"
              checked={checklist["party_clown"]}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Clowns</span>
          </label>
        </span>
        <button className="pg-buttons">Save Changes</button>
        <Link to={`/dashboard/${user_id}`}>
          <button className="pg-buttons">Cancel Edit</button>
        </Link>
      </form>
    </div>
  );
}

export default EditEvent;
