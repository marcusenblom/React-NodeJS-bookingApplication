const mongoose = require("mongoose");
const joi = require("joi");
const Schema = require("mongoose").Schema;

const restaurantSchema = new Schema({
    restaurantId: {
        type: Number,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true,
        minlength: 2
    },
    tables: {
        type: Number,
        required: true
    },
    tableSize: {
        type: Number,
        required: true
    },
    sitting: [{
        type: Number
    }]
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);


function validateRestaurant(restaurant) {
    const schema = {
        restaurantId: joi.number().unique().required(),
        location: joi.string().required().min(2),
        tables: joi.number().required(),
        tableSize: joi.number().required(),
        sitting: joi.number()
    }

    return joi.validate(restaurant, schema);
}

module.exports.Restaurant = Restaurant;
module.exports.validateRestaurant = validateRestaurant;