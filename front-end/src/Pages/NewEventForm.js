import React from "react";
import EventForm from "../Components/Dashboard/EventForm"

export default function NewEventForm({ user_id }) {
  return (
    <div className="page newevent-pg">
      <h1 className="pg-head">Create a New Event </h1>
      <div className="newEvent-container ">
        <EventForm user_id={user_id} />
      </div>
    </div>
  );
}
