import React from 'react'
import Ratings from "react-ratings-declarative";

function VendorReview({review}) {
    return (
        <div className="review three-d">
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
    )
}

export default VendorReview
