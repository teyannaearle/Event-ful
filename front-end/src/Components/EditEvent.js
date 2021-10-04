import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import "./EditEvent.css";
import CapitalizeEvent from "../Components/CapitalizeEvent";

const API = apiURL();

function EditEvent({ user_id }) {
  const { event_id } = useParams();
  const history = useHistory();
  const head = useRef("")

  const [event, setEvent] = useState({
    event_name: "",
    event_budget: 0,
    event_date: "",
    event_time: "",
  });

  const [checklist, setChecklist] = useState({
    catering: false,
    djs: false,
    musicians: false,
    photographers: false,
    party_rental: false,
    videographers: false,
    venues: false,
    balloons: false,
    floral: false,
    party_magician: false,
    party_characters: false,
    party_clown: false,
  });

  const initialState = useRef({
    catering: false,
    djs: false,
    musicians: false,
    photographers: false,
    party_rental: false,
    videographers: false,
    venues: false,
    balloons: false,
    floral: false,
    party_magician: false,
    party_characters: false,
    party_clown: false,
  });

  useEffect(() => {
    try {
      axios.get(`${API}/events/${user_id}/${event_id}`).then((res) => {
        const response = res.data.payload;
        setEvent({
          event_name: response.event_name,
          event_budget: response.event_budget,
          event_date: response.event_date.split("T")[0],
          event_time: response.event_time,
        });
        head.current = response.event_name
      });
    } catch (e) {
      console.error(e);
    }

    return () => {
      setEvent({
        event_name: "",
        event_budget: 0,
        event_date: "",
        event_time: "",
      });
    };
  }, [user_id, event_id]);

  useEffect(() => {
    
    try {
      axios.get(`${API}/checklist/${user_id}/${event_id}`).then((res) => {
        let initial = initialState.current;
        res.data.payload.map((service) => {
          return (initial[service.task_name] = true);
        });
        setChecklist(initial);
      });
    } catch (e) {
      console.error(e);
    }


    return () => {
      setChecklist({
        catering: false,
        djs: false,
        musicians: false,
        photographers: false,
        party_rental: false,
        videographers: false,
        venues: false,
        balloons: false,
        floral: false,
        party_magician: false,
        party_characters: false,
        party_clown: false,
      });
    };
  }, [user_id, event_id]);

  const updateEvent = () => {
    axios
      .put(`${API}/events/${user_id}/${event_id}`, event)
      .then(
        (res) => {
          const categories = Object.keys(initialState.current);
          for (const name of categories) {
            if (initialState.current[name] && !checklist[name]) {
              axios
                .delete(`${API}/checklist/${user_id}/${event_id}/${name}`)
                .then(
                  (res) => {},
                  (c) => console.warn("catch", c)
                )
                .catch((c) => {
                  console.error(c);
                });
            } else if (!initialState.current[name] && checklist[name]) {
              const category = {
                task_name: name,
              };
              axios
                .post(`${API}/checklist/${user_id}/${event_id}`, category)
                .then(
                  (res) => {},
                  (c) => console.warn("catch", c)
                )
                .catch((c) => {
                  console.error(c);
                });
            }
          }
        },
        (c) => console.warn("catch", c)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(checklist).includes(true)){
      updateEvent(event, event_id);
      history.push("/dashboard");
    } else {
      window.alert("Choose at least one vendor to add to your checklist.")
    }
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setChecklist((prevState) => ({ ...prevState, [val]: !prevState[val] }));
  };

  return (
    <>
      <h1>
        Edit{" "}
        {event.event_name
          ? CapitalizeEvent(head.current)
          : event.event_name}
      </h1>
      <div className="form-container">
        <form className="edit-eventform three-d" onSubmit={handleSubmit}>
          <input
            id="event_name"
            type="text"
            required
            value={event.event_name}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            id="event_budget"
            type="number"
            required
            value={event.event_budget}
            placeholder="$0.00"
            onChange={handleChange}
          />
          <input
            id="appt-time"
            type="time"
            required
            value={event.event_time}
            placeholder="Time"
            onChange={handleChange}
          />
          <input
            id="event_date"
            type="date"
            required
            value={event.event_date}
            placeholder="Date"
            onChange={handleChange}
          />

          <span className="checkbox-span">
            <label className="check-container edit-checkbox">
              <input
                value="catering"
                type="checkbox"
                checked={checklist["catering"]}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category">Caterer</span>
            </label>

            <label className="check-container edit-checkbox">
              <input
                value="djs"
                type="checkbox"
                checked={checklist["djs"]}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category">DJ</span>
            </label>
            <label className="check-container edit-checkbox">
              <input
                value="musicians"
                type="checkbox"
                checked={checklist["musicians"]}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Musician</span>
            </label>
            <label className="check-container edit-checkbox">
              <input
                value="photographers"
                type="checkbox"
                checked={checklist["photographers"]}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Photographer</span>
            </label>

            <label className="check-container edit-checkbox">
              <input
                value="party_rental"
                type="checkbox"
                checked={
                  checklist["party_rental"] ? checklist.party_rental : false
                }
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Party Rental</span>
            </label>

            <label className="check-container edit-checkbox">
              <input
                value="videographers"
                type="checkbox"
                checked={
                  checklist["videographers"] ? checklist.videographers : false
                }
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Videographers</span>
            </label>
            <label className="check-container edit-checkbox">
              <input
                value="venues"
                type="checkbox"
                checked={checklist["venues"] ? checklist.venues : false}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Venue</span>
            </label>
            <label className="check-container edit-checkbox">
              <input
                value="balloons"
                type="checkbox"
                checked={checklist.balloons ? checklist.balloons : false}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Balloon Services</span>
            </label>
            <label className="check-container edit-checkbox">
              <input
                value="floral"
                type="checkbox"
                checked={checklist["floral"] ? checklist.floral : false}
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Floral Designer</span>
            </label>

            <label className="check-container edit-checkbox">
              <input
                value="party_magician"
                type="checkbox"
                checked={
                  checklist["party_magician"] ? checklist.party_magician : false
                }
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Magician</span>
            </label>

            <label className="check-container edit-checkbox">
              <input
                value="party_characters"
                type="checkbox"
                checked={
                  checklist["party_characters"]
                    ? checklist.party_characters
                    : false
                }
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Character Actors</span>
            </label>

            <label className="check-container edit-checkbox">
              <input
                value="party_clown"
                type="checkbox"
                checked={
                  checklist["party_clown"] ? checklist.party_clown : false
                }
                onChange={toggleState}
              />
              <span className="checkmark"></span>
              <span className="category"> Clowns</span>
            </label>
          </span>
          <button className="pg-buttons">Save Changes</button>
          <Link to={`/dashboard/${user_id}`}>
            <button className="pg-buttons">Cancel Edit</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default EditEvent;
