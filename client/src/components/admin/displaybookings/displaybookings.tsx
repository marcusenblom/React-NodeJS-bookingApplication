import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookingClass from "../../../models/bookingModel";
import "./../../../scss/_displaybookings.scss";
import moment from "moment";
import Axios from "axios";
import { Link } from "react-router-dom";

interface IDisplayBookingsProps {
  bookings: BookingClass[];
  date: Date;
  getbooking(): void;
}

export default function DisplayBookings(props: IDisplayBookingsProps) {
  // Konvertera datumet på bokningsobjekten till en sträng innehållande ett moment-datum
  let shortDate = moment(props.date).format("LL");

  function removeBooking(bookingId: number) {
    Axios.delete("http://localhost:4000/deleteBooking/" + bookingId).then(
      res => {
        props.getbooking();
      }
    );
  }
  

  let bookingLi = props.bookings.map(b => {
    return (
      <div className="booking" key={b.bookingId}>
        <div className="id-wrapper booking-wrapper">
          <div className="booking-id">
            Booking ID: {b.bookingId}
          </div>
          <div className="customer-id">
            User: {b.customer.email}
          </div>
        </div>

        <div className="time-people-wrapper booking-wrapper">
          <div className="time">
            Time: {b.time}.00
          </div>
          <div className="people">
            People: {b.numberOfPeople}
          </div>
        </div>

        <div className="button-wrapper booking-wrapper">
          <Link to={"/edit/" + b.bookingId}>
            <button type="button">Change</button>
          </Link>
          <button type="button" onClick={() => removeBooking(b.bookingId)}>
            Remove
          </button>
        </div>
      </div>
    );
  });

  let header = "";
  if (props.bookings.length >= 1) {
    header = `Showing bookings for date: ${shortDate}`;
  } else {
    header = "No bookings can be found for that specific date";
  }

  return (
    <div className="all-bookings">
      <div className="date-header">
        <h3>{header}</h3>
      </div>
      {bookingLi}
    </div>
  );
}
