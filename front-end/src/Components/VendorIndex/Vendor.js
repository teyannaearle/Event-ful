import React from "react";
import Ratings from "react-ratings-declarative";
import { useLocation } from "react-router-dom";

function Vendor({ vendor, selected }) {
  const location = useLocation().pathname.split("/");

  return (
    <>
      <li
        className={`flex-col three-d ${
          (location[1] === "task" && !selected) || location[1] === "vendors"
            ? "ven-li-blue "
            : "ven-li"
        }`}
      >
        {location[1] === "task" ? <h2>{vendor.name}</h2> : null}
        <img src={vendor.image_url} alt={vendor.name} className="ven-img" />
        {location[1] !== "task" ? <h2>{vendor.name}</h2> : null}
        <p>Phone: {vendor.display_phone}</p>
        <div className="flex-row">
          <Ratings
            rating={vendor.rating}
            widgetRatedColors="#efcc00"
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
