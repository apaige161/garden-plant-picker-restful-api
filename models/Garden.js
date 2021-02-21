//single plant model
const mongoose = require('mongoose');

//create schema
const GardenSchema = mongoose.Schema({
    plant: {
        type: String,
        required: true,
    },
    garden: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    perFoot: {
        type: Number,
        required: false,
    }
});

//export
module.exports = mongoose.model('Garden', GardenSchema);