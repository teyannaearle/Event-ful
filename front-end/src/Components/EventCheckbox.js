import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL.js";

const API = apiURL();

export default function EventCheckbox({ user_id }) {
  const { id } = useParams();
  const history = useHistory();

  const [eventForm, setEventForm] = useState({
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

  //pass props from eventForm to represent the name,date, budget, etc.
  const addToCheckedList = () => {
    const categories = Object.keys(eventForm);
    // console.log(categories);
    // const id = lastEvent.event_id + 1;

    for (const checked of categories) {
      if (eventForm[checked] === true) {
        const category = {
          task_name: checked,
        };
        axios
          .post(`${API}/checklist/${user_id}/${id}`, category).then((res) => {
            console.log(res.data.payload)
          })
          // .then((res) => history.push("/dashboard"))
          // .then((res) => console.log(res))
          .catch((c) => console.warn("catch", c));
      }
    }
  };

  const toggleState = (e) => {
    const val = e.target.value;
    setEventForm((prevState) => ({ ...prevState, [val]: !prevState[val] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCheckedList();
    history.push("/dashboard")
  };

  return (
    <section className="NewEvent">
      <form className=" col-h three-d" onSubmit={handleSubmit}>
        <span className="checkbox-span">
          <label className="check-container edit-checkbox">
            <input
              value="catering"
              type="checkbox"
              checked={eventForm.catering}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category">Caterer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="djs"
              type="checkbox"
              checked={eventForm.djs}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category">DJ</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="musicians"
              type="checkbox"
              checked={eventForm.musicians}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Musician</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="photographers"
              type="checkbox"
              checked={eventForm.photographers}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Photographer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_rental"
              type="checkbox"
              checked={eventForm.party_rental}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Party Rental</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="videographers"
              type="checkbox"
              checked={eventForm.videographers}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Videographer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="venues"
              type="checkbox"
              checked={eventForm.venues}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Venues</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="balloons"
              type="checkbox"
              checked={eventForm.balloons}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Balloon Services</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="floral"
              type="checkbox"
              checked={eventForm.floral}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Floral Designer</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_magician"
              type="checkbox"
              checked={eventForm.party_magician}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Magician</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_characters"
              type="checkbox"
              checked={eventForm.party_characters}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Character Actors</span>
          </label>
          <label className="check-container edit-checkbox">
            <input
              value="party_clown"
              type="checkbox"
              checked={eventForm.party_clown}
              onChange={toggleState}
            />
            <span className="checkmark"></span>
            <span className="category"> Clowns</span>
          </label>
        </span>
        <button className="three-d pg-buttons" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
