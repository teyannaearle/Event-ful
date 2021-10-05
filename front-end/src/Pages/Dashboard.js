import React, { useContext } from "react";
import EventList from "../Components/Dashboard/EventList";
import { UserContext } from "../Providers/UserProvider";
import Loading from "../Components/Loading";

export default function Dashboard() {
  const loggedInUser = useContext(UserContext);
  const user_id = loggedInUser ? loggedInUser.user_id : null;
  const formattedName = loggedInUser
    ? loggedInUser.displayName.split(" ")[0][0].toUpperCase() +
      loggedInUser.displayName.split(" ")[0].substring(1)
    : "default name";

  return (
    <div className="page">
      <h1 className="pg-head">
        {loggedInUser && `${formattedName}'s Dashboard`}{" "}
      </h1>
      <div className="dash-container three-d">
        <EventList /> 
      </div>
    </div>
  );
}
