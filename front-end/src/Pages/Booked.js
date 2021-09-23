import React from "react";
import BookedVendorsList from "../Components/Booked/BookedVendorsList";
import { useHistory } from "react-router";

export default function Booked({ user_id }) {
  let history = useHistory();
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
      <h1 className="pg-head">  Booked Page </h1>
        <BookedVendorsList user_id={user_id} />
      </div>
    </>
  );
}
