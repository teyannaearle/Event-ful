import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Ratings from "react-ratings-declarative";
import { Carousel } from "react-responsive-carousel";
import { apiURL } from "../util/apiURL";

const api = apiURL();
const user_id = 1;
const event_id = 1;
const amount = 100;

function VendorShowInfo({ business }) {
  const [booked, setBooked] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // PULL FROM DATABASE IF IT IS  BOOKED - if it is setBooked to true
  // IF TRUE PUT ON CLICK (IF !FAV === FALSE)  DELETE else POST

  useEffect(() => {
    try {
      axios.get(`${api}/booked/${user_id}/${event_id}`).then((res) => {
        if (Object.values(res.data.message).indexOf(business.name) > -1) {
          setBooked(true);
        }
      });
    } catch {}

    try {
      axios.get(`${api}/favorites/${user_id}`).then((res) => {
        if (Object.values(res.data.message).indexOf(business.name) > -1) {
          setBooked(true);
        }
      });
    } catch {}
  }, [business.name]);

  const handleBook = () => {
    setBooked(!booked);

    if (!booked === false) {
      try {
        axios
          .delete(`${api}/booked/${user_id}/${event_id}/${business.name}`)
          .then((res) => console.log(res));
      } catch {}
    } else {
      const loc = business.location.display_address.join();
      const body = {
        vendor_name: business.name,
        vendor_address: loc,
        vendor_phone_number: business.phone,
        amount: amount,
      };

      try {
        axios
          .post(`${api}/booked/${user_id}/${event_id}`, body)
          .then((res) => console.log(res));
      } catch {}
    }
  };

  const handleFav = () => {
    setFavorite(!favorite);

    if (!favorite === false) {
      try {
        axios
          .delete(`${api}/favorites/${user_id}/${business.name}`)
          .then((res) => console.log(res));
      } catch {}
    } else {
      const loc = business.location.display_address.join();
      const body = {
        vendor_name: business.name,
        vendor_address: loc,
        vendor_phone_number: business.phone,
      };

      try {
        axios
          .post(`${api}/favorites/${user_id}`, body)
          .then((res) => console.log(res));
      } catch {}
    }
  
  };

  return (
    <>
      <h1 className="pg-head">{business.name} </h1>

      <div className="car-wrap">
        <Carousel showThumbs={false} autoPlay={true}>
          {business.photos.map((photo, i) => (
            <img src={photo} alt="service" className="vendor-imgs" key={i} />
          ))}
        </Carousel>
      </div>

      <div id="ven-info">
        <div className="flex-row">
          {business.categories.map((category, i) =>
            category.title ===
            business.categories[business.categories.length - 1].title ? (
              <p key={i}>{category.title}</p>
            ) : (
              <p key={i}>{category.title} - &nbsp;</p>
            )
          )}
        </div>

        <div className="flex-row">
          <Ratings rating={business.rating} widgetRatedColors="steelblue">
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="30px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="20px" />
          </Ratings>
        </div>

        <p>{business.price}</p>

        {business.location.display_address.map((point, i) => (
          <p key={i}>{point}</p>
        ))}

        <p>{business.display_phone}</p>

        <div className="book-fav">
          <button onClick={handleBook}>
            {!booked ? <> Booked &#63;</> : <> Booked &#10003;</>}{" "}
          </button>
          <button onClick={handleFav}>
            {!favorite ? <> Favorite &#63;</> : <> Favorite &#10003;</>}{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default VendorShowInfo;
