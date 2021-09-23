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

      <div>
        Booked Page
        <BookedVendorsList user_id={user_id} />
      </div>
    </>
  );
}
