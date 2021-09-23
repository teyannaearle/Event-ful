import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Favorite({ vendor }) {
  const { user_id, event_id, vendor_name } = useParams();

  return (
    <tr>
      <td>
        <Link to={`/favorites/${user_id}/${event_id}/${vendor.vendor_name}`}>
          {vendor.vendor_name}
        </Link>
      </td>
      <td>{vendor.vendor_address}</td>
      <td>{vendor.vendor_phone_number}</td>
    </tr>
  );
}
