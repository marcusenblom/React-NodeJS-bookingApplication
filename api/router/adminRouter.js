const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const moment = require('moment');


router.get("/getBookings/:date", (req, res) => {
    var date = new moment(req.params.date).format('L');
    const bookings = await Booking.find({
        date: date
    });
});

router.put("/changeBooking", (req, res) => {

    // Admin gör en ändring på en booking med hjälp av rätt ID
});


module.exports = router;