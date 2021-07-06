const express = require('express');
const { success } = require('../../../utils/response-utils');
const { getAllStories, getStoryById } = require('./story.service');
import CommonError from '../../library/error';
const api = express.Router();

api.get('/stories', async (req, res) => {
    try {
        const data = await getAllStories(req.query)
        return res.json(success(data))
    } catch (err) {
        res.json({
            err: err.message
        })
    }
})

// api.get('/stories/:storyId', async (req, res) => {
//     try {
//         const story = await getStoryById(req.params)
//         return res.json(success(story))
//     } catch (err) {
//         return CommonError(req, err, res);
//     }
// })

api.get('/stories/:storyId', async (req, res) => {
    const args = { storyId: req.params.storyId, chapter: req.query.chapter }
    try {
        const story = await getStoryById(args)
        return res.json(success(story))
    } catch (err) {
        return CommonError(req, err, res);
    }
})

module.exports = api;
