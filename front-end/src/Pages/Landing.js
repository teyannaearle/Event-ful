import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="Landing-Container">
      <div className="Landing">
        <section className="Landing-Item">
          <h1>EVENT( FUL ) &#127881;</h1>
          <img
            src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png"
            alt="placeholder"
          />
          <h2>OUR MISS( ION )</h2>
          <p>
            Here at Event(ful), we simplify all your booking needs and keep all
            of your event details in one location. From selecting a photographer
            to choosing your hors d’ oeuvres, its all right where you need it to
            be for your big day! Let’s get booking!
          </p>
        </section>
        <Link to="/signin" className="call2action three-d">
          <h1>Lets get booking</h1>
        </Link>
      </div>
    </div>
  );
}
