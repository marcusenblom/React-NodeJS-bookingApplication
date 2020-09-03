import React from "react";
import panoramapizza from "../../image/panoramapizza.png";

export default function Nav() {
  return (
    <div className="nav-container">
      <img className="panoramapizza" src={panoramapizza} alt="pizza" />
      <h1>FML Restaurant</h1>
    </div>
  );
}
