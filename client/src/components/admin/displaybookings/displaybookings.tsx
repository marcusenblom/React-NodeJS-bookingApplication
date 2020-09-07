import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BookingClass from '../../../models/bookingModel';
import "./../../../scss/_displaybookings.scss";


interface IDisplayBookingsProps {
    bookings: BookingClass[];
}

export default function DisplayBookings(props: IDisplayBookingsProps) {

    let bookingLi = props.bookings.map(b => {
        return (<div className="booking" key={b.bookingId}>
            Booking ID: {b.bookingId}
            </div>)
    })

    return (
        <div className="booking-wrapper">
            {bookingLi}
        </div>
    );
}
