import React, { useState, ChangeEvent } from "react";
import "./popup.scss";

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

export default function Popup(props: IContactProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();

  function updateFirstName(e: ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }
  function updateLastName(e: ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }
  function updateEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function updatePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(parseInt(e.target.value));
  }

  function updateParent(e: any) {
    // e.preventDefault();
    props.updateUser(firstName, lastName, email, phoneNumber);
    console.log(firstName, lastName, email, phoneNumber);
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-header">
        <span className="close-modal-btn">X</span>
        <p>Thank you for your booking!</p>
        <p>Check your inbox shortly for a confirmation email.</p>
      </div>
      <hr />
      <div className="popup-content">
        <div className="popup-body">
          <div className="popup-date-guest-time">
            <p>Your information</p>
            <p>
              Date
              {props.date.getDate()}/{props.date.getMonth() + 1}
            </p>
            <p>Guests {props.people.toString()}</p>
            <p>Sitting {props.sitting.toString()}</p>
          </div>
          <hr />

          <div className="information">
            <div className="your-information">
              <p>Your information</p>
            </div>
            <div className="booking-information">
              <p>Booking information</p>
              <p>FML</p>
              <p>#1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
