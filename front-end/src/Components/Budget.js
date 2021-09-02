import React, { useEffect, useState } from "react";

function Budget({ categories, budget }) {
  const [showForm, setShowForm] = useState({});
  const [costs, setCosts] = useState({});
  const [shownCost, setShownCost] = useState({})
  const [currentAmount, setCurrentAmount] = useState(0)
  const [budgetStatus, setBudgetStatus] = useState(0)
  const formatter = new Intl.NumberFormat("en");

  useEffect(() => {
    let categoryStates = {};
    let categoryCosts = {};
    for (let category of categories) {
      categoryStates[category] = false;
      categoryCosts[category] = 0;
    }

    setShowForm(categoryStates);
    setCosts(categoryCosts);
    setShownCost(categoryCosts)
  }, [categories]);

  useEffect(() => {
    const values = Object.values(shownCost)
    // const sum = values.reduce((a,b) => a+b)
    const sum = values.reduce((a,b) =>{ return parseInt(a) + parseInt(b) }, 0)
    const currentSpending = budget - sum

    setBudgetStatus(currentSpending)
    setCurrentAmount(sum)
  }, [shownCost])

  const handleFormChange = (e) => {
    setCosts({ ...costs, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = (e, category) => {
    e.preventDefault();
    setShownCost(costs)
    setShowForm({ ...showForm, [category]: false })

  }

  const form = (category) => {
    return (
      <form onSubmit={(e) => handleFormSubmit(e, category)}>
        <input
          id={category}
          placeholder="cost"
          value={costs[category]}
          onChange={handleFormChange}
          type="number"
          min="0"
          step=".01"
        />
        <input type="submit" value="Update"/>
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

  const budgetUpdate = () => {
    //what i have left 
    // it < bud && it > 0 under budget , it left
    // it === 0 , has hit budget
    // it < 0 , it * - 1 over 

    let status = ""

    if (budgetStatus < budget && budgetStatus > 0 ){
      status = (<p> You have ${budgetStatus} left before you hit your budget</p>)
    } else if (budgetStatus === 0){
      status = (<p>You've reached your budget!</p>)
    } else if (budgetStatus === budget){
      status = null
    } else {
      status = (<p>You're ${budgetStatus * -1} over budget</p>)
    }

    return status
  }

  return (
    <div>
     <p> Projected Budget is $ {formatter.format(budget)} </p> 
     {budgetUpdate()}
     {/* <p> You have $ {formatter.format(budget - currentAmount)} left before you hit your budget</p>   */}
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i}>
              <p>{listItem(category)} </p>
              <p>$ { formatter.format(shownCost[category]) }</p>
              <button
                onClick={() =>
                  setShowForm({ ...showForm, [category]: !showForm[category] })
                }
              >
                Edit Cost
              </button>
              {showForm[category] ? form(category) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Budget;
