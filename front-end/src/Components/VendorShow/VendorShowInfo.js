import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Ratings from "react-ratings-declarative";
import { Carousel } from "react-responsive-carousel";
import { apiURL } from "../../util/apiURL";

const parseNum = (str) => +str.replace(/[^.\d]/g, "");

const API = apiURL();

function VendorShowInfo({ business, user_id, category }) {
  const [favorite, setFavorite] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    try {
      axios.get(`${API}/favorites/${user_id}`).then((res) => {
        let index = res.data.message.findIndex(
          (elem) => elem.vendor_name === business.name
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
  }, [business.name, user_id]);

  const handleFav = () => {
    setFavorite(!favorite);
    // setPressed(!pressed);
    if (!favorite === false) {
      try {
        axios
          .delete(`${API}/favorites/${user_id}/${business.name}`)
          .then((res) => setPressed(false));
      } catch (e) {
        console.warn(e);
      }
    } else {
      const loc = business.location.display_address.join(", ");

      const body = {
        vendor_name: business.name,
        vendor_address: loc,
        vendor_phone_number: parseNum(business.phone),
        // vendor_phone_number: business.display_phone,
        vendor_id: business.id,
        vendor_image: business.photos[0],
        vendor_category: category,
        vendor_rating: business.rating,
      };
      try {
        axios
          .post(`${API}/favorites/${user_id}`, body)
          .then((res) => setPressed(true));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const heartColor = () => {
    let color = "";

    if (hover && !favorite) {
      color = "#666";
    } else if (favorite) {
      color = "#68a7ca";
    } else {
      color = "#aaa";
    }

    return color;
  };

  return (
    <>
      <span className="show-header">
        <h1>{business.name} </h1>
        <div className="like-div">
          <i
            className={`fas fa-heart fa-lg heart ${pressed ? "press" : null}`}
            onClick={handleFav}
            style={{ color: heartColor() }}
            onMouseEnter={() => setHover(!hover)}
            onMouseLeave={() => setHover(!hover)}
          ></i>
          <span className={`like-span ${pressed ? "press" : null}`}>
            Added to Favorites!
          </span>
        </div>
      </span>
      <div className="ven-info page three-d">
        <div className="car-wrap">
          <Carousel showThumbs={false} autoPlay={true}>
            {business.photos.map((photo, i) => (
              <img src={photo} alt="service" className="vendor-imgs" key={i} />
            ))}
          </Carousel>
        </div>

        <div id="ven-info">
          <div className="flex-row">
            <p>{business.categories[0].title}</p>
          </div>

          <div className="flex-row">
            <Ratings rating={business.rating} widgetRatedColors="steelblue">
              <Ratings.Widget widgetDimension="30px" />
              <Ratings.Widget widgetDimension="30px" />
              <Ratings.Widget widgetDimension="35px" />
              <Ratings.Widget widgetDimension="30px" />
              <Ratings.Widget widgetDimension="30px" />
            </Ratings>
          </div>
          <div>
            <h2> Contact Information </h2>
            <p>{business.price}</p>
            <p>{business.display_phone}</p>

            {business.location.display_address.map((point, i) => (
              <p key={i}>{point}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorShowInfo;
