// code for establishing node server and mongodb server with mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = process.env.ONLINE_DB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;
// Event listeners
db.on('connected', () => {
    console.log("Connection Established to MongoDB Server");
});
db.on('error', (err) => {
    console.log("Connection Error", err);
});
db.on('disconnected', () => {
    console.log("Connection disconnected");
});

module.export = db;