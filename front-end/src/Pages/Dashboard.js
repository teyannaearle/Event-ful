import React, { useContext } from "react";
import EventList from "../Components/EventList";
import EventForm from "../Components/EventForm";
import app from "../util/firebase"
import { AuthContext } from "../Components/Auth";

export default function Dashboard({ history }) {
  const { currentUser } = useContext(AuthContext);
  console.log(JSON.stringify(currentUser));

  const signOut = () => {
    app.auth().signOut()
    history.push("/")
  }


  return (
    <div>
    Dashboard page
    

      <button onClick={signOut}>Sign out</button>



      <EventList />

    </div>
  );
}
