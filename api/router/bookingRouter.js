const express = require('express');
const router = express.Router();
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
// Importerade Moment i både api samt client för att lättare kunna arbeta med datumformatering
const moment = require('moment');
const { request } = require('express');
const nodemailer = require('nodemailer');
const config = require("../config/config");


// Hämta alla bokningar för ett specifikt datum och returnera lediga bord för varje sittning
router.get("/getAvailability/:restaurantId/:date/:people", async (req, res) => {

    // Skickar med user input: Date + # of people. OBS: Just nu så blir datumet en dag tidigare

    var date = new moment(req.params.date).format('L');
    const bookings = await Booking.find({
        date: date
    });
    const restaurant = await Restaurant.findOne({
        restaurantId: req.params.restaurantId
    });
    let tableSize = restaurant.tableSize;
    let sittings = restaurant.sitting;
    let tableAmount = restaurant.tables;

    // Kolla upp om det finns tillräckligt med bord för varje tid. Returnera endast de tider som finns tillgängliga
    let tablesNeeded = Math.ceil(req.params.people / tableSize);

    // Skapa upp en lista som kommer innehålla varje sittning samt hur många bord som finns tillgängliga. Denna lista kommer slutligen skickas som respons från servern
    let tablesAvailable = [];

    // Mappa igenom listan av sittningar och returnera en lista som innehåller varje sittning och hur många bord som finns lediga
    let availabilityPerSitting = sittings.map(sitting => {

        return getAvailabilityPerSitting(tableSize, tableAmount, sitting);

    });

    // Loopa igenom varje sittning i listan ovan och kolla om det finns tillräckligt många bord för sällskapet. Om det finns tillräckligt med bord så läggs denna sittning till i tablesAvailable
    availabilityPerSitting.forEach(sitting => {

        if (sitting.tablesAvailable >= tablesNeeded) {
            tablesAvailable.push(sitting.sitting);
        };
    });


    // Funktion som räknar ut hur många bord som finns tillgängliga och returnerar ett objekt innehållande bokningen samt antal lediga bord
    function getAvailabilityPerSitting(tableSize, tableAmount, sitting) {

        let tablesOccupied = 0;

        bookings.forEach(booking => {
            if (booking.time == sitting) {
                if (booking.numberOfPeople > tableSize) {
                    tablesOccupied += Math.ceil(booking.numberOfPeople / tableSize);
                } else {
                    tablesOccupied += 1;
                }
            }
        });

        let tablesAvailable = (tableAmount - tablesOccupied);

        return {
            sitting: sitting,
            tablesAvailable: tablesAvailable
        }
    }

    // Skicka tillbaka: Tillgängliga tider för det datumet
    res.send(tablesAvailable)

});

// Skapa upp en användare efter att denne har fyllt i sina uppgifter i sista bokningssteget
router.post("/createUser/:firstName/:lastName/:email/:phoneNumber", async (req, res) => {

    const userToFind = await User.findOne({
        email: req.params.email
    });
    console.log(userToFind);
    const allUsers = await User.find();
    var lastUserId = allUsers[allUsers.length - 1].userId;

    // Om inte användaren finns så skapas en ny user
    if (!userToFind) {
        let newUser = new User({
            userId: lastUserId + 1,
            firstName: req.params.firstName,
            lastName: req.params.lastName,
            email: req.params.email,
            phoneNumber: req.params.phoneNumber
        }).save((error, succes) => {
            if (error) {
                res.send(error.message)
            }
            if (succes) {
                res.send(newUser)
            }
        });
    };

});

// Skapa upp bokning
router.post("/createBooking/:restaurantId/:date/:people/:sitting/:email", async (req, res) => {

    // Hämta användaren som lades till i sista bokningssteget (Se router ovan)
    const userToFind = await User.findOne({
        email: req.params.email
    });
    // Hämta alla bokningar som finns
    const bookings = await Booking.find();

    // Detta görs för att den nya bokningen ska få nästkommande ID i listan
    let lastBookingId = bookings[bookings.length - 1].bookingId;
    let newBookingId = lastBookingId + 1;

    let date = new moment(req.params.date).format('L');

    let newBooking = new Booking({
        bookingId: newBookingId,
        restaurantId: req.params.restaurantId,
        date: date,
        time: req.params.sitting,
        numberOfPeople: req.params.people,
        customerId: userToFind
    }).save((error, succes) => {
        if (error) {
            res.send(error.message)
        } else {
            res.send(newBooking);
        }
    });

    // Skicka bekräftelsemail till kunden
    sendConfirmationMail(userToFind.firstName, userToFind.email, date, req.params.sitting, req.params.people);

});


// Confirmation email that is sent to user upon creating a booking
function sendConfirmationMail(firstName, email, date, sitting, people){
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
        subject: 'Bokningsbekräftelse - FML restaurang',
        text: `<h1>Hej ${firstName} och tack för din beställning</h1>
        <br>
        Följande datum är bokat:
        <br>
        ${date} - Klockan ${sitting}:00 - ${people} personer
        <br>
        <h3>Vill du avboka din tid?</h3>
        <br>
        Ring vår kundtjänst så hjälper vi dig att avboka din tid.</a>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Confirmation email has been sent to the customer: ' + info.response);
        }
      });
};


module.exports = router;