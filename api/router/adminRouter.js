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


router.delete("/deleteBooking/:id", async (req, res) => {

    // Tar bort en bokning från databasen. Användaren skickar en delete-request i form av en knapp eller länk där bokingsId skickas med.
    const deletedBooking = await Booking.findOne({
        bookingId: req.params.id
    });

    deletedBooking.delete();

    res.send(JSON.stringify(deletedBooking) + "deleted")

});

// Admin gör en ändring på en booking med hjälp av rätt ID

router.put('/edit/:Id', async (req, res) => {
    const booking = await Booking.findOne({
        bookingId: req.params.bookingId
    });
    (booking.date = req.body.date),
    (booking.numberOfPeople = req.body.numberOfPeople),
    (booking.time = req.body.time),

   
    console.log(booking)

    await booking.save();

    if (!booking) return res.status(404).json({})


    res.json(booking)
})


module.exports = router;