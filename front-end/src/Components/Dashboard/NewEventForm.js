import React, { useState, useContext } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL.js";
import NewChecklistForm from "./NewChecklistForm.js";
import Form from "./Form.js";
import { UserContext } from "../../Providers/UserProvider";


const API = apiURL();

function NewEventForm({ user_id, created, setCreated, setUpdateEvent }) {
  const loggedInUser = useContext(UserContext);
  const  accessToken  = loggedInUser.currentUser ? loggedInUser.currentUser.accessToken : null
  const [eventId, setEventId] = useState(null);
  const [myEvent, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
  });

  const addEvent = () => {
    try {
      axios.post(`${API}/events/${user_id}`, myEvent, {
        headers: {
          Authorization: "Bearer " + accessToken,
        }}).then((res) => {
        const id = res.data.payload.event_id;
        setEventId(id);
      });
    } catch (error) {
      console.error(error);
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
    <section className="three-d new-event-container">
      <p className="new"> ( Plan a New Event ) </p>

      {eventId ? (
        <NewChecklistForm
          id={eventId}
          setEventId={setEventId}
          created={created}
          setCreated={setCreated}
          user_id={user_id}
          setUpdateEvent={setUpdateEvent}
        />
      ) : (
        <Form
          myEvent={myEvent}
          handleTextChange={handleTextChange}
          handleSubmit={handleSubmit}
        />
      )}
    </section>
  );
}
export default NewEventForm;
