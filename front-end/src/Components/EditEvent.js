import React from "react";
import axios from "axios";
import { apiURL } from "../util/apiURL";

function EditEvent() {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="event_name">Event</label>
      <input
        id="event_name"
        type="text"
        value={myEvent.name}
        placeholder="Edit name"
        onChange={handleChange}
      />
      <label htmlFor="event_budget">Budget</label>
      <input
        id="event_budget"
        type="text"
        value={myEvent.budget}
        placeholder="$0.00"
        onChange={handleChange}
      />
      <label htmlFor="event_time">Time</label>
      <input
        id="event_time"
        type="text"
        value={myEvent.time}
        placeholder="Event Time"
        onChange={handleChange}
      />
      <label htmlFor="event_date">Date</label>
      <input
        id="event_date"
        type="text"
        value={myEvent.date}
        placeholder="Event Date"
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
