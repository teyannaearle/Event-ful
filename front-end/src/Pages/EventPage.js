import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Checklist from "../Components/EventPage/Checklist";
import Budget from "../Components/EventPage/Budget";
import Timer from "../Components/EventPage/Timer";
import { apiURL } from "../util/apiURL";
import axios from "axios";

const api = apiURL();

export default function Event({formatter}) {
  const { user_id, event_id } = useParams();
  const [eventName, setEventName] = useState("");
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(0);
  const [shownCost, setShownCost] = useState({});

  useEffect(() => {
    try {
      axios.get(`${api}/events/${user_id}/${event_id}`).then((response) => {
        const data = response.data.payload;
        setEventName(data.event_name);
        setBudget(data.event_budget);
      });
    } catch (e) {
      console.error(e)
    }

    try {
      axios.get(`${api}/checklist/${user_id}/${event_id}`).then((response) => {
        const data = response.data.payload;
        const vendorCategories = data.map((point) => {
          return {
            name: point.task_name,
            booked: point.is_completed,
            cost: point.task_cost,
            id: point.task_id
          };
        });
        let vendorCategories2 = {};
        for (let category of data) {
          vendorCategories2[category.task_name] = category.task_cost;
        }

        setShownCost(vendorCategories2);
        setCategories(vendorCategories);
      });
    } catch (e) {
      console.error(e)
    }

    return () => {
      setEventName("");
      setBudget(0);
      setShownCost({});
      setCategories([]);
    }
  }, [event_id, user_id]);


  const updateCost = (body, category) => {
    try {
      axios
        .put(`${api}/checklist/cost/${user_id}/${event_id}`, body)
        .then((response) => {
          setShownCost({ ...shownCost, [category]: body.task_cost });
        });
    } catch (e) {
      console.error(e)
    }
  };


  return (
    <div className="event-page page">
      <h1 className="pg-head">{eventName}</h1>
      <div className="eventpage-container">
        <div id="checklist-container" className="evenpg-containers">
          <h2 className="col-h">Booked?</h2>
          <h2 className="col-h">Vendors:</h2>
          <Checklist
            categories={categories}
            user_id={user_id}
            event_id={event_id}
            updateCost={updateCost}
          />
        </div>

        <div id="budget-container" className="evenpg-containers">
          <h2 className="col-h">Budget: {formatter.format(budget)}</h2>
          <Budget
            categories={categories}
            budget={budget}
            shownCost={shownCost}
            formatter={formatter}
          />
        </div>

        <div id="countdown-container" className="evenpg-containers">
          <h2 className="col-h">Countdown to {eventName} !</h2>
          <Timer />
        </div>
      </div>
    </div>
  );
}
