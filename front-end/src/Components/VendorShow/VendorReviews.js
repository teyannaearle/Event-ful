import React from "react";
import VendorReview from "./VendorReview";

function VendorReviews({ reviews }) {
  return (
    <div className="reviews">
      <h2 className="show-header">( Reviews ) </h2>
      <div className="reviews-ul">
        <span>
      {reviews.map((review, i) => {
        return <VendorReview review={review} key={i} />;
      })}
      </span>
      </div>
    </div>
  );
}

export default VendorReviews;
