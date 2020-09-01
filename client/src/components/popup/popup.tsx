import React, { useState, ChangeEvent, constructor, Component } from "react";
import "./popup.scss";
import { render } from "@testing-library/react";


interface IContactProps {
  date: Date;
  people: number;
  sitting: number[];
  updateUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number
  ): void;
}


export default function Popup( props: IContactProps) {


  return (
    <div>
      <button>Open modal</button>

    <div className="popup-container">
      <p className="text-center">Thank you for your booking!</p>
      <p className="text-center">
        Check your inbox shortly for a confirmation email.
      </p>
      <hr />

      <div className="date-guest-time-container">
        <div className="date">
          <p>Date</p>
          <p>
            {props.date.getDate()}/{props.date.getMonth() + 1}
          </p>
        </div>

        <div className="guest">
          <p>Guests</p>
          <p>{props.people.toString()}</p>
        </div>

        <div className="time">
          <p>Time</p>
          <p>{props.sitting.toString()}.00</p>
        </div>
      </div>
      <hr />

      <div className="guest-booking-container">
        <div className="gust">
          <p>Guest information</p>
          <p> {/* <p>{JSON.stringify(user)}</p> */}</p>
        </div>
        <div className="booking">
          <p>Booking information</p>
          <p>FML</p>
          <p>#1</p>
        </div>
      </div>
    </div>
    </div>
  );
}


