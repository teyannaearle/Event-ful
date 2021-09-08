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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState(0);
  const { user_id, event_id } = useParams();

  useEffect(() => {
    // categories will eventually come from  /checklist/:user_id/:event_id
    // Name and budget will eventually come from an api call to /events/:user_id/:event_id

    try {
      axios.get(`${api}/events/${user_id}/${event_id}`)
        .then ((response) => {
          const data = response.data.payload
          setEventName(data.event_name)
          setBudget(data.event_budget)
          // setDate(data.event_date.slice(0,10))
          // setTime(data.event_time)
        }) 
    } catch {

    }

    try {
      axios.get(`${api}/checklist/${user_id}/${event_id}`)
        .then((response) => {
          const data = response.data.payload
          const vendorCategories = data.map(point => point.task_name)
          setCategories(vendorCategories)
          // console.log(vendorCategories)
        })
    } catch {

    }

    // setEventName("Lisa's Baby Shower");
    // let budget = "1000";
    // setBudget(Number(budget));

    // setCategories([
    //   "catering",
    //   "djs",
    //   "musicians",
    //   "partyequipmentrentals",
    //   "eventphotography",
    //   "videographers",
    //   "venues",
    //   "balloonservices",
    //   "floraldesigners",
    // ]);
  }, []);

  useEffect(() => {}, []);
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
        {/* <Timer date={date} time={time}/> */}
      </div>
    </div>
  );
}
