import React from "react";
import "./Landing.css";
import { Link, Route } from "react-router-dom";
export default function Landing() {
  return (
    <div className="Landing">
        
      <section className="Landing-Item">
        <h1>OUR MISS( ION )</h1>

        <p>
          Here at Event(ful), we simplify all your booking needs and keep all of
          your event details in one location. From selecting a photographer to
          choosing your hors d’ oeuvres, its all right where you need it to be
          for your big day! Let’s get booking!
        </p>
      </section>
      <Link to="/signin"className="call2action three-d">
          <h1>Start Planning Your Next Event</h1>
    </Link>
    </div>
  );
}
