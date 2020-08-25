const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Booking, validateBooking } = require('../model/bookingModel');
const { User, validateUser } = require('../model/userModel');
const { Restaurant, validateRestaurant } = require('../model/restaurantModel');

// Importerade Moment i både api samt client för att lättare kunna arbeta med datumformatering
const moment = require('moment');

router.get("/getAvailability/:date", async (req, res) => {
    
    // Skickar med user input: Date + # of people. OBS: Just nu så blir datumet en dag tidigare

    var date = new moment(req.params.date).format('L');
    const bookings = await Booking.find({date: date});
    const restaurant = await Restaurant.findOne({restaurantId: 1});
    let tableSize = restaurant.tableSize;

    let tablesOccupied = 0;

    console.log("Table size: " + tableSize);
    
    bookings.forEach(booking => {
        if (booking.numberOfPeople > tableSize) {
            tablesOccupied += Math.ceil(booking.numberOfPeople / tableSize);

        } else {
            tablesOccupied += 1;
        }
    });

    // Få tillbaka: Tillgängliga tider för det datumet / alternativt felmeddelande som säger att det inte finns tillräckligt många bord för det sällskapet
    if (bookings.length > 0) {
        res.send("Tables occupied" + tablesOccupied + bookings)
    } else {
        res.send(restaurant)
    }
    

});

router.post("/createBooking", async (req, res) => {

    // Ta in user input för: Förnamn, Efternamn, Mail, Tele. Kolla sedan om mailen är ledig och skapa upp ett user objekt och skickar till databasen. Om mailen redan finns på ett user objekt i databasen så överskrivs övriga inputs (namn, tele) på det redan befintliga user objektet i databasen

    const bookings = await Booking.find();

    const booking = new Booking({
        bookingId: bookings.length + 1,
        date: new moment("20201111").format('L'),
        time: 18,
        numberOfPeople: 12,
        customerId: 1,
        restaurantId: 1
    });

    await booking.save((error, succes) => {
        if (error) {
            res.send(error.message)
        }
    });

    // const user = new User({
    //     userId: 1,
    //     firstName: "Linda",
    //     surName: "Andersson",
    //     email: "Hej@gmial.ciom",
    //     phoneNumber: 07012312323
    // });

    // await user.save((error, succes) => {
    //     if (error) {
    //         res.send(error.message)
    //     }
    // });

    res.send("Tillagd");


    // Ta in user input för restaurang, datum, tid och antal personer. Skapa sedan upp ett bokingsobjekt i databasen

    // Skicka bekräftelsemail till kunden där denne kan avboka tiden

});

router.delete("/deleteBooking", (req, res) => {

    // Tar bort en bokning från databasen. Användaren skickar en delete-request i form av en knapp eller länk där bokingsId skickas med.


});


module.exports = router;