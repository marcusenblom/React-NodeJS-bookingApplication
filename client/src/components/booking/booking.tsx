import React, { useState } from 'react';
import './booking.scss';
import DateComponent from './date/date';

export default function Booking() {

    const [date, setDate] = useState(new Date());
    const [people, setPeople] = useState(0);
    //const [sitting, setSitting] = useState(0);

    function updateDateFromChild(date: Date) {
        setDate(date);
    }

    function updatePeopleFromChild(people: number) {
        setPeople(people);
    }

    return (
        <div>
            <DateComponent updateDate={updateDateFromChild} updatePeople={updatePeopleFromChild} />

            <p>{date.toString()}</p>
            <p>{people.toString()}</p>
        </div>
        
    );
}