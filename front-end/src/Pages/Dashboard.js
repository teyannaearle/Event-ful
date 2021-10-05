import React, { useContext , useEffect} from "react";
import EventList from "../Components/Dashboard/EventList";
import { UserContext } from "../Providers/UserProvider";

export default function Dashboard({user_id, events, deleteEvent, setUpdateEvent}) {
  const loggedInUser = useContext(UserContext);
  const formattedName = loggedInUser
    ? loggedInUser.displayName.split(" ")[0][0].toUpperCase() +
      loggedInUser.displayName.split(" ")[0].substring(1)
    : "default name";

    useEffect(() => {
      setUpdateEvent(false)
      return () => {
      setUpdateEvent(false)
      }
    }, [setUpdateEvent])

  return (
    <div className="page">
      <h1 className="pg-head">
        {loggedInUser && `${formattedName}'s Dashboard`}{" "}
      </h1>
      <div className="dash-container three-d">
        <EventList user_id={user_id} events={events} deleteEvent={deleteEvent}/>
      </div>
    </div>
  );
}
