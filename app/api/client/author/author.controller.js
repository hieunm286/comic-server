import {getAllAuthors, getAuthorById} from "./author.service";

const express = require('express');
const { success } = require('../../../utils/response-utils');
const { CommonError } = require('../../library/error');
const api = express.Router();

api.get('/author', async (req, res) => {
    try {
        const data = await getAllAuthors(req.query)
        return res.json(data)
    } catch (err) {
        res.json({
            err: err.message
        })
    }
})

api.get('/author/:authorId', async (req, res) => {
    try {
        const args = { ...req.params, ...req.query }
        const author = await getAuthorById(args)
        return res.json(success(author))
    } catch (err) {
        return CommonError(req, err, res);
    }
})

module.exports = api;
