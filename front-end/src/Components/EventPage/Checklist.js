import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { apiURL } from "../../util/apiURL";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";

const api = apiURL();

function Checklist({ categories, user_id, event_id, updateCost, eventName }) {
  const [bookedStatus, setBookedStatus] = useState({});
  const history = useHistory();
  const loggedInUser = useContext(UserContext);
  const accessToken  = loggedInUser.currentUser ? loggedInUser.currentUser.accessToken : null

  useEffect(() => {
    const booked = {};

    for (let category of categories) {
      booked[category.name] = category.booked;
    }
    setBookedStatus(booked);
    return () => {
      setBookedStatus({});
    };
  }, [categories]);

  const updateBookedStatus = (category) => {
    let body = {
      is_completed: !bookedStatus[category],
      task_name: category,
      user_id: user_id,
      event_id: event_id,
    };

    if (!bookedStatus[category] === false) {
      try {
        axios
          .delete(`${api}/booked/${user_id}/${event_id}/${category}` , {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            let checklistBody = {
              task_cost: 0,
              task_name: category,
            };
            updateCost(checklistBody, category);
          });
      } catch (e) {
        console.warn(e);
      }
    }

    try {
      axios
        .put(`${api}/checklist/${user_id}/${event_id}`, body , {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
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
          <label className="check-container tasklist">
            <input
              onChange={() => updateBookedStatus(category.name)}
              type="checkbox"
              checked={
                bookedStatus[category.name]
                  ? bookedStatus[category.name]
                  : false
              }
            ></input>
            <span className="checkmark"></span>
          </label>
        </Link>
      );
    } else {
      return (
        <label className="check-container tasklist"> 
        <input
          onChange={() => updateBookedStatus(category.name)}
          type="checkbox"
          checked={bookedStatus[category.name] ? bookedStatus[category.name] : false}        >
        </input>
        <span className="checkmark"></span>
        </label>
      );
    }
  };

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
      case "party_magician":
        item = "Find a Magician";
        break;
      case "party_characters":
        item = "Find a Character Actor";
        break;
      case "party_clown":
        item = "Find a Clown";
        break;
      default:
        item = "";
    }

    return item;
  };

  return (
    <ul
      className={`checklist ${
        categories.length < 6 ? "small-ul" : "checklist-ul"
      } `}
    >
      {categories.map((category, i) => {
        let id = categories.filter((point) => point.name === category.name)[0]
          .id;
        return (
          <li key={i} className="checklist check-listitem">
            <div className="book-buttons book-grid">
              {bookedButton(category, id)}
              <Link to={`/task/${category.name}/${event_id}/${id}`}>
                <button className={`eventpg-buttons drop ${bookedStatus[category.name] ? "check" : "x"}`}>
                  {bookedStatus[category.name] ? (
                    <>Edit Vendor</>
                  ) : (
                    <>Add Vendor </>
                  )}
                </button>
              </Link>
            </div>

            <div>
              <button className="checklist-button drop ">
                <Link
                  to={`/vendors/${category.name}`}
                  className="checklist-span "
                >
                  <span> {listItem(category.name)} </span> <span>&#187;</span>
                </Link>
              </button>
            </div>
          </li>
        );
      })}
      <button
        className="book-buttons check drop"
        id="all-booked"
        onClick={() => history.push(`/booked/${event_id}/${eventName}`)}
      >
        {" "}
        View All Booked Vendors for {eventName}
      </button>
    </ul>
  );
}

export default Checklist;
