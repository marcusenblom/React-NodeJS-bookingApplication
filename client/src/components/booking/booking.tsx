import React, { useState, useEffect } from "react";
import "./booking.scss";
import DateComponent from "./date/date";
import TimeComponent from "./time/time";
import ContactComponent from "./contact/contact";
import axios from "axios";

export default function Booking() {

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
  const [restaurantId, setRestaurantId] = useState(1);
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(0);
  const [sitting, setSitting] = useState([18, 21]);
  const [user, setUser] = useState(new userClass("", "", "", 0));
  const [dateChosen, setDateChosen] = useState(false);
  const [timeChosen, setTimeChosen] = useState(false);
  //const [componentToShow, setComponentToShow] = useState();

  function updateDateFromChild(date: Date) {
      setDate(date);
      setDateChosen(true);
      // Render Time component instead of Date

      axios.get(`http://localhost:4000/getAvailability/${restaurantId}/${date}/${people}`).then(axiosObject => {
          console.log(`Bord lediga ${date}: ${JSON.stringify(axiosObject.data)}`); // data from API within the Axios object
          setSitting(axiosObject.data);
      })
  }

  function updatePeopleFromChild(people: number) {
      setPeople(people);
  }

  function updateSittingFromChild(sitting: number[]) {
      setSitting(sitting);
      setTimeChosen(true);
      console.log(timeChosen);
      // Render Contact component instead of Time
  }

  function updateUserFromChild(firstName: string, lastName: string, email: string, phoneNumber: number) {
      let user = new userClass(firstName, lastName, email, phoneNumber);
      setUser(user);

    // TimeOut in order for user to be saved to DB before creating booking
    setTimeout(function(){ 
      axios.post(`http://localhost:4000/createBooking/${restaurantId}/${date}/${people}/${sitting}/${user.email}`).then(response => {
      console.log("CreateBooking post is called from FE");
      console.log(response.data);
    }).catch(function (err){
        console.log(err);});
    }, 1000);
  }

  if(dateChosen && !timeChosen) {
      return <TimeComponent updateSitting={updateSittingFromChild} date={date} people={people} sitting={sitting}></TimeComponent>
  } else if(timeChosen && dateChosen) {
      return <ContactComponent updateUser={updateUserFromChild} date={date} people={people} sitting={sitting}></ContactComponent>
  } else {
      return <DateComponent updateDate={updateDateFromChild} updatePeople={updatePeopleFromChild}></DateComponent>
  };

  return (
      <div>
          <hr/>
          <h2>Data som skickas till parent (Booking)</h2>
          <p>{date.getDate()}/{date.getMonth() + 1}</p> 
          <p>{people.toString()}</p>
          <p>{sitting.toString()}</p>
          <p>{JSON.stringify(user)}</p>
          <hr/>
          <hr/>
      </div>
  );
}