import React from "react";
import Ratings from "react-ratings-declarative";

function VendorReview({ review }) {
  return (
    <div className="review three-d">
      <div className="flex-col reviewers">
        <Ratings
          rating={review.rating}
          widgetRatedColors="#efcc00"
          widgetSpacings="2px"
          widgetEmptyColors="#aaa"
        >
          <Ratings.Widget widgetDimension="25px" />
          <Ratings.Widget widgetDimension="25px" />
          <Ratings.Widget widgetDimension="35px" />
          <Ratings.Widget widgetDimension="25px" />
          <Ratings.Widget widgetDimension="25px" />
        </Ratings>

        <p className="rev-date">
          ( {new Date(review.time_created).toDateString()} )
        </p>

        <img
          src={review.user.image_url}
          alt={"https://i.stack.imgur.com/IHLNO.jpg"}
          className="three-d"
        />
        <p>{review.user.name}</p>
      </div>

      <div className="rev-text">
        <p>&nbsp; {review.text}</p>
      </div>
    </div>
  );
}

export default VendorReview;
