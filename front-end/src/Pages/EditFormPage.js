import EditForm from "../Components/Dashboard/EditEvent"

import React from "react";

function EditFormPage({ setUpdateEvent, user_id }) {
  return (
    <div className="edit-page page">
      <EditForm setUpdateEvent={setUpdateEvent} user_id={user_id} />
    </div>
  );
}

export default EditFormPage;
