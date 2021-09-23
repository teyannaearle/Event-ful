import React from 'react'
import EventCheckbox from "../Components/EventCheckbox.js"

export default function EventCheckboxPg({user_id}) {

    return (
        <div> 
      Create Your Event
      <EventCheckbox user_id={user_id} />
    
        </div>
    )
}
