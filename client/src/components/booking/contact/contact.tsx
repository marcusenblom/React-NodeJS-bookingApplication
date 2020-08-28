import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import './contact.scss';


interface IContactProps {
    date: Date,
    people: number,
    sitting: number[],
    updateUser(firstName: string, lastName: string, email: string, phoneNumber: number): void;
}

export default function ContactComponent(props: IContactProps) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0); 

    const {register, handleSubmit, errors} = useForm();

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

    function updateParent(e: any) {
       // e.preventDefault();
        props.updateUser(firstName, lastName, email, phoneNumber);
        console.log(firstName, lastName, email, phoneNumber);
          
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

          <form onSubmit={handleSubmit(updateParent)}>

            <label htmlFor='firstName'>First name:</label>
              <input type='text' name='firstName' id='theFirstName' 
              onChange={updateFirstName} 
              value={firstName} 
              ref={register({required: 'First name is required.', minLength: 2})} />
              <div className='error-message'>{errors.firstName && errors.firstName.message}</div>
            <br/>

            <label htmlFor='lastName'>Last name:</label>
              <input type='text' name='lastName' 
              onChange={updateLastName} 
              value={lastName} 
              ref={register({required: 'Last name is required.', minLength: 5})} />
              <div className='error-message'>{errors.lastName && errors.lastName.message}</div>

            <br/>

            <label htmlFor='email'>Email:</label>
              <input type='text' name='email' 
              onChange={updateEmail} 
              value={email}
              ref={register({required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address.'
                }
              })} />
              <div className='error-message'>{errors.email && errors.email.message}</div>

            <br/>

            <label htmlFor='phoneNumber'>Phone Number:</label>
              <input type='number' name='phoneNumber' 
              onChange={updatePhoneNumber} 
              value={phoneNumber} 
              ref={register({required: 'Phonenumber is required.', minLength: 8})} />
              <br/>
              <div className='error-message'>{errors.phoneNumber && errors.phoneNumber.message}</div>

            <button type='submit'>Boka!</button>
          </form>
        </div>
      );
}