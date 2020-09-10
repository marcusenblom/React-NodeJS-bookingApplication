import React, { useState, ChangeEvent } from "react";
import Axios from "axios";
import userClass from "../../../../models/userModel";

interface ISingleBookingsProps {
  bookingId: number;
  user: userClass;
  time: number;
  date: Date;
  people: number;
  getbooking(): void;
}

export default function SingleBooking(props: ISingleBookingsProps) {

  const [time, setTime] = useState(props.time);
  const [date, setDate] = useState(props.date);
  const [people, setPeople] = useState(props.people);

  function updateTime(e: ChangeEvent<HTMLInputElement>){
    setTime(parseInt(e.target.value));
  }

  function updatePeople(e: ChangeEvent<HTMLInputElement>){
    setPeople(parseInt(e.target.value));
  }

  function removeBooking() {
    Axios.delete("http://localhost:4000/deleteBooking/" + props.bookingId).then(
      res => {
        props.getbooking();
      }
    );
  }

  function editBooking() {
    Axios.post(`http://localhost:4000/editBooking/${props.bookingId}/${time}/${people}`).then(
      res => {
        props.getbooking();
      }
    );
  }

  return (
    <div className="booking" key={props.bookingId}>
      <div className="id-wrapper booking-wrapper">
        <div className="booking-id">
          Booking ID: {props.bookingId}
        </div>
        <div className="customer-id">
          User: {props.user.email}
        </div>
      </div>

      <div className="time-people-wrapper booking-wrapper">
        <div className="time">
          Time:
          <input type="text" onChange={updateTime} value={time}/>
        </div>
        <div className="people">
          People:
          <input type="number" onChange={updatePeople} value={people}/>
        </div>
      </div>

      <div className="button-wrapper booking-wrapper">
        <button type="button" onClick={editBooking}>Update</button>
        <button type="button" onClick={removeBooking}>
          Remove
        </button>
      </div>
    </div>
  );
}
