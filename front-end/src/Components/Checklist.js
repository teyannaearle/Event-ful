import React from "react";
import { Link } from "react-router-dom";

function Checklist({categories}) {

  const listItem = (category) => {
    let item = "";
    switch (category) {
      case "catering":
        item = "Find a Caterer";
        break;
      case "djs":
        item = "Find a DJ";
        break;
      case "musicians":
        item = "Find a Musician";
        break;
      case "partyequipmentrentals":
        item = "Find Eqipment Rentals";
        break;
      case "eventphotography":
        item = "Find a Photographer";
        break;
      case "videographers":
        item = "Find a Videographer";
        break;
      case "venues":
        item = "Find a Venue";
        break;
      case "balloonservices":
        item = "Find Balloon Services";
        break;
      case "floraldesigners":
        item = "Find a Floral Designer";
        break;
      default:
        item = "";
    }

    return item;
  };

  return (
    <ul>
      {categories.map((category, i) => {
        return (
          <li key={i}>
            <Link to={`/vendors/${category}`}>{listItem(category)}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Checklist;
