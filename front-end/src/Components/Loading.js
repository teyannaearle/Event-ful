import React from "react";
import discoBall from "../assets/giphy.gif";

function Loading() {
  return (
    <div className="loading">
      <img src={discoBall} alt="loading" width="300px" />
    </div>
  );
}

export default Loading;
