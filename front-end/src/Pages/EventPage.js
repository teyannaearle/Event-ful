import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Checklist from "../Components/Checklist";
import Budget from "../Components/Budget";
import Timer from "../Components/Timer";
import { apiURL } from "../util/apiURL";
import axios from "axios";

const api = apiURL();

export default function Event() {
  const [eventName, setEventName] = useState();
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(0);
  const { user_id, event_id } = useParams();
  const [shownCost, setShownCost] = useState({});
  const formatter = new Intl.NumberFormat("en-US" , {
    style: "currency",
    currency: "USD"
  });

  useEffect(() => {
    try {
      axios.get(`${api}/events/${user_id}/${event_id}`).then((response) => {
        const data = response.data.payload;
        setEventName(data.event_name);
        setBudget(data.event_budget);
      });
    } catch {}

    try {
      axios.get(`${api}/checklist/${user_id}/${event_id}`).then((response) => {
        const data = response.data.payload;
        const vendorCategories = data.map((point) => {
          return {
            name: point.task_name,
            booked: point.is_completed,
            cost: point.task_cost,
          };
        });
        let vendorCategories2 = {};
        for (let category of data) {
          vendorCategories2[category.task_name] = category.task_cost;
        }

        setShownCost(vendorCategories2);
        setCategories(vendorCategories);
      });
    } catch {}

  }, [event_id, user_id]);


  const updateCost = (body, category) => {
    try {
      axios
        .put(`${api}/checklist/cost/${user_id}/${event_id}`, body)
        .then((response) => {
          setShownCost({ ...shownCost, [category]: body.task_cost });
        });
    } catch {}
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
