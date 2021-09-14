import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";

const API = apiURL();

function EventForm() {
  let history = useHistory();

  const addEvent = (newEvent) => {
    axios
      .post(`/events/:user_id`, newEvent)
      .then(
        () => {
          history.push(`/dashboard`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const [myEvent, setEvent] = useState({
    name: "",
    budget: 0,
    date: "",
    time: "",
    user_id: "",
  });

  const [eventForm, setEventForm] = useState({
    djs: false,
    musicians: false,
    photographers: false,
    party_rental: false,
    videographers: false,
    venues: false,
    balloons: false,
    floral: false,
  });
  const eventCheck = (category) => {
    axios.post(`${API}/checklist/:user_id/:event_id`, category).then();
  };

  const handleTextChange = (e) => {
    setEvent({ ...myEvent, [e.target.id]: e.target.value });
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setEventForm((prevState) => ({ ...prevState, [val]: !prevState[val] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(myEvent);
  };

  return (
    <section className="NewEvent">
      <form onSubmit={handleSubmit}>
        <label htmlFor="event_name">New Event</label>
        <input
          id="event_name"
          type="text"
          value={myEvent.name}
          placeholder="Name your Event"
          onChange={handleTextChange}
        />
        <label htmlFor="event_budget">Event Budget</label>
        <input
          id="event_budget"
          type="number"
          value={myEvent.budget}
          placeholder="Set your Budget"
          onChange={handleTextChange}
        />
        <label htmlFor="event_time">Time of your Event</label>
        <input
          id="event_time"
          type="text"
          value={myEvent.time}
          placeholder="Enter Event Time"
          onChange={handleTextChange}
        />
        <label htmlFor="event_date">Event Date</label>
        <input
          id="event_date"
          type="text"
          value={myEvent.date}
          placeholder="Enter Event Date"
          onChange={handleTextChange}
        />
        <label>
          DJ
          <input
            value="djs"
            type="checkbox"
            checked={eventForm.djs}
            onChange={toggleState}
          />
        </label>
        <label>
          Musician
          <input
            value="musicians"
            type="checkbox"
            checked={eventForm.musicians}
            onChange={toggleState}
          />
        </label>
        <label>
          Photographer
          <input
            value="photographers"
            type="checkbox"
            checked={eventForm.photographers}
            onChange={toggleState}
          />
        </label>
        <label>
          Party Rental
          <input
            value="party_rental"
            type="checkbox"
            checked={eventForm.party_rental}
            onChange={toggleState}
          />
        </label>
        <label>
          Videographer
          <input
            value="videographers"
            type="checkbox"
            checked={eventForm.videographers}
            onChange={toggleState}
          />
        </label>
        <label>
          Venues
          <input
            value="venues"
            type="checkbox"
            checked={eventForm.venues}
            onChange={toggleState}
          />
        </label>
        <label>
          Balloon Services
          <input
            value="balloons"
            type="checkbox"
            checked={eventForm.balloons}
            onChange={toggleState}
          />
        </label>
        <label>
          Floral Designer
          <input
            value="floral"
            type="checkbox"
            checked={eventForm.floral}
            onChange={toggleState}
          />
        </label>
      </form>
    </section>
  );
}
export default EventForm;
