import React from "react";
import axios from "axios";
import { apiURL } from "../util/apiURL";

function EditEvent() {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="event_name">Event</label>
      <label htmlFor="event_budget">Budget</label>
      <label htmlFor="event_time">Time</label>
      <label htmlFor="event_date">Date</label>
      <button>Save Changes</button>
      <Link to={`/events/${user_id}`}>
        <button>Cancel Edit</button>
      </Link>
    </form>
  );
}

export default EditEvent;
