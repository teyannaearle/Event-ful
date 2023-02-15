import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div>
      <div>
        <h1 className="brand drop">
          <Link to="/">Event(ful) &#127881;</Link>
        </h1>
      </div>
    </div>
  );
}

export default Banner;
