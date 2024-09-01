const express = require('express');
const person = require('../models/person');
const router = express.Router();
const { jwtAuthMiddleWare, generateToken } = require('../jwt')

router.post('/signup', async (req, res) => {
    try {
        const newPerson = new person(req.body);
        const response = await newPerson.save();
        const payload = {
            id: response.id,
            username: response.username,
        }
        const token = generateToken(payload);
        console.log("Response data saved");
        res.status(201).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await person.findOne({ username: username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or Password" })
        } else {
            const payload = {
                id: user.id,
                username: user.username
            }
            const token = generateToken(payload);
            res.status(200).json({ token });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/', jwtAuthMiddleWare, async (req, res) => {
    try {
        const data = await person.find();
        // console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/profile', jwtAuthMiddleWare, async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/:work', async (req, res) => {
    try {
        const validWorkType = person.schema.path('work').enumValues;
        const workType = req.params.work.toLowerCase();
        if (validWorkType.includes(workType)) {
            const data = await person.find({ work: workType });
            // console.log(data);
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "Invalid Work Type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // checks for validators written in the model schema
        });
        console.log("Data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const response = await person.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        } else {
            console.log("Data Deleted");
            res.status(200).json({ message: "Person Detail deleted" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;