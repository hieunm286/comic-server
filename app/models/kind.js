const mongoose = require('mongoose');

const { Schema } = mongoose;
const KindSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            unique: true
        },
        stories: [{
            type: mongoose.Types.ObjectId,
            ref: 'Story'
        }]
    },
    { timestamps: true },
)

const Kind = mongoose.model('Kind', KindSchema)

module.exports = Kind