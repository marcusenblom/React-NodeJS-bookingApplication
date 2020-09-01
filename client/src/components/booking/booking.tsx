import React, { useState, useEffect } from "react";
import "./booking.scss";
import DateComponent from "./date/date";
import TimeComponent from "./time/time";
import ContactComponent from "./contact/contact";
import axios from "axios";
import Popup from "../popup/popup";

export default function Booking() {
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

  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(0);
  const [sitting, setSitting] = useState([18, 21]);
  const [user, setUser] = useState(new userClass("", "", "", 0));

  function updateDateFromChild(date: Date) {
    setDate(date);
    // Render Time component instead of Date

    axios
      .get(`http://localhost:4000/getAvailability/1/${date}/${people}`)
      .then(axiosObject => {
        console.log(`Bord lediga ${date}: ${JSON.stringify(axiosObject.data)}`);
        setSitting(axiosObject.data);
      });
  }

  function updatePeopleFromChild(people: number) {
    setPeople(people);
  }

  function updateSittingFromChild(sitting: number[]) {
    setSitting(sitting);
    // Render Contact component instead of Time
  }

  function updateUserFromChild(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number
  ) {
    let user = new userClass(firstName, lastName, email, phoneNumber);
    setUser(user);

    // setTimeout(function(){
    //     axios.post('http://localhost:4000', user).then(response => {
    //         console.log(response.data);
    //         console.log("Local API get is run");
    //     }).catch(function (err){
    //         console.log(err);
    //     });
    // }, 1000);
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000")
      .then(response => {
        console.log(response.data);
        console.log("Local API get is run");
      })
      .catch(function(err) {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
      )
      .then(axiosObject => {
        console.log(axiosObject.data); // data from API within the Axios object
        console.log("movie API get is run");
      });
  }, []);

  return (
    <div>
      <hr />
      <h2>Data som skickas till parent (Booking)</h2>
      <p>
        {date.getDate()}/{date.getMonth() + 1}
      </p>
      <p>{people.toString()}</p>
      <p>{sitting.toString()}</p>
      <p>{JSON.stringify(user)}</p>
      <hr />
      <DateComponent
        updateDate={updateDateFromChild}
        updatePeople={updatePeopleFromChild}
      />
      <hr />
      <TimeComponent
        updateSitting={updateSittingFromChild}
        date={date}
        people={people}
        sitting={sitting}
      ></TimeComponent>
      <ContactComponent
        updateUser={updateUserFromChild}
        date={date}
        people={people}
        sitting={sitting}
      ></ContactComponent>
      <Popup
        updateUser={updateUserFromChild}
        date={date}
        people={people}
        sitting={sitting}
      ></Popup>
    </div>
  );
}
