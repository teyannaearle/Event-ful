import React from "react";
import EventForm from "../Components/EventForm";

export default function NewEventForm({user_id}) {
  return (
    <div>
      <EventForm user_id={user_id}/>
    </div>
  );
}
