import React from "react";

export default function BookedVendor({ vendor}) {

  return (
    <>
        <img
          src={vendor.vendor_image}
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
        </div>
      </>
  );
}
