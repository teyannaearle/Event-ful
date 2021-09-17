import React, { useState } from "react";
import axios from "axios";
import { apiURL } from "../util/apiURL";

const API = apiURL();

function EditEvent() {
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

  const updateEvent = (updatedEvent) => {
    axios
      .put(`${API}/events/${event_id}`, updatedEvent)
      .then(
        () => history.push(`/events/${event_id}`),
        (e) => console.warn("catch", c)
      )
      .catch((c) => console.warn("catch, c"));
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    updateEvent(event, event_id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="event_name">Event</label>
      <input
        id="event_name"
        type="text"
        value={event.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <label htmlFor="event_budget">Budget</label>
      <input
        id="event_budget"
        type="number"
        value={event.budget}
        placeholder="$0.00"
        onChange={handleChange}
      />
      <label htmlFor="event_time">Time</label>
      <input
        id="event_time"
        type="text"
        value={event.time}
        placeholder="Time"
        onChange={handleChange}
      />
      <label htmlFor="event_date">Date</label>
      <input
        id="event_date"
        type="text"
        value={event.date}
        placeholder="Date"
        onChange={handleChange}
      />
      <label>
        DJs
        <input
          value="dj"
          type="checkbox"
          checked={state["Djs"]}
          onChange={toggleState}
        />
      </label>
      <label>
        Musicians
        <input
          value="musician"
          type="checkbox"
          checked={state["Musician"]}
          onChange={toggleState}
        />
      </label>
      <label>
        Photographer
        <input
          value="photographer"
          type="checkbox"
          checked={state["photographer"]}
          onChange={toggleState}
        />
      </label>
      <label>
        Videographer
        <input
          value="videographer"
          type="checkbox"
          checked={state["Videographer"]}
          onChange={toggleState}
        />
      </label>
      <label>
        Venue
        <input
          value="venue"
          type="checkbox"
          checked={state["Venue"]}
          onChange={toggleState}
        />
      </label>
      <label>
        Balloons
        <input
          value="balloons"
          type="checkbox"
          checked={state["Balloons"]}
          onChange={toggleState}
        />
      </label>
      <label>
        Floral
        <input
          value="floral"
          type="checkbox"
          checked={state["floral"]}
          onChange={toggleState}
        />
      </label>
      <button>Save Changes</button>
      <Link to={`/events/${user_id}`}>
        <button>Cancel Edit</button>
      </Link>
    </form>
  );
}

export default EditEvent;
