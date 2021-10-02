import EditForm from "../Components/EditEvent";

import React from "react";

function EditFormPage({user_id}) {
  return (
    <div className="edit-page page">
      <EditForm user_id={user_id}/>
    </div>
  );
}

export default EditFormPage;
