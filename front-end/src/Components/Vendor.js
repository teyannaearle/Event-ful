import React from "react";
import Ratings from "react-ratings-declarative";

function Vendor({ vendor }) {
  return (
    <>
      <li key={vendor.id} className="flex-col three-d ven-li">
        <img
          src={vendor.image_url}
          alt={vendor.name}
          height="200"
          width="200"
        />
        <h1>{vendor.name}</h1>
        <p>Phone: {vendor.display_phone}</p>
        <div className="flex-row">
          <p>Avg Rating: </p>
          <Ratings
            rating={vendor.rating}
            widgetRatedColors="steelblue"
            widgetSpacings="2px"
          >
            <Ratings.Widget widgetDimension="15px" />
            <Ratings.Widget widgetDimension="15px" />
            <Ratings.Widget widgetDimension="20px" />
            <Ratings.Widget widgetDimension="15px" />
            <Ratings.Widget widgetDimension="15px" />
          </Ratings>
        </div>
      </li>
    </>
  );
}

export default Vendor;
