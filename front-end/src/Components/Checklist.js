import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiURL } from "../util/apiURL"

const api = apiURL()

function Checklist({categories, user_id, event_id}) {
  const [ bookedStatus, setBookedStatus ] = useState({}) 
  const [showForm, setShowForm] = useState({});


  useEffect(()=>{
    const booked = {}
    const show = {}
    for (let category of categories ){
      booked[category.name] = category.booked
      booked[category.name] = false
    }
    setBookedStatus(booked)
    setShowForm(show)
  },[])

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
      is_completed: ! bookedStatus[category],
      task_name: category,
      user_id: user_id,
      event_id: event_id
    }
    setBookedStatus({...bookedStatus, [category]: ! bookedStatus[category]})

    try {
      axios.put(`${api}/checklist/${user_id}/${event_id}`, body)
        .then((response) => {
          
        })
    } catch {

    }
  }

  const form = (category) => {
    return (
      <form >
        <input
          id={category}
          placeholder="cost"
          // value={costs[category]}
          // onChange={handleFormChange}
          type="number"
          min="0"
          step=".01"
        />
        <input type="submit" value="Update"/>
      </form>
    );
  };


  return (
    <ul className="checklist-list">
      {categories.map((category, i) => {
        return (
          <li key={i} className="checklist-list-item">
            <Link to={`/vendors/${category.name}`}>{listItem(category.name)}</Link>
            <div>
            <button className="book-button" onClick={() => updateBookedStatus(category.name)} > {bookedStatus[category.name] ? "✓" : "X"} </button>
            <button
                onClick={() =>
                  setShowForm({ ...showForm, [category.name]: !showForm[category.name]})
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
