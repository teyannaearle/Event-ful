import React from "react";
// import { useParams } from "react-router-dom";
// import celebrate from "../../assets/celebrate.jpeg";

export default function BookedVendor({ vendor }) {
  const image = vendor.vendor_image;
  const formatPhone = (phone) =>
    phone.length === 11
      ? `(${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(
          7
        )}`
      : phone;
  return (
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
        <p>Phone: {formatPhone(vendor.vendor_phone_number)}</p>
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
