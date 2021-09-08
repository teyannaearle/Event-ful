import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Checklist from "../Components/Checklist";
import Budget from "../Components/Budget";
import Timer from "../Components/Timer";
import { apiURL } from "../util/apiURL";
import axios from "axios";

const api = apiURL()

export default function Event() {
  const [eventName, setEventName] = useState();
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(0);
  const { user_id, event_id } = useParams();

  useEffect(() => {
    try {
      axios.get(`${api}/events/${user_id}/${event_id}`)
        .then ((response) => {
          const data = response.data.payload
          setEventName(data.event_name)
          setBudget(data.event_budget)
        }) 
    } catch {

    }

    try {
      axios.get(`${api}/checklist/${user_id}/${event_id}`)
        .then((response) => {
          const data = response.data.payload
          const vendorCategories = data.map(point => point.task_name)
          setCategories(vendorCategories)
        })
    } catch {

    }
  }, [event_id, user_id]);

  return (
    <div>
      <h1>{eventName}</h1>

      <div>
        <h2>Vendor Checklist:</h2>
        <Checklist categories={categories} />
      </div>

      <div>
        <h2>Budget</h2>
        <Budget categories={categories} budget={budget} />
      </div>

      <div>
        <h2>Countdown to {eventName} !</h2>
        <Timer />
      </div>
    </div>
  );
}
