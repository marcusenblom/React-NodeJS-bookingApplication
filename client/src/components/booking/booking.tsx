import React, { useState } from "react";
import DateComponent from "./date/date";
import TimeComponent from "./time/time";
import ContactComponent from "./contact/contact";
import axios from "axios";
import userClass from "../../models/userModel";

export default function Booking() {

  const [restaurantId, setRestaurantId] = useState(1);
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(1);
  const [sitting, setSitting] = useState([18, 21]);
  const [user, setUser] = useState(new userClass("", "", "", 0));
  const [dateChosen, setDateChosen] = useState(false);
  const [timeChosen, setTimeChosen] = useState(false);

  // Här uppdaterar vi datumet som finns i date-componets
  function updateDateFromChild(date: Date) {
    setDate(date);

    // Render Time component instead of Date
    setDateChosen(true);
    // Fetch available tables from DB
    fetchTables();
  }

  function fetchTables(){
    // Här hämtar vi datan från API som visar tillgänliga bord på ett specifikt datum.
    axios
      .get(
        `http://localhost:4000/getAvailability/${restaurantId}/${date}/${people}`
      )
      .then(axiosObject => {
        console.log(`Bord lediga ${date}: ${JSON.stringify(axiosObject.data)}`); // data from API within the Axios object
        setSitting(axiosObject.data);
    });
  }

  // Antal personer
  function updatePeopleFromChild(people: number) {
    setPeople(people);
  }

  // Tid sätts.
  function updateSittingFromChild(sitting: number[]) {
    setSitting(sitting);
    setTimeChosen(true);
    // Render Contact component instead of Time
  }

  // Funktion som möjliggör "tillbaka"-knappen i contact component. Denna återställer sittningarna samt renderar på nytt time component
  function updateTimeAndSitting(){
    setTimeChosen(false);
    fetchTables();
  };

  // Här skapar vi upp en ny user som är baserad på klassen.
  function updateUserFromChild(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number
  ) {
    let user = new userClass(firstName, lastName, email, phoneNumber);
    setUser(user);

    // TimeOut in order for user to be saved to DB before creating booking
    setTimeout(function() {
      axios
        .post(
          `http://localhost:4000/createBooking/${restaurantId}/${date}/${people}/${sitting}/${user.email}`
        )
        .then(response => {
          console.log("CreateBooking post is called from FE");
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
    }, 1000);
  }

  

  // Villkorsstyrds rendering av komponenter. 
  if (dateChosen && !timeChosen) {
    return (
      <TimeComponent
        updateSitting={updateSittingFromChild}
        date={date}
        people={people}
        sitting={sitting}
        setDateChosen={setDateChosen}
      ></TimeComponent>
    );
  } else if (timeChosen && dateChosen) {
    return (
      <ContactComponent
        updateUser={updateUserFromChild}
        date={date}
        people={people}
        sitting={sitting}
        updateTimeAndSitting={updateTimeAndSitting}
      ></ContactComponent>
    );
  } else {
    return (
      <DateComponent
        people={people}
        updateDate={updateDateFromChild}
        updatePeople={updatePeopleFromChild}
      ></DateComponent>
    );
  }
}
