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


// router.put("/changeBooking", (req, res) => {

//     // Admin gör en ändring på en booking med hjälp av rätt ID


// });
router.delete("/deleteBooking/:id", async (req, res) => {

    // Tar bort en bokning från databasen. Användaren skickar en delete-request i form av en knapp eller länk där bokingsId skickas med.
    const deletedBooking = await Booking.findOne({
        bookingId: req.params.id
    });
    const booking = await Booking.deleteOne({
        bookingId: req.params.id
    });

    res.send(JSON.stringify(deletedBooking) + "deleted")

});

router.put('/changeBooking/:Id', async (req, res) => {
    const booking = await Booking.findOne({
        bookingId: req.params.id
    });

    const editbooking = await Booking.updateOne({
        bookingSitting: req.body.sitting,
        bookingDate: req.body.date,
        bookingTime:req.body.time
    
    })
   
    console.log(booking)
    if (!booking) return res.status(404).json({
    })


    res.json(booking)
})


module.exports = router;