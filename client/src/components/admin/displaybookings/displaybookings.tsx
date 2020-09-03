import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BookingClass from '../../../models/bookingModel';


interface IDisplayBookingsProps {
    bookings: BookingClass[];
}

export default function DisplayBookings(props: IDisplayBookingsProps) {

    let bookingLi = props.bookings.map(b => {
        return (<div key={b.bookingId}>Booking ID: {b.bookingId}</div>)
    })

    return (
        <div>
            <div>
                {bookingLi}
            </div>
        </div>
    );
}
