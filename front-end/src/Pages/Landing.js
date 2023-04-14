import React, { useContext } from "react";
import "../Components/Landing/Landing.css";
import { Link } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import call2action from "../assets/call2action.jpg";

export default function Landing() {
  const user = useContext(UserContext);

  return (
    <div className="Landing-Container">
      <div className="Landing">
        <span>
          <div className="a">
            <Link to={user ? "/dashboard" : "/signin"}>
              <img
                src={call2action}
                alt="call2action"
                display="block"
                className="call2action drop"
              />
            </Link>
          </div>
        </span>
        <h2 className="col-h">( Our Mission )</h2>
        <span>
          <p>
            Here at Event(ful), we simplify all of your planning needs and keep
            all of your event details in one location. From finding vendors to
            keeping track of your budget, its all right where you need it to be
            for your big day! Let’s get planning!
          </p>
        </span>
      </div>
    </div>
  );
}
