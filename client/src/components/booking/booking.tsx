import React, { useState } from 'react';
import './booking.scss';
import DateComponent from './date/date';
import TimeComponent from './time/time';

export default function Booking() {

    const [date, setDate] = useState(new Date());
    const [people, setPeople] = useState(0);
    const [sitting, setSitting] = useState([18, 21]);

    function updateDateFromChild(date: Date) {
        setDate(date);
    }

    function updatePeopleFromChild(people: number) {
        setPeople(people);
    }

    function updateSittingFromChild(sitting: number[]) {
        setSitting(sitting);
    }

    return (
        <div>
            <hr/>
            <h2>Data som skickas till parent (Booking)</h2>
            <p>{date.toString()}</p>
            <p>{people.toString()}</p>
            <p>{sitting.toString()}</p>
            <hr/>
            <DateComponent updateDate={updateDateFromChild} updatePeople={updatePeopleFromChild} />
            <hr/>
            <TimeComponent updateSitting={updateSittingFromChild} date={date} people={people} sitting={sitting}></TimeComponent>
        </div>
        
    );
}