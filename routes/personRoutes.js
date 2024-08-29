const express = require('express');
const person = require('../models/person');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newPerson = new person(req.body);
        const response = await newPerson.save();
        console.log("Response data saved");
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log(data);
        res.status(200).json(data);
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
            console.log(data);
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
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
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