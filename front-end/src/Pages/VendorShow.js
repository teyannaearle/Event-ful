import Ratings from "react-ratings-declarative";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../util/apiCalls";

export default function VendorShow() {
  const [business, setBusiness] = useState({
    photos: [],
    categories: [{ title: "" }],
    location: { display_address: [] },
  });

  const [reviews, setReviews] = useState([
    {
      user: { image_url: "", name: "" },
    },
  ]);

  const { provider_id } = useParams();

  useEffect(() => {
    (async () => {
      const data = await api.getVendor(provider_id);
      const reviewData = await api.getReviews(provider_id);
      if (data && reviewData) {
        setReviews(reviewData);
        setBusiness(data);
        console.log(data);
      } else {
        // ---------- ERROR PAGE  ---------------
      }
    })();
  }, [provider_id]);

  return (
    <div id="vendor-showpage">
      <h1>{business.name} </h1>

      <div id="vendorimg-container">
        {business.photos.map((photo, i) => (
          <img src={photo} key={i} alt="service" className="vendor-imgs" />
        ))}
      </div>
      <div>
        <p>{business.price}</p>

        <div>
          {business.location.display_address.map((point, i) => (
            <p key={i}>{point}</p>
          ))}
        </div>

        <p>{business.display_phone}</p>
        <Ratings rating={business.rating} widgetRatedColors="steelblue">
          <Ratings.Widget widgetDimension="30px" />
          <Ratings.Widget widgetDimension="30px" />
          <Ratings.Widget widgetDimension="40px" />
          <Ratings.Widget widgetDimension="30px" />
          <Ratings.Widget widgetDimension="30px" />
        </Ratings>

        <div>
          {business.categories.map((category, i) => (
            <p key={i}>{category.title}</p>
          ))}
        </div>
      </div>

      <div>
        <h2>Reviews</h2>
        {reviews.map((review, i) => {
          return (
            <div key={i} className="review">
              <div>
                <p>{review.user.name}</p>
                <p>{review.time_created}</p>
                <img width="50px" src={review.user.image_url} alt="Reviewer" />
              </div>

              <div>
                {/* <p> */}
                <Ratings rating={review.rating} widgetRatedColors="steelblue">
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="30px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="20px" />
                </Ratings>
                {/* </p> */}
                <p>{review.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
