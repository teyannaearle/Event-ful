import React from "react";
import Ratings from "react-ratings-declarative";
import { Carousel } from "react-responsive-carousel";

function VendorShowInfo({ business }) {
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
      </div>
    </>
  );
}

export default VendorShowInfo;
