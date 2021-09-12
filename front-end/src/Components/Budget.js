import React, { useEffect, useState } from "react";

function Budget({ categories, budget , shownCost, formatter}) {
  const [budgetStatus, setBudgetStatus] = useState(0)
  const [sum, setSum] = useState(0)

  useEffect(() => {
    const values = Object.values(shownCost)
    const sum = values.reduce((a,b) =>{ return Number(a) + Number(b) }, 0)
    const currentSpending = Number(budget) - Number(sum)
    setBudgetStatus(currentSpending)
    setSum(sum)
  }, [shownCost, budget])



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
      case "party rental":
        item = "Equipment Rentals";
        break;
      case "photographers":
        item = "Photographer";
        break;
      case "videographers":
        item = "Videographer";
        break;
      case "venues":
        item = "Venue";
        break;
      case "balloons":
        item = "Balloon Services";
        break;
      case "floral":
        item = "Floral Designer";
        break;
      default:
        item = "";
    }

    return item;
  };

  const budgetUpdate = () => {

    let status = ""

    if ((budgetStatus < budget && budgetStatus > 0) || (budgetStatus === budget)){
      status = (<p > You have {formatter.format(budgetStatus)} left before you hit your budget</p>)
    } else if (budgetStatus === 0){
      status = (<p >You've reached your budget!</p>)

    } else {
      status = (<p >You're {formatter.format(budgetStatus * -1)} over budget</p>)
    }

    return status
  }


  return (
    <div className="budget-list">
<div id="budget-update">
  <div className="update">
     {budgetUpdate()}
     </div> 
     <div className="budget-sum" >
       <div>
     <h3 >Summary of Costs</h3>
      <ul>
        {categories.map((category, i) => {
          return (
            <li key={i} className="budget-li">
              <p className="budget-cat">{listItem(category.name)} </p>
              <p> { formatter.format(shownCost[category.name]) }</p>
            </li>
          );
        })}
        <li className="budget-li total">
          <p>TOTAL</p>
          <p>{formatter.format(sum)}</p>
        </li>
      </ul>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Budget;
