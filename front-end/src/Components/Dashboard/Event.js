import React from "react";
import { Link } from "react-router-dom";
import CapitalizeEvent from "../CapitalizeEvent";

function Event({ event, user_id, handleDelete }) {

  const emoji = () => {
    let item = "";
    const name = event.event_name.toLowerCase()
if (name.includes("baby" || "babies") ){
 item =  <>&#128118;</>
} else if (name.includes("birthday" || "surprise")){
  item = <>&#129395;</>
} else if (name.includes("retire")){
  item = <>&#127870;</>
}else if (name.includes("new")){
  item = <>&#127879;</>
}else if (name.includes("holiday" || "christmas")){
  item = <>&#65039;</>
}else if (name.includes("halloween")){
  item = <>&#127875;</>
} else {
  item = <>&#127882;</>
}

return item
  };
  
  return (
    <div className="event-sq">
              <button
          onClick={() => handleDelete(event.event_id)}
          className="del-but"
        >
         &#x2718;
        </button>
      <h2> {emoji()} {CapitalizeEvent(event.event_name)} </h2>
      <Link to={`/event/${event.event_id}`} className="pg-buttons plan">
        {/* <p className="plan-ev"> */}
          {/* &#x261E; */}
       <span>   Let's plan ! </span>
        {/* </p> */}
      </Link>
      <span className="ed-but">
        <Link to={`/dashboard/${user_id}/edit`}>
        Edit Event Details
          {/* <button className="pg-buttons edit-ev">Edit Event Details</button> */}
        </Link>
        {/* <button
          onClick={() => handleDelete(event.event_id)}
          className="pg-buttons edit-ev"
        >
          Delete Event
        </button> */}
      </span>
    </div>
  );
}

export default Event;
