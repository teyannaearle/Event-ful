import EditForm from "../Components/EditEvent";

import React from "react";

function EditFormPage({setUpdateEvent}) {
  return (
    <div className="edit-page page">
      <EditForm setUpdateEvent={setUpdateEvent}/>
    </div>
  );
}

export default EditFormPage;
