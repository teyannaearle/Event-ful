import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";

const API = apiURL();
console.log(API);
function EventForm() {
  const { user_id } = useParams();
  const [lastEvent, setLastEvent] = useState({});

  const [myEvent, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
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

  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${API}/events/last`)
      .then(
        (res) => {
          setLastEvent(res.data.payload);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, [user_id]);

  console.log(lastEvent);

  const addEvent = () => {
    axios
      .post(`${API}/events/${user_id}`, myEvent)
      .then(
        (res) => {
          console.log(res);
          
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  

  const handleTextChange = (e) => {
    setEvent({ ...myEvent, [e.target.id]: e.target.value });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
    addToCheckedList();
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
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
export default EventForm;
