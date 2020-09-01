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

  class userClass {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    constructor(fname: string, lname: string, email:string, phoneNumber: number){
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
              <p>{JSON.stringify(user)}</p>
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
