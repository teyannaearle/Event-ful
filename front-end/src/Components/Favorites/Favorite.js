import React from "react";
import CategorySwitch from "../CategorySwitch";

export default function Favorite({ vendors, vendor, deleteFav }) {
  const handleClick = () => {
    deleteFav(vendor.vendor_name);
  };

  const formatPhone = (phone) =>
    phone.length === 11
      ? `(${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(
          7
        )}`
      : phone;

  return (
    <>
      <li
        className={`flex-col three-d ven-li ${
          vendors.length === 1 ? "one-li" : null
        }`}
      >
        <h2 className="col-h"> {vendor.vendor_name} </h2>
        <img
          src={vendor.vendor_image}
          alt={vendor.vendor_name}
          height="250"
          width="300"
          className="ven-img"
        />
        <div className="like-div card-like">
          <i
            className={`fas fa-heart fa-lg heart card-heart `}
            onClick={handleClick}
            style={{ color: "red" }}
          ></i>
        </div>
        <p>( {CategorySwitch(vendor.vendor_category)} )</p>
        <h4> Contact Information </h4>
        <span>Phone: 📞 <a href={`tel:${vendor.vendor_phone_number}`}>{formatPhone(vendor.vendor_phone_number)}</a></span> 
        {/* <p>Phone: {formatPhone(vendor.vendor_phone_number)}</p> */}
        <p>Address: {vendor.vendor_address}</p>
      </li>
    </>
  );
}
