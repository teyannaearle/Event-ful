import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useParams, useHistory } from "react-router-dom";
import Checklist from "../Components/EventPage/Checklist";
import Budget from "../Components/EventPage/Budget";
import Timer from "../Components/EventPage/Timer";
import { apiURL } from "../util/apiURL";
import CapitalizeEvent from "../Components/CapitalizeEvent";
import axios from "axios";
import NavBar from "../Components/NavBar/NavBar";

const api = apiURL();

export default function Event({ formatter, user_id }) {
  const { event_id } = useParams();
  const [eventName, setEventName] = useState("");
  const [categories, setCategories] = useState([]);
  const [budget, setBudget] = useState(0);
  const [shownCost, setShownCost] = useState({});
  const history = useHistory();
  const loggedInUser = useContext(UserContext);
  const  accessToken  = loggedInUser.currentUser ? loggedInUser.currentUser.accessToken : null

  useEffect(() => {
    if (user_id && accessToken) {
      try {
        axios.get(`${api}/events/${user_id}/${event_id}` , {
          headers: {
            Authorization: "Bearer " + accessToken,
          }}).then((response) => {
          const data = response.data.payload;
          setEventName(data.event_name);
          setBudget(data.event_budget);
        });
      } catch (e) {
        console.error(e);
      }

      try {
        axios
          .get(`${api}/checklist/${user_id}/${event_id}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            }})
          .then((response) => {
            const data = response.data.payload;
            const vendorCategories = data.map((point) => {
              return {
                name: point.task_name,
                booked: point.is_completed,
                cost: point.task_cost,
                id: point.task_id,
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
        console.error(e);
      }
    }

    return () => {
      setEventName("");
      setBudget(0);
      setShownCost({});
      setCategories([]);
    };
  }, [event_id, user_id, accessToken]);

  const updateCost = (body, category) => {
    try {
      axios
        .put(`${api}/checklist/cost/${user_id}/${event_id}`, body, {
          headers: {
            Authorization: "Bearer " + accessToken,
          }})
        .then((response) => {
          setShownCost({ ...shownCost, [category]: body.task_cost });
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <NavBar />
      <button
        className="pg-buttons back-button"
        onClick={() => history.push("/dashboard")}
      >
        {" "}
        &#x21e6; Back to Dashboard
      </button>

      <div className="event-page page">
        <h1 className="pg-head">
          {eventName ? CapitalizeEvent(eventName) : null}
        </h1>
        <div className="eventpage-container ">
          <div id="checklist-container" className="evenpg-containers drop">
            <h2 className="col-h">( Booked ? )</h2>
            <h2 className="col-h">( Find Vendors )</h2>
            <Checklist
              categories={categories}
              user_id={user_id}
              event_id={event_id}
              updateCost={updateCost}
              eventName={eventName}
            />
          </div>

          <div id="budget-container" className="evenpg-containers drop">
            <h2 className="col-h">( Budget: {formatter.format(budget)} )</h2>
            <Budget
              categories={categories}
              budget={budget}
              shownCost={shownCost}
              formatter={formatter}
            />
          </div>

          <div id="countdown-container" className="evenpg-containers drop">
            <h2 className="col-h">( Countdown to {CapitalizeEvent(eventName)} !)</h2>
            <Timer user_id={user_id} />
          </div>
        </div>
      </div>
    </>
  );
}
