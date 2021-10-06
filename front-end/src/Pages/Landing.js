import React, { useContext } from "react";
import "../css/Landing.css";
import { Link } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import call2action from "../assets/call2action.jpg";
import LandingPageImage3 from "../assets/LandingPageImage3.png";

export default function Landing() {
  const user = useContext(UserContext);

  return (
    <div className="Landing-Container">
      <div className="Landing">
        <section className="Landing-Item">
          <img src={LandingPageImage3} alt="placeholder" />
          <br />
        </section>
        <div className="a">
          <h2>Start Planning Your Event</h2>
          <Link to={user ? "/dashboard" : "/signin"}>
            <img
              src={call2action}
              alt="call2action"
              display="block"
              className="call2action"
            />
          </Link>
        </div>
        <h2>OUR MISS( ION )</h2>
        <p>
          Here at Event(ful), we simplify all your planning needs and keep all
          of your event details in one location. From selecting a photographer
          to choosing your hors d’ oeuvres, its all right where you need it to
          be for your big day! Let’s get planning!
        </p>
      </div>
    </div>
  );
}
