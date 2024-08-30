const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        person.password = hashPassword;
        next();
    } catch (err) {
        return next(err);
    }
});
personSchema.methods.comparePassword = async function (password) {
    try {
        const isMatched = await bcrypt.compare(password, this.password);
        return isMatched;
    } catch (err) {
        throw err;
    }
};

const person = mongoose.model('Person', personSchema);
module.exports = person;