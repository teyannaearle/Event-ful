import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";

const API = apiURL();

function EventForm({ user_id }) {
  // const { user_id } = useParams();
  // const [events, setEvents] = useState([]);
  //    const [id, setId] = useState({});

  const [myEvent, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
  });

  let history = useHistory();

  //   useEffect(() => {
  //     axios
  //       .get(`${API}/events/last`)
  //       .then(
  //         (res) => {
  //           setId(res.data.payload.event_id + 1);
  //         },
  //         (e) => {
  //           console.error(e);
  //         }
  //       )
  //       .catch((e) => {
  //         console.error(e);
  //       });
  //   }, []);

  const addEvent = () => {
    try {
      axios.post(`${API}/events/${user_id}`, myEvent).then((res) => {
        const id = res.data.payload.event_id;
        history.push(`/dashboard/new_event/checklist/${id}`);
      });
    } catch (error) {
      console.log("Not working");
    }
  };

  const handleTextChange = (e) => {
    setEvent({ ...myEvent, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  return (
    <section>
      <div className="eventformpg-container">
        <form className="eventform-container three-d" onSubmit={handleSubmit}>
          <label htmlFor="event_name">New Event</label>
          <input
            className="three-d pg-input"
            id="event_name"
            type="text"
            value={myEvent.name}
            placeholder="Name your Event"
            onChange={handleTextChange}
          />
          <label htmlFor="event_budget">Event Budget</label>
          <input
            className="three-d pg-input"
            id="event_budget"
            type="number"
            value={myEvent.budget}
            placeholder="Set your Budget"
            onChange={handleTextChange}
          />
          <label htmlFor="event_time">Time of your Event</label>
          <input
            className="three-d pg-input"
            id="event_time"
            type="time"
            value={myEvent.time}
            placeholder="Enter Event Time"
            onChange={handleTextChange}
          />
          <label htmlFor="event_date">Event Date</label>
          <input
            className="three-d pg-input"
            id="event_date"
            type="date"
            value={myEvent.date}
            placeholder="Enter Event Date"
            onChange={handleTextChange}
          />
          <button className="pg-buttons" type="submit">
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
}
export default EventForm;
