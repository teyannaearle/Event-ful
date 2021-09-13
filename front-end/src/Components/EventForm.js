import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";

const API = apiURL();

function EventForm() {
  //   const eventVendors = {};
  let history = useHistory();

  const addEvent = (newEvent) => {
    axios
      .post(`${API}/dashboard`, newEvent)
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
    zipcode: "",
    date: "",
    time: "",
  });

  const [state, setState] = useState({});
  const [djs, setDjs] = useState({});
  const [musicians, setMusicians] = useState({});
  const [photographer, setPhotographer] = useState({});
  const [videographer, setVideographer] = useState({});
  const [venues, setVenues] = useState({});
  const [balloons, setBallons] = useState({});
  const [floral, setFloral] = useState({});

  const handleTextChange = (e) => {
    setEvent({ ...myEvent, [e.target.id]: e.target.value });
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setState((prevState) => ({ ...prevState, [val]: !prevState[val] }));
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
      </form>
    </section>
  );
}
export default EventForm;
