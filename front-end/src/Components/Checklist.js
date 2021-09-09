import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiURL } from "../util/apiURL";

const api = apiURL();

function Checklist({ categories, user_id, event_id, updateCost}) {
  const [bookedStatus, setBookedStatus] = useState({});
  const [showForm, setShowForm] = useState({});
  const [costInput, setCostInput] = useState({});
  
  // useEffect(() => {
  //   const show = categories.map((category) => {
  //     return {
  //       [category.name]: showForm[category] ? showForm[category] : false,
  //     };
  //   });

  //   setShowForm(show)
  // },[categories, showForm])


  useEffect(()=>{
  const booked = {}
  const show = {}
  const cost = {}

  for (let category of categories ){
    booked[category.name] = category.booked
    show[category.name] = false
    cost[category.name] = category.cost
  }

  setBookedStatus(booked)
  setShowForm(show)
  setCostInput(cost)
  },[categories])


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

  const updateBookedStatus = (category) => {
    let body = {
      is_completed: !bookedStatus[category],
      task_name: category,
      user_id: user_id,
      event_id: event_id,
    };
    setBookedStatus({ ...bookedStatus, [category]: !bookedStatus[category] });

    try {
      axios
        .put(`${api}/checklist/${user_id}/${event_id}`, body)
        .then((response) => {});
    } catch {}
  };

  const handleFormChange = (category, e) => {
    setCostInput({ ...costInput, [category]: e.target.value });
  };

  const handleSubmit = (category, e) => {
    e.preventDefault();

    const body = {
      task_name: category,
      task_cost: costInput[category],
      user_id: user_id,
      event_id: event_id,
    };

    setShowForm({ ...showForm, [category]: false });
    updateCost(body);
  };

  const form = (category) => {
    return (
      <form onSubmit={(e) => handleSubmit(category, e)}>
        <input
          id={category}
          placeholder="cost"
          value={costInput[category]}
          onChange={(e) => handleFormChange(category, e)}
          type="number"
          min="0"
          step=".01"
        />
        <input type="submit" value="Update" />
      </form>
    );
  };

  return (
    <ul className="checklist-list">
      {categories.map((category, i) => {
        return (
          <li key={i} className="checklist-list-item">
            <Link to={`/vendors/${category.name}`}>
              {listItem(category.name)}
            </Link>
            <div>
              <button
                className="book-button"
                onClick={() => updateBookedStatus(category.name)}
              >
                {" "}
                {bookedStatus[category.name] ? "✓" : "X"}{" "}
              </button>
              <button
                onClick={() =>
                  setShowForm({
                    ...showForm,
                    [category.name]: !showForm[category.name],
                  })
                }
              >
                Edit
              </button>
              {showForm[category.name] ? form(category.name) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Checklist;
