import EditForm from "../Components/Dashboard/EditEvent";

import React from "react";
import NavBar from "../Components/NavBar/NavBar";

function EditFormPage({ setUpdateEvent, user_id }) {
  return (
    <>
      <NavBar />
      <div className="edit-page page">
        <EditForm setUpdateEvent={setUpdateEvent} user_id={user_id} />
      </div>
    </>
  );
}

export default EditFormPage;
