const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { Booking, validateBooking } = require('../model/bookingModel');
const { User, validateUser } = require('../model/userModel');
const { Restaurant, validateRestaurant } = require('../model/restaurantModel');
// Importerade Moment i både api samt client för att lättare kunna arbeta med datumformatering
const moment = require('moment');

router.get("/getAvailability/:restaurantId/:date", async (req, res) => {
    
    // Skickar med user input: Date + # of people. OBS: Just nu så blir datumet en dag tidigare
    // I post-requestens params så måste restaurangens ID (drop down?) samt datum i format YYYY-MM-DD
    var date = new moment(req.params.date).format('L');
    const bookings = await Booking.find({date: date});
    const restaurant = await Restaurant.findOne({restaurantId: req.params.restaurantId});
    let tableSize = restaurant.tableSize;
    let sittings = restaurant.sitting;
    let tableAmount = restaurant.tables;

    let availabilityPerSitting = sittings.map(sitting => {

        return getAvailabilityPerSitting(tableSize, tableAmount, sitting);

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


    // Få tillbaka: Tillgängliga tider för det datumet / alternativt felmeddelande som säger att det inte finns tillräckligt många bord för det sällskapet
    res.send("Tables available" + JSON.stringify(availabilityPerSitting))
    
});

router.post("/createBooking", async (req, res) => {

    // Ta in user input för: Förnamn, Efternamn, Mail, Tele. Kolla sedan om mailen är ledig och skapa upp ett user objekt och skickar till databasen. Om mailen redan finns på ett user objekt i databasen så överskrivs övriga inputs (namn, tele) på det redan befintliga user objektet i databasen

    const bookings = await Booking.find();

    const booking = new Booking({
        bookingId: bookings.length + 1,
        date: new moment("20201111").format('L'),
        time: 21,
        numberOfPeople: 15,
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