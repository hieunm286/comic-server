const express = require('express');
const { success } = require('../../../utils/response-utils');
const { CommonError } = require('../../library/error');
const { getAllKinds, getKindById } = require('./kind.service');
const api = express.Router();

api.get('/kinds', async (req, res) => {
    try {
        const data = await getAllKinds(req.query)
        return res.json(data)
    } catch (err) {
        res.json({
            err: err.message
        })
    }
})

api.get('/kinds/:kindId', async (req, res) => {
    try {
        const args = { ...req.params, ...req.query }
        const kind = await getKindById(args)
        return res.json(success(kind))
    } catch (err) {
        return CommonError(req, err, res);
    }
})

module.exports = api;
