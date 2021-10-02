import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

export default function Favorite({ vendor, user_id, deleteFav }) {
  const [favorite, setFavorite] = useState(true)

  useEffect(() => {
    try {
      axios.get(`${API}/favorites/${user_id}`).then((res) => {
        let index = res.data.message.findIndex(
          (elem) => elem.vendor_name === vendor.name
        );
        if (index > -1) {
          setFavorite(true);
        }
      });
    } catch (e) {
      console.warn(e);
    }
    return () => {
      setFavorite(false);
    };
  }, [vendor.name, user_id]);

  const handleClick = () => {
  deleteFav(vendor.vendor_name)
  };

  return (
    <>
      <li className="flex-col three-d ven-li">
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
            style={{ color: "red"}}
          ></i>
        </div>
        <h2>{vendor.vendor_name}</h2>

        <p>Category: {vendor.vendor_category}</p>
        <h4> Contact Information </h4>
        <p>Phone: {vendor.vendor_phone_number}</p>
        <p>Address: {vendor.vendor_address}</p>

      </li>
    </>
  );
}
