import React from "react";
import EventCheckbox from "../Components/EventCheckbox.js";

export default function EventCheckboxPg({ setUpdateEvent, user_id }) {
  return (
    <div className="page eventcheckbox-pg">
      <h2 className="pg-head">Select Your Event Requirements: </h2>
      <EventCheckbox setUpdateEvent={setUpdateEvent} user_id={user_id}  />
    </div>
  );
}
