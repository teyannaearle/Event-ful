import React from "react";
import BookedVendorsList from "../Components/Booked/BookedVendorsList";
import { useHistory, useParams } from "react-router";

export default function Booked() {
  let history = useHistory();
  const { event_name } = useParams();
  return (
    <>
      <button
        className="pg-buttons back-button"
        onClick={() => history.goBack()}
      >
        {" "}
        &#x21e6; Back to Event
      </button>

      <div className="page">
        <h1 className="pg-head"> Booked Vendors for {event_name} </h1>
        <BookedVendorsList />
      </div>
    </>
  );
}
