import React, { useContext } from "react";
import EventForm from "../Components/EventForm";
import EventList from "../Components/EventList";
import app from "../util/firebase";
import { AuthContext } from "../Components/Auth";

export default function Dashboard({ history }) {
  const { currentUser } = useContext(AuthContext);
  console.log(JSON.stringify(currentUser));

  const signOut = () => {
    app.auth().signOut();
    history.push("/");
  };

  return (
    <div>
      Dashboard page
      <EventList />
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
