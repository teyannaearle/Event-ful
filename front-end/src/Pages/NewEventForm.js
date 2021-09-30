import React from "react";
import EventForm from "../Components/EventForm";

export default function NewEventForm({ user_id }) {
  return (
    <div className="page">
      <h1 className="pg-head">Create a New Event </h1>
      <div className="dash-container three-d">
        <EventForm user_id={user_id} />
      </div>
    </div>
  );
}
