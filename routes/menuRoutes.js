const express = require('express');
const menu = require('../models/menu');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await menu.find();
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get('/:taste', async (req, res) => {
    try {
        const validTasteTypes = menu.schema.path('taste').enumValues;
        const tasteType = req.params.taste.toLowerCase();

        if (validTasteTypes.includes(tasteType)) {
            const data = await menu.find({ taste: tasteType });
            console.log(data);
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "Invalid Taste Type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post('/', async (req, res) => {
    try {
        const menuItem = new menu(req.body);
        const response = await menuItem.save();
        console.log("Menu Saved");
        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await menu.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true, // checks for validators written in the model schema
        });
        console.log("Menu updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await menu.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Menu Not Found" });
        } else {
            console.log("Data Deleted");
            res.status(200).json({ message: "Menu Item deleted" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;