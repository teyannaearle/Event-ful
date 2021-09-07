import Ratings from "react-ratings-declarative";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../util/apiCalls";

export default function VendorShow() {
  const [business, setbusiness] = useState({
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
      setReviews(reviewData);
      setbusiness(data);
    })();
  }, [provider_id]);

  return (
    <div>
      <h1>{business.name} </h1>

      {business.photos.map((photo, i) => (
        <img src={photo} key={i} alt="service" width="250px" />
      ))}

      <div>
        <p>{business.price}</p>

        <div>
          {business.location.display_address.map((point,i) => (
            <p key={i}>{point}</p>
          ))}
        </div>

        <p>{business.display_phone}</p>
        <Ratings rating={business.rating} widgetRatedColors="steelblue">
          <Ratings.Widget widgetDimension="40px" />
          <Ratings.Widget widgetDimension="40px" />
          <Ratings.Widget widgetDimension="50px" />
          <Ratings.Widget widgetDimension="40px" />
          <Ratings.Widget widgetDimension="40px" />
        </Ratings>

        {/* <div>
          {business.categories.map((category, i) => (
            <p key={i}>{category.title}</p>
          ))}
        </div> */}

      </div>

      <div>
        <h2>Reviews</h2>
        {reviews.map((review, i) => {
          return (
            <div key={i}>
              <p>{review.user.name}</p>
              <img width="50px" src={review.user.image_url} alt="Reviewer" />
              <p>{review.time_created}</p>
              {/* <p> */}
                <Ratings rating={review.rating} widgetRatedColors="steelblue">
                  <Ratings.Widget widgetDimension="40px" />
                  <Ratings.Widget widgetDimension="40px" />
                  <Ratings.Widget widgetDimension="50px" />
                  <Ratings.Widget widgetDimension="40px" />
                  <Ratings.Widget widgetDimension="40px" />
                </Ratings>
              {/* </p> */}
              <p>{review.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
