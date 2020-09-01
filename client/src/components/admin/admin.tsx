import React from 'react';
import './admin.scss';
import axios from 'axios';


export default function Admin() {

    
    /* function getBookings() {
        axios.get('http://localhost:4000').then(response => {
            console.log(response.data);
            console.log("Local API is run");

            let liTags = response.data.map((bookings) => {
                return <li className='li'>{bookings}</li>
            });
        });
    } */


    return (
        <div>
           {/*  <h2>Admin page</h2>
             <input type='text' placeholder='Date for bookings' />
            <button type='button' onClick={getBookings}>Get bookings</button>
            <div className='ul-container'>
                <ul className='ul'>
                     {liTags} 
                    <li className='li'>
                        <p>kjsnakjndsa</p>
                        <button>klick</button>
                    </li>
                    <li className='li'>
                        <p>dasdasdasda</p>
                        <button>klick</button>
                    </li>
                    <li className='li'>
                        <p>kdsalkdnsa</p>
                        <button>klick</button>
                    </li>
                </ul>
            </div> */}
        </div>
    );
}