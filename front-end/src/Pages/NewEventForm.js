import React from "react";
import EventForm from "../Components/EventForm";

export default function NewEventForm() {
  return (
    <div className="page newevent-pg">
      <h1 className="pg-head">Create a New Event </h1>
      <div className="dash-container ">
        <EventForm />
      </div>
    </div>
  );
}
