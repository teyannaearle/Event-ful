import React from "react";
import { Link } from "react-router-dom";
import Ratings from "react-ratings-declarative";

function Vendor({ vendor, category }) {
  return (
    <>
      <Link to={`/vendor/${category}/${vendor.id}`}>
        <li className="flex-col three-d ven-li">
          <img
            src={vendor.image_url}
            alt={vendor.name}
            height="200"
            width="200"
          />
          <h3>{vendor.name}</h3>
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
      </Link>
    </>
  );
}

export default Vendor;
