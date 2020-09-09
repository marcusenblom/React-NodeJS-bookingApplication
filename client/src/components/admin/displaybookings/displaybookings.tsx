import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookingClass from "../../../models/bookingModel";
import "./../../../scss/_displaybookings.scss";
import moment from "moment";
import Axios from "axios";

interface IDisplayBookingsProps {
  bookings: BookingClass[];
  date: Date;
  getbooking(): void;
}

export default function DisplayBookings(props: IDisplayBookingsProps) {
  const [bookings, setBookings] = useState([]);

  // Konvertera datumet på bokningsobjekten till en sträng innehållande ett moment-datum
  let shortDate = moment(props.date).format("LL");

  function removeBooking(bookingId: number) {
    Axios.delete("http://localhost:4000/deleteBooking/" + bookingId).then(
      res => {
          
        props.getbooking();
      }
    );
  }

  function editBookings() {
    
  }

  
  let bookingLi = props.bookings.map(b => {
    return (
      <div className="booking" key={b.bookingId}>
        <div className="id-wrapper booking-wrapper">
          <div className="booking-id">
            Booking ID: {b.bookingId}
          </div>
          <div className="customer-id">
            User: {b.customerId.email}
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
          <button type="button" onClick={() => editBookings()}>Change</button>
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
