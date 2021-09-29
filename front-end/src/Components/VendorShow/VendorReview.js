import React from 'react'
import Ratings from "react-ratings-declarative";

function VendorReview({review}) {
    return (
        <div className="review three-d">
        <div className="flex-col reviewers">
          <p>{review.user.name}</p>

          <p>{new Date(review.time_created).toDateString()}</p>
          <img
            width="80px"
            height="100px"
            src={review.user.image_url}
            alt="Reviewer"
            className="three-d"
          />
        </div>

        <div className="rev-text">
          <Ratings
            rating={review.rating}
            widgetRatedColors="#efcc00"
            widgetSpacings="2px"
            widgetEmptyColors="#aaa"
          >
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="25px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="20px" />
          </Ratings>

          <p>{review.text}</p>
        </div>
      </div>
    )
}

export default VendorReview
