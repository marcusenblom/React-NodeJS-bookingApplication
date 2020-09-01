const mongoose = require("mongoose");
const joi = require("joi");
const Schema = require("mongoose").Schema;

const bookingSchema = new Schema({
    bookingId: {
        type: Number,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true,
        minlength: 1
    },
    customerId: {
        type: Number,
        required: true,
        minlength: 1
    },
    restaurantId: {
        type: Number,
        required: true
    }
});

const Booking = mongoose.model("Booking", bookingSchema);


function validateBooking(booking) {
    const schema = {
        bookingId: joi.number().unique().required(),
        date: joi.date().required(),
        time: joi.number().required(),
        numberOfPeople: joi.number().required().min(1),
        customer: joi.number().required().min(1),
        restaurantId: joi.number().required()
    }

    return joi.validate(booking, schema);
}

module.exports.Booking = Booking;
module.exports.validateBooking = validateBooking;