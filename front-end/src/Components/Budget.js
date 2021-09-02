import React, { useEffect, useState } from "react";

function Budget({categories, budget}) {
  const [showForm, setShowForm] = useState({});
  const formatter = new Intl.NumberFormat("en");

  useEffect(() => {
    let categoryStates = {};
    for (let category of categories) {
      categoryStates[category] = false;
    }

    setShowForm(categoryStates);
  }, [categories]);


  const form = () => {
    return (
      <form>
        <input></input>
      </form>
    );
  };

  const listItem = (category) => {
    let item = "";
    switch (category) {
      case "catering":
        item = "Caterer";
        break;
      case "djs":
        item = "DJ";
        break;
      case "musicians":
        item = "Musician";
        break;
      case "partyequipmentrentals":
        item = "Eqipment Rentals";
        break;
      case "eventphotography":
        item = "Photographer";
        break;
      case "videographers":
        item = "Videographer";
        break;
      case "venues":
        item = "Venue";
        break;
      case "balloonservices":
        item = "Balloon Services";
        break;
      case "floraldesigners":
        item = "Floral Designer";
        break;
      default:
        item = "";
    }

    return item;
  };

  return (
    <div>
      Projected Budget is $ {formatter.format(budget)}
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i}>
              <p>{listItem(category)} </p>
              <button
                onClick={() =>
                  setShowForm({ ...showForm, [category]: !showForm[category] })
                }
              >
                add/edit cost
              </button>
              {showForm[category] ? form() : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Budget;
