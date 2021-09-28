import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import celebrate from "../../assets/celebrate.jpeg";

export default function BookedVendor({ vendor }) {
  const { user_id, event_id, vendor_name } = useParams();
  const image = vendor.vendor_image ? vendor.vendor_image : celebrate;
  console.log(vendor);
  return (
    // <tr>
    //   <td>
    //     <Link to={`/booked/${user_id}/${event_id}/${vendor.vendor_name}`}>
    //       {vendor.vendor_name}
    //     </Link>
    //   </td>
    //   <td>{vendor.vendor_address}</td>
    //   <td>{vendor.vendor_phone_number}</td>
    //   <td>{vendor.amount}</td>
    // </tr>

    <>
      <li className="flex-col three-d ven-li">
        <img
          src={image}
          alt={vendor.vendor_name}
          height="250"
          width="300"
          className="ven-img"
        />
        <h2>{vendor.vendor_name}</h2>
        <h3> Contact Information </h3>
        <p>Phone: {vendor.vendor_phone_number}</p>
        <p>Address: {vendor.vendor_address}</p>
        <h3>Amount: ${vendor.amount}</h3>
        <div className="book-fav">
          {/* <button onClick={handleClick} className="pg-buttons">
          {!favorite ? <> Favorite &#63;</> : <> Favorite &#10003;</>}{" "}
        </button> */}
        </div>
      </li>
    </>
  );
}
