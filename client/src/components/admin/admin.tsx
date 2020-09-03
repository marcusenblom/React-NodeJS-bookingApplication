import React, { useState } from 'react';
import axios from 'axios';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Nav from '../nav/nav';
import DisplayBookings from './displaybookings/displaybookings';



export default function Admin() {

    class bookingClass {
        bookingId: number;
        date: Date;
        time: number;
        numberOfPeople: number;
        customerId: number;
        restaurantId: number;
        constructor(bookingId: number, date: Date, time: number, numberOfPeople: number, customerId: number, restaurantId: number){
            this.bookingId = bookingId;
            this.date = date;
            this.time = time;
            this.numberOfPeople = numberOfPeople;
            this.customerId = customerId;
            this.restaurantId = restaurantId;
        }
    }

    const [restaurantId, setRestaurantId] = useState(1);
    const [date, setDate] = useState();
    const [people, setPeople] = useState(0);
    const [sitting, setSitting] = useState([18, 21]);
    const [bookings, setBookings] = useState([]);


    
    function getBookings() {
        axios.get(`http://localhost:4000/getBookings/${date}`).then(axiosObject => {
            console.log(axiosObject.data);
            setBookings(axiosObject.data);
            setTimeout(function() { 
                console.log(bookings);
              }, 1000);
            
            
            
            // 1. Hämta UserInput
            // 2. Hämta bokningar från databasen efter valt datum
            // 3. Mapa objektet och presentera dessa i listan

             /* let liTags = axiosObject.data.map(bookings => {
            return <li className='li'>{bookings}</li>
            });  */
        })  
    }

    return (
        <div>
            <Nav/>
            <h2>Admin</h2>
            <label htmlFor='dateInput'>Select date:</label>
            <Datepicker 
                selected={date}
                onChange={date => setDate(date)}
                isClearable
                dateFormat='yyyy-MM-dd'
                />
            <button type='button' onClick={getBookings}>Get bookings</button>
            <DisplayBookings bookings={bookings}></DisplayBookings>
        </div>
    );
}
