const express = require('express');
const {getByChapterId} = require("./chapters.service");
const { success } = require('../../../utils/response-utils');
const { CommonError } = require('../../library/error');
const api = express.Router();

api.get('/chapter/:chapterId', async (req, res) => {
    try {
        const args = { ...req.params, ...req.query }
        const kind = await getByChapterId(args)
        return res.json(success(kind))
    } catch (err) {
        return CommonError(req, err, res);
    }
})

module.exports = api;
