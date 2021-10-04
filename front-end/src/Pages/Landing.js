import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import call2action from "../assets/call2action.jpg"
import LandingPageImage3 from "../assets/LandingPageImage3.png"

export default function Landing() {
  return (
    <div className="Landing-Container">
      <div className="Landing">
        <section className="Landing-Item">
          <h1>EVENT( FUL ) &#127881;</h1>
          <img
          src={LandingPageImage3}
            // src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png"
            alt="placeholder"
          />
          <br/>
          <h2>OUR MISS( ION )</h2>
          <p>
            Here at Event(ful), we simplify all your booking needs and keep all
            of your event details in one location. From selecting a photographer
            to choosing your hors d’ oeuvres, its all right where you need it to
            be for your big day! Let’s get booking!
          </p>
        </section>
        <Link to="/signin" className="a">
          <h1>Start Planning Your Event</h1>
          <img src={call2action} alt="call2action" width="550px" display="block" className="call2action"/>
        </Link>
      </div>
      
    </div>
  );
}
