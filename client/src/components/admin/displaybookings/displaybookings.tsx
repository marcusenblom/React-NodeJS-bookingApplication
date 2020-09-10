import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import BookingClass from "../../../models/bookingModel";
import "./../../../scss/_displaybookings.scss";
import moment from "moment";
import SingleBooking from "./singleBooking/singleBooking";

interface IDisplayBookingsProps {
  bookings: BookingClass[];
  date: Date;
  getbooking(): void;
}

export default function DisplayBookings(props: IDisplayBookingsProps) {

  // Konvertera datumet på bokningsobjekten till en sträng innehållande ett moment-datum
  let shortDate = moment(props.date).format("LL");

  // Skapar upp en SingleBooking komponent för varje bokning i propslistan
  let bookingLi = props.bookings.map(b => {
    return (
      <SingleBooking bookingId={b.bookingId} user={b.customer} time={b.time} date={b.date} people={b.numberOfPeople} getbooking={props.getbooking} key={b.bookingId}></SingleBooking>
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
