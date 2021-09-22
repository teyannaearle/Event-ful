import axios from "axios";
import { Link } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import React, { useEffect, useState } from "react";

const api = apiURL();

function Checklist({ categories, user_id, event_id, updateCost }) {
  const [bookedStatus, setBookedStatus] = useState({});

  useEffect(() => {
    const booked = {};
    const show = {};
    const cost = {};

    for (let category of categories) {
      booked[category.name] = category.booked;
      show[category.name] = false;
      cost[category.name] = category.cost;
    }

    setBookedStatus(booked);

    return () => {
      setBookedStatus({});
    };
  }, [categories]);

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
      case "party_rental":
        item = "Find Equipment Rentals";
        break;
      case "photographers":
        item = "Find a Photographer";
        break;
      case "videographers":
        item = "Find a Videographer";
        break;
      case "venues":
        item = "Find a Venue";
        break;
      case "balloons":
        item = "Find Balloon Services";
        break;
      case "floral":
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

    if (!bookedStatus[category] === false) {
      axios
        .delete(`${api}/booked/${user_id}/${event_id}/${category}`)
        .then((res) => "");

      let checklistBody = {
        task_cost: 0,
        task_name: category,
      };
      updateCost(checklistBody, category);
    }

    try {
      axios
        .put(`${api}/checklist/${user_id}/${event_id}`, body)
        .then((response) => {
          setBookedStatus({
            ...bookedStatus,
            [category]: !bookedStatus[category],
          });
        });
    } catch (e) {
      console.warn(e);
    }
  };

  const bookedButton = (category, id) => {
    if (bookedStatus[category.name] === false) {
      return (
        <Link to={`/task/${category.name}/${event_id}/${id}`}>
          <button
            className="book-button x"
            onClick={() => updateBookedStatus(category.name)}
          >
            {" "}
           Not Booked &#10007;
          </button>
        </Link>
      );
    } else {
      return (
        <button
          className="book-button check"
          onClick={() => updateBookedStatus(category.name)}
        >
          {" "}
         Booked &#10003;
        </button>
      );
    }
  };

  const editButton = (category) => {
    let button = "";
    if (bookedStatus[category]) {
      button = "Edit Vendor";
    } else {
      button = "Add Vendor";
    }

    return button;
  };

  return (
    <ul className="checklist checklist-ul">
      {categories.map((category, i) => {
        let id = categories.filter((point) => point.name === category.name)[0]
          .id;
        return (
          <li key={i} className="checklist check-listitem">
            <div className="book-buttons">
              {bookedButton(category, id)}
              <Link to={`/task/${category.name}/${event_id}/${id}`}>
                <button>{editButton(category.name)}</button>
              </Link>
            </div>

            <div>
              <button className="checklist-button">
                <Link
                  to={`/vendors/${category.name}`}
                  className="checklist-span"
                >
                  <span> {listItem(category.name)} </span> <span>&#187;</span>
                </Link>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Checklist;
