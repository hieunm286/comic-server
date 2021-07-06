const mongoose = require('mongoose');

const { Schema } = mongoose;
const AuthorSchema = new Schema(
    {
        name: {
            type: String
        },
        stories: [{
            type: mongoose.Types.ObjectId,
            ref: 'Story'
        }]
    },
    { timestamps: true },
)

const Author = mongoose.model('Author', AuthorSchema)

module.exports = Author