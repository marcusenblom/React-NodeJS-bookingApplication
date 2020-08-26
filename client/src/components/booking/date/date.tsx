import React, { useState, ChangeEvent } from 'react';
import './date.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


interface IDateProps {
    updateDate(date: Date): void;
    updatePeople(people: number): void;
}

export default function DateComponent(props: IDateProps) {

    
    const [date, setDate] = useState(new Date());
    const [people, setPeople] = useState(0);

    function updateDate(selectedDate: any) {
        setDate(selectedDate);
        console.log(date);
        updateParentDate();
    };

    function updateParentDate() {
        props.updateDate(date);
    }

    function updateSelect(e: ChangeEvent<HTMLSelectElement>) {
        let p = parseInt(e.currentTarget.value);
        setPeople(p)
        props.updatePeople(people)
    }

    function updateParentPeople() {
        props.updatePeople(people);
    }
    

    return (
        <div className='date-container'>
            <h2>Make a reservation</h2>
            <hr className='hr-line'/>
            
            <p className='text-left'>Dinner - Restaurant Vasagatan can be found on Tulegatan</p>
            <p className='text-left'>FML is a "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quaeb ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo."
            </p>
            <hr className='hr-line'/>

            <p className='text-left'>Reservation 1-15 guests</p>
            <hr className='hr-line'/>

            <div className='date-and-guests'>
                <div className='guests'>
                    <p>Choose the number of your party</p>
                    <select onChange={updateSelect} className='select' value={people}>
                        <option value='0'>Guests</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                    </select>
                    <button type='button' onClick={updateParentPeople}>Klicka</button>
                    {people.toString()}
                </div>

                <div className='date'>
                    <p>Choose date</p>
                    <Calendar
                        onChange= {updateDate} 
                        value= {date} 
                        minDate= {new Date()} />
                </div>
            </div>
        </div>
    );
}