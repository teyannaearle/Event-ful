import React, { useEffect, useState } from "react";

function Budget({ categories, budget }) {
  const [showForm, setShowForm] = useState({});
  const [costs, setCosts] = useState({});
  const [shownCost, setShownCost] = useState({})
  const [budgetStatus, setBudgetStatus] = useState(0)
  const formatter = new Intl.NumberFormat("en-US" , {
    style: "currency",
    currency: "USD"
  });

  useEffect(() => {
    let categoryStates = {};
    let categoryCosts = {};
    for (let category of categories) {
      categoryStates[category.name] = false;
      categoryCosts[category.name] = category.cost;
    }

    setShowForm(categoryStates);
    setCosts(categoryCosts);
    setShownCost(categoryCosts)
  }, [categories]);



  useEffect(() => {
    const values = Object.values(shownCost)
    const sum = values.reduce((a,b) =>{ return Number(a) + Number(b) }, 0)
    const currentSpending = Number(budget) - Number(sum)

    setBudgetStatus(currentSpending)
  }, [shownCost, budget])



  const handleFormChange = (e) => {
    setCosts({ ...costs, [e.target.id]: e.target.value });
  };


  const handleFormSubmit = (e, category) => {
    e.preventDefault();
    setShownCost(costs)
    setShowForm({ ...showForm, [category]: false })

  }


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


  const budgetUpdate = () => {

    let status = ""

    if (budgetStatus < budget && budgetStatus > 0 ){
      status = (<p> You have {formatter.format(budgetStatus)} left before you hit your budget</p>)
    } else if (budgetStatus === 0){
      status = (<p>You've reached your budget!</p>)
    } else if (budgetStatus === budget){
      status = null
    } else {
      status = (<p>You're {formatter.format(budgetStatus * -1)} over budget</p>)
    }

    return status
  }



  return (
    <div>
       <p> Projected Budget: {formatter.format(budget)}</p>
     {budgetUpdate()}
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i} className="budget-item">
              <p>{listItem(category.name)} </p>
              <p> { formatter.format(shownCost[category.name]) }</p>
              {/* <button
                onClick={() =>
                  setShowForm({ ...showForm, [category.name]: !showForm[category.name] })
                }
              >
                Edit Cost
              </button> */}
              {showForm[category.name] ? form(category.name) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Budget;
