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
            ? "ven-li-blue task-blue"
            : "ven-li"
        }`}
      >
        <h2 className="task-head col-h"> {vendor.name} </h2>
        <img src={vendor.image_url} alt={vendor.name} className="ven-img" />
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
        <h4> Contact Information </h4>
        <span>
          Phone: 📞 {vendor.display_phone}</span> 
        {/* <p>Phone: {vendor.display_phone}</p> */}
      </li>
    </>
  );
}

export default Vendor;
