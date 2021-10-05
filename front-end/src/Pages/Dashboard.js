import React, { useEffect } from "react";
import EventList from "../Components/Dashboard/EventList";
import Loading from "../Components/Loading";

export default function Dashboard({
  events,
  deleteEvent,
  setUpdateEvent,
  user_id,
  formattedName,
}) {
  
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
            {`${formattedName}'s Dashboard`}{" "}
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
