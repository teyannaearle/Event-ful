import Ratings from "react-ratings-declarative";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../util/apiCalls";
import { Carousel } from "react-responsive-carousel";

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
      if (data && reviewData) {
        setReviews(reviewData);
        setbusiness(data);
      } else {
        // ---------- ERROR PAGE  ---------------
      }
    })();
  }, [provider_id]);

  return (
    <div id="vendor-showpage" className="page">
      <h1>{business.name} </h1>

      <div className="car-wrap">
        <Carousel className="main-slide" showThumbs={false} autoPlay={true}>
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
      </div>

      <div className="reviews">
        {reviews.map((review, i) => {
          return (
            <div key={i} className="review three-d">
              <div className="flex-col reviewers">
                <p>{review.user.name}</p>

                <p>{review.time_created}</p>
                <img
                  width="80px"
                  height="100px"
                  src={review.user.image_url}
                  alt="Reviewer"
                  className="three-d"
                />
              </div>

              <div>
                <Ratings
                  rating={review.rating}
                  widgetRatedColors="steelblue"
                  widgetSpacings="2px"
                >
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="20px" />
                  <Ratings.Widget widgetDimension="15px" />
                  <Ratings.Widget widgetDimension="15px" />
                </Ratings>

                <p>{review.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
