import React, { useState } from 'react';

import axios from 'axios';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Admin() {

    const [restaurantId, setRestaurantId] = useState(1);
    const [date, setDate] = useState();
    const [people, setPeople] = useState(0);
    const [sitting, setSitting] = useState([18, 21]);
    
    function getBookings() {
        axios.get(`http://localhost:4000/getAvailability/${restaurantId}/${date}/${people}`).then(axiosObject => {
            console.log(`Bord lediga ${date}: ${JSON.stringify(axiosObject.data)}`); // data from API within the Axios object
            setSitting(axiosObject.data);

          /*   let liTags = response.data.map((bookings) => {
            return <li className='li'>{bookings}</li>
    }); */
        })  
    }


    return (
        <div>
            <h2>Admin page</h2>
            <label htmlFor='dateInput'>Select date:</label>
            <Datepicker 
                selected={date} 
                onChange={date => setDate(date)}
                isClearable
                />
            <button type='button' onClick={getBookings}>Get bookings</button>
            <div className='ul-container'>
                <ul className='ul'>
                    {/* liTags */} 
                    <li className='li'>
                        <span>kjsnakjndsa</span>
                        <button type='button'>Change booking</button>
                        <button type='button'>Remove booking</button>
                    </li>
                    <li className='li'>
                        <span>dasdasdasda</span>
                        <button type='button'>Change booking</button>
                        <button type='button'>Remove booking</button>
                    </li>
                    <li className='li'>
                        <span>kdsalkdnsa</span>
                        <button type='button'>Change booking</button>
                        <button type='button'>Remove booking</button>
                    </li>
                </ul>
            </div> 
        </div>
    );
}
