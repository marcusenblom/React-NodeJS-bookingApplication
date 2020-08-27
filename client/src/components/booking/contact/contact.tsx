import React, { useState, ChangeEvent, FormEvent } from 'react';
import './contact.scss';


interface IContactProps {
    date: Date,
    people: number,
    sitting: number[],
    updateUser(firstName: string, lastName: string, email: string, phoneNumber: number): void;
}

export default function ContactComponent(props: IContactProps) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);

    function updateFirstName(e: ChangeEvent<HTMLInputElement>) {
        setFirstName(e.target.value);
    };
    function updateLastName(e: ChangeEvent<HTMLInputElement>) {
        setLastName(e.target.value);
    };
    function updateEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    };
    function updatePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(parseInt(e.target.value));
    };

    function updateParent(e: FormEvent) {
        e.preventDefault();
        props.updateUser(firstName, lastName, email, phoneNumber);
    }


    return (
        <div className="contact-container">
          <h2>FML</h2>
          <hr />
    
          <p className="text-left">
            Dinner - Restaurant Vasagatan can be found on Tulegatan
          </p>
          <hr />
          <p className="text-left">Reservation 1-15 guests</p>
          <hr />
          <div className="date-guest-time-container">
            <p>{props.date.toString()}</p>
            <p>{props.people.toString()}</p>
            <p>{props.sitting.toString()}.00</p>
          </div>
          <hr />

          <form onSubmit={updateParent}>
            <label>
              First name:
              <input type="text" name="firstName" onChange={updateFirstName} value={firstName} required/>
            </label>
            <label>
              Last name:
              <input type="text" name="lastName" onChange={updateLastName} value={lastName} required/>
            </label>
            <label>
              Email:
              <input type="text" name="email" onChange={updateEmail} value={email} required/>
            </label>
            <label>
              Phone Number:
              <input type="text" name="phoneNumber" onChange={updatePhoneNumber} value={phoneNumber} required/>
            </label>
            <button type='submit' /* onClick={updateParent} */>Boka!</button>
          </form>
        </div>
      );
}