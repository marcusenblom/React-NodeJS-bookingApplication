import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import BookingClass from '../../../models/bookingModel';
import "./../../../scss/_displaybookings.scss";
import moment from 'moment';


interface IDisplayBookingsProps {
    bookings: BookingClass[];
    // date: Date;
}

export default function DisplayBookings(props: IDisplayBookingsProps) {

    // let shortDate = moment(date).format('LL');

    let bookingLi = props.bookings.map(b => {

        return (<div className="booking" key={b.bookingId}>
            <div className="booking-id">
            Booking ID: {b.bookingId}
            </div>
            <div className="customer-id">
            User ID: {b.customerId}
            </div>
            <div className="date">
            Date: {b.date}
            </div>
            <div className="time">
            Time: {b.time}.00
            </div>
            <div className="people">
            People: {b.numberOfPeople}
            </div>
            </div>)
    })

    return (
        <div className="booking-wrapper">
            {bookingLi}
        </div>
    );
}
