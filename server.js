// // // const fs = require('fs');
// // // const os = require('os');

// // // var user = os.userInfo()
// // // console.log(user);

// // // fs.appendFile('greeting.txt', 'hello ' + user.username + '!\n', () => { console.log('File is created') });

// // // // console.log(os)
// // const notes = require('./notes');
// // var _ = require('lodash'); // Lodash JavaScript utility library that provides a wide range of functions for common programming tasks. It helps developers by offering a consistent, modular set of tools for working with arrays, objects, strings, numbers, and other data types. Lodash simplifies complex operations and makes code more readable and maintainable.

// // // console.log("Server page loaded");
// // var age = notes.age;
// // console.log(age);
// // var result = notes.addNumber(age, 18);
// // console.log(result);

// // var data = ['p', 'p', 1, 2, 1, 2, 'n', 'a', 2];
// // var filter = _.uniq(data);
// // console.log(filter);
// // console.log(_.isString("jatin"));

// const http = require('http');
// const hostname = '127.0.0.1'
// const port = 3001;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;  // Set the response status code
//     res.setHeader('Content-Type', 'text/plain');  // Set the content type
//     res.end('Hello, World!\n');  // Send a response
// });

// server.listen(port, hostname, () => { console.log(`Server running at http://${hostname}:${port}/`) });

const express = require('express');
const db = require('./db');
// const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(express.json());

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { console.log("Server is listening on port 3000") });