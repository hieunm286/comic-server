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
        otherName: {
            type: String,
        },
        describe: {
            type: String
        },
        rate: {
          ratingValue: {
              type: String
          },
            reviewCount: {
              type: String
            }
        },
        view: {
            type: String
        },
        status: {
            type: String
        },
        chapters: [{
            title: {
                type: String
            },
            content: [String]
        }],
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'Author'
        },
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