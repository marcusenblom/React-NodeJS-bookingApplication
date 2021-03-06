import React from "react";
import "./../../scss/main.scss";
import startimg from "../../image/unpoco1.jpg";

export default function Home() {
  return (
    <div className="container">
      <img className="welcome-img" src={startimg} alt="pizza" />

      <div className="booking-table">
        <a href="/booking">
          <button className="booking-table-btn">Reserve a table</button>
        </a>
      </div>
    </div>
  );
}
