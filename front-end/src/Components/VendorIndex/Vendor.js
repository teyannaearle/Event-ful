import React from "react";
import Ratings from "react-ratings-declarative";
import { useLocation } from "react-router-dom"

function Vendor({ vendor }) {
  // const location = useLocation().pathname.split("/")
//  const split = location.pathname.split("/")


  return (
    <>
      <li className="flex-col three-d ven-li">
        <img
          src={vendor.image_url}
          alt={vendor.name}
          height="250"
          width="300"
          className="ven-img"
        />
        <h2>{vendor.name}</h2>
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
        {/* {location[1] === "task"   ?  <h3>Input discussed cost below</h3> : null} */}
      </li>
    </>
  );
}

export default Vendor;
