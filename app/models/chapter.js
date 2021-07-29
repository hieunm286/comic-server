const mongoose = require('mongoose');

const { Schema } = mongoose;
const ChapterSchema = new Schema(
    {
        title: {
            type: String
        },
        slug: {
            type: String
        },
        referrer: {
            type: String
        },
        content: [String],
        story: {
            type: mongoose.Types.ObjectId,
            ref: 'Story'
        },
    },
    { timestamps: true },
)

const Author = mongoose.model('Chapter', ChapterSchema)

module.exports = Author