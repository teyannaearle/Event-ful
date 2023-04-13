import React, { useEffect } from "react";
import EventList from "../Components/Dashboard/EventList";
import NewEventForm from "../Components/Dashboard/NewEventForm";
import NavBar from "../Components/NavBar/NavBar";

export default function Dashboard({
  events,
  deleteEvent,
  setUpdateEvent,
  user_id,
  formattedName,
  created,
  setCreated,
}) {
  useEffect(() => {
    setUpdateEvent(false);
    return () => {
      setUpdateEvent(false);
    };
  }, [setUpdateEvent]);

  return (
    <>
      <NavBar />
      <div className="page">
      <>
            <h1 className="pg-head">{formattedName ? `${formattedName}'s Dashboard` : `Dashboard`} </h1>
            <NewEventForm
              user_id={user_id}
              created={created}
              setCreated={setCreated}
              setUpdateEvent={setUpdateEvent}
            />
            <>
              <EventList
                events={events}
                deleteEvent={deleteEvent}
                user_id={user_id}
              />
            </>
          </>
      </div>
    </>
  );
}
