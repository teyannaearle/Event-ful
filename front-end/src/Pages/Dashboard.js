import React, { useContext, useEffect } from "react";
import EventList from "../Components/Dashboard/EventList";
import { UserContext } from "../Providers/UserProvider";
import Loading from "../Components/Loading";

export default function Dashboard({ events, deleteEvent, setUpdateEvent }) {
  const loggedInUser = useContext(UserContext);
  const user_id = loggedInUser ? loggedInUser.user_id : null;
  const formattedName = loggedInUser
    ? loggedInUser.displayName.split(" ")[0][0].toUpperCase() +
      loggedInUser.displayName.split(" ")[0].substring(1)
    : "default name";

  useEffect(() => {
    setUpdateEvent(false);
    return () => {
      setUpdateEvent(false);
    };
  }, [setUpdateEvent]);

  return (
    <div className="page">
      {user_id ? (
        <>
          <h1 className="pg-head">
            {loggedInUser && `${formattedName}'s Dashboard`}{" "}
          </h1>
          <div className="dash-container three-d">
            <EventList
              events={events}
              deleteEvent={deleteEvent}
              user_id={user_id}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}   
    </div>
  );
}
