import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookingClass from "../../../models/bookingModel";
import "./../../../scss/_displaybookings.scss";
import moment from "moment";
import Axios from "axios";

interface IDisplayBookingsProps {
  bookings: BookingClass[];
  date: Date;
}

export default function DisplayBookings(props: IDisplayBookingsProps) {
  const [bookings, setBookings] = useState([]);

  // Konvertera datumet på bokningsobjekten till en sträng innehållande ett moment-datum
  let shortDate = moment(props.date).format("LL");

  function removeBooking(bookingId: number) {
    Axios.delete("http://localhost:4000/deleteBooking/" + bookingId).then(
      res => {
        updateAdmin();
      }
    );
  }
  function updateAdmin() {
    Axios.get("http://localhost:4000").then(res => {
      setBookings(res.data);
    });
  }

  let bookingLi = props.bookings.map(b => {
    return (
      <div className="booking" key={b.bookingId}>
        <div className="id-wrapper booking-wrapper">
          <div className="booking-id">
            Booking ID: <strong>{b.bookingId}</strong>
          </div>
          <div className="customer-id">
            User ID: <strong>{b.customerId}</strong>
          </div>
        </div>

        <div className="time-people-wrapper booking-wrapper">
          <div className="time">
            Time: <strong>{b.time}.00</strong>
          </div>
          <div className="people">
            People: <strong>{b.numberOfPeople}</strong>
          </div>
        </div>

        <div className="button-wrapper booking-wrapper">
          <button>Change</button>
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
