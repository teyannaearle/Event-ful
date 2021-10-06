import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div>
      <Link to="/" className="navbar-logo">
        <h1 className="brand">Event(ful) &#127881;</h1>
      </Link>
    </div>
  );
}

export default Banner;
