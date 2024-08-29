const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        required: true,
        enum: ['worker', 'manager', 'chef', 'cleaner'],
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    }
});

const person = mongoose.model('Person', personSchema);
module.exports = person;