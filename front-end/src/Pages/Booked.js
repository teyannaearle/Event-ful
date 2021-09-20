import React from "react";
import BookedVendorsList from "../Components/Booked/BookedVendorsList";

export default function Booked({user_id}) {
  return (
    <div>
      Booked Page
      <BookedVendorsList user_id={user_id} />
    </div>
  );
}
