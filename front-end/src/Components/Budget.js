import React, { useEffect, useState } from "react";

function Budget({ categories, budget, shownCost }) {
  const [budgetStatus, setBudgetStatus] = useState(0);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const values = Object.values(shownCost);
    const sum = values.reduce((a, b) => {
      return Number(a) + Number(b);
    }, 0);
    const currentSpending = Number(budget) - Number(sum);
    setBudgetStatus(currentSpending);
  }, [shownCost, budget]);

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

  const budgetUpdate = () => {
    let status = "";

    if (budgetStatus < budget && budgetStatus > 0) {
      status = (
        <p>
          {" "}
          You have {formatter.format(budgetStatus)} left before you hit your
          budget
        </p>
      );
    } else if (budgetStatus === 0) {
      status = <p>You've reached your budget!</p>;
    } else if (budgetStatus === budget) {
      status = null;
    } else {
      status = <p>You're {formatter.format(budgetStatus * -1)} over budget</p>;
    }

    return status;
  };

  return (
    <div>
      <p> Projected Budget: {formatter.format(budget)}</p>
      {budgetUpdate()}
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i} className="budget-item">
              <p>{listItem(category.name)} </p>
              <p> {formatter.format(shownCost[category.name])}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Budget;
