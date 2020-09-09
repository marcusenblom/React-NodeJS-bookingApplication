const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const moment = require('moment');
const {
  Booking,
  validateBooking
} = require('../model/bookingModel');
const nodemailer = require('nodemailer');
const config = require("../config/config");


router.get("/getBookings/:date", async (req, res) => {

  var date = new moment(req.params.date).format('L');

  // Hämta alla bokningae för det akutella datumet. .populate krävs för att få tag på användarinfon
  const bookings = await Booking.find({
    date: date
  }).populate("customer");

  res.send(bookings);

});

router.delete("/deleteBooking/:id", async (req, res) => {

  // Tar bort en bokning från databasen. Användaren skickar en delete-request i form av en knapp eller länk där bokingsId skickas med.
  const deletedBooking = await Booking.findOne({
    bookingId: req.params.id
  }).populate("customer");

  // const userToFind = await User.findOne({
  //   userId: deletedBooking.customer
  // });

  const user = deletedBooking.customer;

  let date = new moment(deletedBooking.date).format('L');

  // Skicka ett avbokningsmail till användaren
  sendCancellationMail(user.firstName, user.email, date, deletedBooking.time);

  deletedBooking.delete();

  res.send(JSON.stringify(deletedBooking) + "deleted")


});

// Admin gör en ändring på en booking med hjälp av rätt ID

router.put('/edit/:id', async (req, res) => {
  const editBooking = await Booking.updateOne({
    bookingId: req.params.id
  }, {
    $set: {
      date: req.body.updateReservation.date,
      time: req.body.updateReservation.time,
      numberOfPeople: req.body.updateReservation.numberOfPeople
    }
  })
})

router.get('/edit/:id', async (req, res) => {
  const updateReservation = await Booking.findOne({
    bookingId: req.params.id
  })
  res.send(updateReservation)
})

function sendCancellationMail(firstName, email, date, sitting) {
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