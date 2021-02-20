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
    }
});

//export
module.exports = mongoose.model('Garden', GardenSchema);