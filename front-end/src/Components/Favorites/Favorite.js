import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import Ratings from "react-ratings-declarative";
import gelato from "../../assets/gelato.jpeg";
import gelato2 from "../../assets/gelato2.jpeg";

const API = apiURL();

export default function Favorite({ vendor, user_id, deleteFav }) {
  // const { user_id, event_id, vendor_name } = useParams();
  const [favorite, setFavorite] = useState(true);

  const image = vendor.vendor_image ? vendor.vendor_image : gelato2;

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
  deleteFav(vendor.vendor_name)
  };

  return (
    <>
      <li className="flex-col three-d ven-li">
        <img
          src={image}
          alt={gelato2}
          height="250"
          width="300"
          className="ven-img"
        />
        <h2>{vendor.vendor_name}</h2>
        <p>Category: {vendor.vendor_category}</p>
        <h4> Contact Information </h4>
        <p>Phone: {vendor.vendor_phone_number}</p>
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
