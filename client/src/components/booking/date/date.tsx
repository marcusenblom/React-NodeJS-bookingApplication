import React, { useState, ChangeEvent } from "react";
import Calendar from "react-calendar";
import Nav from "../../nav/nav";
import { BsPeopleFill } from 'react-icons/bs';

// Ett interface som beskirver vilka funktioner som ska skickas med från booking och tillbaka igen.
interface IDateProps {
  updateDate(date: Date): void;
  updatePeople(people: number): void;
  people: number;
}

export default function DateComponent(props: IDateProps) {
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(props.people);

  //Här uppdateras datumet och skickas till booking via props. 
  function updateDate(selectedDate: any) {
    props.updateDate(selectedDate);
    setDate(selectedDate);
  }
  // Här uppdateras personer och skickas till booking via props.
  function updateSelect(e: ChangeEvent<HTMLSelectElement>) {
    let p = parseInt(e.currentTarget.value);
    props.updatePeople(p);
    setPeople(p);
  }
  
  return (
    <React.Fragment>
      <Nav />
      <div className="date-container">

        <p className="text-left-second">
          FML is an Italian Restaurant, featuring homemade fresh pasta,
          traditional Roman dishes expertly prepared using the finest
          ingredients. Fine wines and signature cocktails in a spacious, white
          tablecloth venue.
        </p>
        <hr />
        <p className="text-left"><BsPeopleFill size='1.5em'/>  Reservation 1-15 guests</p>
        <hr />
        <div className="date-and-guests">
          <div className="guests">
            <p>Number of party</p>
            <select onChange={updateSelect} className="select" value={people}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="date">
            <p>Choose date</p>
            <Calendar onChange={updateDate} value={date} minDate={new Date()} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
