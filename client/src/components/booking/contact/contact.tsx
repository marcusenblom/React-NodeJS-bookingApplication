import React, { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Nav from "../../nav/nav";

//Ett interface som beskriver allt som måste skickas med. 
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

export default function ContactComponent(this: any, props: IContactProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(Number);

  // const [date, setDate] = useState(new Date());
  // const [people, setPeople] = useState(0);
  // const [sitting, setSitting] = useState([18, 21]);
  const [showPopup, setshowPopup] = useState(false);

  const { register, handleSubmit, errors, formState } = useForm({mode: 'onChange'});

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
  function handlePopup() {
    setshowPopup(true);
  }
  function closePopup() {
    setshowPopup(false);
  }

  function updateParent(e: any) {
    axios
      .post(
        `http://localhost:4000/createUser/${firstName}/${lastName}/${email}/${phoneNumber}`
      )
      .then(response => {
        console.log("CreateUser post is called from FE");
        console.log(response.data);
      })
      .catch(function(err) {
        console.log(err);
      });

    props.updateUser(firstName, lastName, email, phoneNumber);
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="contact-container">
        <div className="date-guest-time-container">
          <div className="presentation">
            <p>Date:</p>
            <p>
              {props.date.getDate()}/{props.date.getMonth() + 1}
            </p>
          </div>

          <div className="presentation">
            <p>Guests:</p>
            <p>{props.people.toString()}</p>
          </div>

          <div className="presentation">
            <p>Time:</p>
            <p>{props.sitting.toString()}.00</p>
          </div>
        </div>
        <hr/>

        <form onSubmit={handleSubmit(updateParent)}>
          <div className="input-one">
            <label htmlFor="firstName"></label>
            <input
              type="text"
              className="firstname"
              name="firstName"
              placeholder="Firstname..."
              id="theFirstName"
              onChange={updateFirstName}
              value={firstName}
              ref={register({
                required: "First name is required.",
                minLength: 2})
              }
            />
            <br />

            <label htmlFor="lastName"></label>
            <input
              className="lastname"
              type="text"
              name="lastName"
              placeholder="Lastname..."
              onChange={updateLastName}
              value={lastName}
              ref={register({
                required: "Last name is required.",
                minLength: 5 
              })}/>
            <br />
          </div>

          <div className='error-container'>
            <span className="error-message">
              {errors.firstName && errors.firstName.message}
            </span>
            <span className="error-message">
              {errors.lastName && errors.lastName.message}
            </span>
          </div>

          <div className="input-one">
            <label htmlFor="email"></label>
            <input
              type="text"
              className="email"
              name="email"
              placeholder="name@adress.com..."
              onChange={updateEmail}
              value={email}
              ref={register({
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address."
                }
              })}/>
            <br />

            <label htmlFor="phoneNumber"></label>
            <input
              type="number"
              placeholder="+46 123 456 789..."
              className="phonenumber"
              name="phoneNumber"
              onChange={updatePhoneNumber}
              value={phoneNumber}
              ref={register({
                required: "Phonenumber is required.",
                minLength: 8
              })}
            />
            <br />
          </div>

          <div className='error-container'>
            <span className="error-message">
              {errors.email && errors.email.message}
            </span>
            <span className="error-message">
              {errors.phoneNumber && errors.phoneNumber.message}
            </span>
          </div>
          <div className="input-two">
            <div className="restaurang">
              <p>Restaurang</p>
              <p>FML Vasagatan</p>
            </div>
            <div className="restaurangtwo">
              <p>Please note that we will hold your table for 15 minutes</p>
            </div>
          </div>

          <div className="restaurang-last">
            <p>Read our general terms and conditions</p>
          </div>
          <div className="checkbox-div">
            <input type="radio" className="checkbox" />
            <label htmlFor="checkbox">I accept gdpr terms</label>
          </div>

          <button onClick={handlePopup} disabled={!formState.isValid}>Reserve a table!</button>
        </form>

        {showPopup && (
          <div className="background">
            <div className="popup-container">
              <button className="closebtn" onClick={closePopup}>
                X
              </button>
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
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
