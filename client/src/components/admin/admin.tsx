import React, { useState } from "react";
import axios from "axios";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "../nav/nav";
import DisplayBookings from "./displaybookings/displaybookings";

export default function Admin() {
  const [restaurantId, setRestaurantId] = useState(1);
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  function getBookings() {
    axios.get(`http://localhost:4000/getBookings/${date}`).then(axiosObject => {
      setBookings(axiosObject.data);
      
    });
  }

  function handleChange(d: Date) {
    setDate(d);
  }

  return (
    <div>
      <Nav />
      <h2>Admin</h2>
      <label htmlFor="dateInput">Select date:</label>
      <Datepicker
        selected={date}
        onChange={handleChange}
        isClearable
        dateFormat="yyyy-MM-dd"
      />
      <button type="button" onClick={getBookings}>
        Get bookings
      </button>
      <DisplayBookings
        getbooking={getBookings}
        date={date}
        bookings={bookings}
      ></DisplayBookings>
    </div>
  );
}
