import express from 'express';

const api = express.Router();

api.get('/user', async (req, res) => {
  try {
    // const args = req.query;

    const results = {
        code: 200,
        success: true,
        data: [
            { _id: 'sdgdfghdh', name: 'Nguyễn Văn A', age: 20 },
            { _id: 'sdgdfghdh', name: 'Nguyễn Văn A', age: 22 }
        ]
    }

    return res.json(results);
  } catch (err) {
    // return CommonError(req, err, res);
  }
});

module.exports = api;
