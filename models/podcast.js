const { Schema, model } = require('mongoose');
const podcastSchema = new Schema(
    {
        title: {
            type: String
        },
        audio: {
            type: String
        },
        audio_length: {
            type: Number
        },
        description: {
            type: String
        },
        pub_date: {
            type: Date
        },
        image: {
            type: String
        },
        genre: {
            type: String
        },
        ratings: {
            type: [Number]
        },
        comments: {
            type: [ Schema.ObjectId ]
        }
    }
);

module.exports = model('Podcast', podcastSchema);