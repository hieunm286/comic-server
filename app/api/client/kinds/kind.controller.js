const express = require('express');
const { getAllKinds } = require('./kind.service');
const api = express.Router();

api.get('/kinds', async (req, res) => {
    try {
        const data = await getAllKinds()
        return res.json(data)
    } catch (err) {
        res.json({
            err: err.message
        })
    }
})

module.exports = api;
