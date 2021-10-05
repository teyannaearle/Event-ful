import React from "react";
import { Link } from "react-router-dom";

export default function FourOFour() {
  return (
    <div className="NotFound page">
      <h1 className="pg-head">Sorry, no page found</h1>
      <Link to="/" className="pg-buttons">
        Click here to go to homepage
      </Link>
    </div>
  );
}
