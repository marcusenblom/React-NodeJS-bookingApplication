const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const moment = require('moment');
const {
    Booking,
    validateBooking
} = require('../model/bookingModel');
const {
    User,
    validateUser
} = require('../model/userModel');
const {
    Restaurant,
    validateRestaurant
} = require('../model/restaurantModel');


router.get("/getBookings/:date", async (req, res) => {
    var date = new moment(req.params.date).format('L');
    const bookings = await Booking.find({
        date: date
    });
    res.send(bookings);
});

router.put("/changeBooking", (req, res) => {

    // Admin gör en ändring på en booking med hjälp av rätt ID
});


module.exports = router;