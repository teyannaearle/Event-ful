import React from "react";
import EventCheckbox from "../Components/EventCheckbox.js";

export default function EventCheckboxPg({ setUpdateEvent }) {
  return (
    <div className="page eventcheckbox-pg">
      <h2 className="pg-head">Select Your Event Requirements: </h2>
      <EventCheckbox setUpdateEvent={setUpdateEvent} />
    </div>
  );
}
