import React from "react";
import BookedVendorsList from "../Components/Booked/BookedVendorsList";
import { useHistory, useParams } from "react-router";
import CapitalizeEvent from "../Components/CapitalizeEvent"
import NavBar from "../Components/NavBar/NavBar";

export default function Booked({ user_id }) {
  let history = useHistory();
  const { event_name } = useParams();
  return (
    <>
    <NavBar />
    
      <button
        className="pg-buttons back-button"
        onClick={() => history.goBack()}
      >
        {" "}
        &#x21e6; Back to Event
      </button>

      <div className="page">
        <h1 className="pg-head"> Booked Vendors for {CapitalizeEvent(event_name)} </h1>
        <BookedVendorsList user_id={user_id} />
      </div>
    </>
  );
}
