import React from "react";
import EventCheckbox from "../Components/EventCheckbox.js";

export default function EventCheckboxPg({ user_id }) {
  return (
    <div>
      <h2 className="pg-head">Select Your Event Requirements </h2>
      <EventCheckbox user_id={user_id} />
    </div>
  );
}
