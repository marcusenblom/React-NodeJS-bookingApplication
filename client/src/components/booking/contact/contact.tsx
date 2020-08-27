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
            Dinner - FML Restaurant Vasagatan can be found on Tulegatan
          </p>
          <hr />
          <p className="text-left">Reservation 1-15 guests</p>
          <hr />
          <div className="date-guest-time-container">
            <div className='presentation'>
              <p>Date</p>
              <p>{props.date.getDate()}/{props.date.getMonth() + 1}</p>
            </div>

            <div className='presentation'>
              <p>Guests</p>
              <p>{props.people.toString()}</p>
            </div>

            <div className='presentation'>
              <p>Time</p>
              <p>{props.sitting.toString()}.00</p></div>
          </div>
          <hr />

          <form onSubmit={updateParent}>

            <label htmlFor='firstName'>First name:</label>
              <input type='text' name='firstName' id='theFirstName' onChange={updateFirstName} value={firstName} required />
            <br/>

            <label htmlFor='lastName'>Last name:</label>
              <input type='text' name='lastName' onChange={updateLastName} value={lastName} required />
            <br/>

            <label htmlFor='email'>Email:</label>
              <input type='text' name='email' onChange={updateEmail} value={email} required />
            <br/>

            <label htmlFor='phoneNumber'>Phone Number:</label>
              <input type='number' name='phoneNumber' onChange={updatePhoneNumber} value={phoneNumber} required />
              <br/>

            <button type='submit' /* onClick={updateParent} */>Boka!</button>
          </form>
        </div>
      );
}