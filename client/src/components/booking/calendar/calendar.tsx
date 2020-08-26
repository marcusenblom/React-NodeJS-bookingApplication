
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

  export default function ReactCalendar() {

    const [date, setDate] = useState(new Date());

    const onChange = () => {
        setDate(date);
        console.log(date);
    };

    return (
        <div>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
}
 

/* 
 import React, { useState } from 'react';
 import DatePicker from 'react-datepicker';
 import 'react-datepicker/dist/react-datepicker.css';

 export default function Calendar() {

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <DatePicker 
            selected={selectedDate} 
            onChange={date => setSelectedDate(new Date())}/>
        </div>
    );
 } */