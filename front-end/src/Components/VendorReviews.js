import React from "react";
import VendorReview from "./VendorReview";

function VendorReviews({reviews}) {
  return (
    <div className="reviews">
      {reviews.map((review, i) => {
        return <VendorReview review={review} key={i} />;
      })}
    </div>
  );
}

export default VendorReviews;
