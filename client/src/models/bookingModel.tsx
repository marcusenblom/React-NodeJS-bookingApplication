import React from 'react';
import userModel from "./userModel";

class bookingClass {
    bookingId: number;
    date: Date;
    time: number;
    numberOfPeople: number;
    customerId: userModel;
    restaurantId: number;
    constructor(bookingId: number, date: Date, time: number, numberOfPeople: number, customerId: userModel, restaurantId: number){
        this.bookingId = bookingId;
        this.date = date;
        this.time = time;
        this.numberOfPeople = numberOfPeople;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
    }
}

export default bookingClass;