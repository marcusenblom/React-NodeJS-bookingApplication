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
const nodemailer = require('nodemailer');
const config = require("../config/config");


router.get("/getBookings/:date", async (req, res) => {

  var date = new moment(req.params.date).format('L');

  // Hämta alla bokningae för det akutella datumet. .populate krävs för att få tag på användarinfon
  const bookings = await Booking.find({
    date: date
  }).populate("customerId");

  res.send(bookings);

});

router.delete("/deleteBooking/:id", async (req, res) => {

  // Tar bort en bokning från databasen. Användaren skickar en delete-request i form av en knapp eller länk där bokingsId skickas med.
  const deletedBooking = await Booking.findOne({
    bookingId: req.params.id
  }).populate("customerId");

  // const userToFind = await User.findOne({
  //   userId: deletedBooking.customerId
  // });

  const user = deletedBooking.customerId;

  let date = new moment(deletedBooking.date).format('L');

  // Skicka ett avbokningsmail till användaren
  sendCancellationMail(user.firstName, user.email, date, deletedBooking.time);

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

// Skickar ett avbokningsmail till användaren som är kopplad till en bokning som raderas från DB
function sendCancellationMail(firstName, email, date, sitting){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailCredentials.userName,
      pass: config.mailCredentials.password
    }
  });
    
  let mailOptions = {
    from: config.mailCredentials.userName,
    to: email,
    subject: 'Avbokning - FML restaurang',
    text: `<h1>Hej ${firstName} och tack för din beställning</h1>
    <br>
    Följande bokning är nu avbokad:
    <br>
    ${date} - Klockan ${sitting}:00
    <br>
    <h3>Har något blivit fel?</h3>
    <br>
    Var vänlig kontakta vår kundtjänst.</a>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Cancellation email has been sent to the customer: ' + info.response);
    }
  });
};


module.exports = router;