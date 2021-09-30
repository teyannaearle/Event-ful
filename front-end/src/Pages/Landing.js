import React, { useContext } from "react";
import "./Landing.css";
import { Link, Route } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";

export default function Landing() {
  const user = useContext(UserContext);
  if (user) {
    console.log(`Landing user is ${user.displayName}`)
  } else {console.log('no user')}
  
  
  return (
    <div className="Landing">
      <section className="Landing-Item">
        {/* <h1>EVENT( FUL )</h1> */}
        <h1>OUR MISS( ION )</h1>

        <p>
          Here at Event(ful), we simplify all your booking needs and keep all of
          your event details in one location. From selecting a photographer to
          choosing your hors d’ oeuvres, its all right where you need it to be
          for your big day! Let’s get booking!
        </p>
      </section>
      <Link to="/signin" className="call2action three-d">
        <h1>Lets get booking</h1>
      </Link>
    </div>
  );
}
