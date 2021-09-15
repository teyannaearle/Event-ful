import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function BookedVendor({ vendor }) {
  const { user_id, event_id, vendor_name } = useParams();

  console.log(vendor.vendor_name);
  return (
    <tr>
      <td>
        <Link to={`/booked/${user_id}/${event_id}/${vendor.vendor_name}`}>
          {vendor.vendor_name}
        </Link>
      </td>
      <td>{vendor.vendor_address}</td>
      <td>{vendor.vendor_phone_number}</td>
      <td>{vendor.amount}</td>
    </tr>
  );
}
