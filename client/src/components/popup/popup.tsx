import React, { useState } from "react";


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
  class userClass {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    constructor(
      fname: string,
      lname: string,
      email: string,
      phoneNumber: number
    ) {
      this.firstName = fname;
      this.lastName = lname;
      this.email = email;
      this.phoneNumber = phoneNumber;
    }
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [user, setUser] = useState(new userClass("", "", "", 0));

  return (
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

      <div className="information">
        <div className="your-information">
          <p>Your information</p>
          <p>{JSON.stringify(user)}</p>
        </div>
        <div className="booking-information">
          <p>Booking information</p>
          <p>FML</p>
          <p>#1</p>
        </div>
      </div>
    </div>
  );
}
