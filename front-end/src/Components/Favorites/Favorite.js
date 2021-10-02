import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { apiURL } from "../../util/apiURL";


const API = apiURL();

export default function Favorite({ vendor, user_id, deleteFav }) {
  // const { user_id, event_id, vendor_name } = useParams();
  const [favorite, setFavorite] = useState(true);
  const image = vendor.vendor_image;

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
    setFavorite(!favorite);
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
      <li className="flex-col three-d ven-li">
        <img
          src={image}
          // alt={gelato2}
          alt={vendor.vendor_name}
          height="250"
          width="300"
          className="ven-img"
        />
        <h2>{vendor.vendor_name}</h2>
        <p>Category: {vendor.vendor_category}</p>
        <h4> Contact Information </h4>
        <p>Phone: {formatPhone(vendor.vendor_phone_number)}</p>
        <p>Address: {vendor.vendor_address}</p>
        <div className="book-fav">
          <button onClick={handleClick} className="pg-buttons">
            {!favorite ? <> Favorite &#63;</> : <> Favorite &#10003;</>}{" "}
          </button>
        </div>
      </li>
    </>
  );
}
