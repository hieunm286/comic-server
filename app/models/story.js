const mongoose = require('mongoose');

const { Schema } = mongoose;
const StorySchema = new Schema(
    {
        thumbnail: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        describe: {
            type: String
        },
        chapters: [{
            title: {
                type: String
            },
            content: [String]
        }],
        authors: [{
            type: mongoose.Types.ObjectId,
            ref: 'Author'
        }],
        kinds: [{
            type: mongoose.Types.ObjectId,
            ref: 'Kind'
        }],
        type: {
            type: String,
            enum: ["comic", "novel"],
        },
    },
    { timestamps: true },
)

const Story = mongoose.model('Story', StorySchema)

module.exports = Story