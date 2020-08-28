import React, { useState, ChangeEvent, FormEvent } from "react";
import "./contact.scss";

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

export default function ContactComponent(props: IContactProps) {
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

  function updateParent(e: FormEvent) {
    e.preventDefault();
    props.updateUser(firstName, lastName, email, phoneNumber);
  }

  return (
    <div className="contact-container">
      <h2>FML</h2>
      <hr />

      <p className="text-left">
        Dinner - FML Restaurant Vasagatan can be found at Tulegatan
      </p>
      <hr />
      <p className="text-left">Reservation 1-15 guests</p>
      <hr />
      <div className="date-guest-time-container">
        <div className="presentation">
          <p>Date</p>
          <p>
            {props.date.getDate()}/{props.date.getMonth() + 1}
          </p>
        </div>

        <div className="presentation">
          <p>Guests</p>
          <p>{props.people.toString()}</p>
        </div>

        <div className="presentation">
          <p>Time</p>
          <p>{props.sitting.toString()}.00</p>
        </div>
      </div>
      <hr />

      <form onSubmit={updateParent}>
        <div className="input-one">
          <label htmlFor="firstName"></label>
          <input
            className="name"
            type="text"
            name="firstName"
            placeholder="Firstname"
            id="theFirstName"
            onChange={updateFirstName}
            value={firstName}
            required
          />
          <br />

          <label htmlFor="lastName"></label>
          <input
            className="lastname"
            type="text"
            name="lastName"
            placeholder="Lastname"
            onChange={updateLastName}
            value={lastName}
            required
          />
          <br />
        </div>

        <div className="input-one">
          <label htmlFor="email"></label>
          <input
            className="email"
            type="text"
            name="email"
            placeholder="email@adress.com"
            onChange={updateEmail}
            value={email}
            required
          />
          <br />

          <label htmlFor="phoneNumber"></label>
          <input
            className="phonenumber"
            type="number"
            name="phoneNumber"
            placeholder="+46 111 1111 111"
            onChange={updatePhoneNumber}
            value={phoneNumber}
            required
          />
          <br />
        </div>

        {/* <div className="request-box">
              <input className="request" type='text' name='text' placeholder="request" />
              </div> */}

        <div className="">
          <div className="">
            <div className=""></div>
          </div>
        </div>

        <button type="submit" /* onClick={updateParent} */>Boka!</button>
      </form>
    </div>
  );
}
