const { Schema, model } = require('mongoose');

const podcastSchema = new Schema(
    {
        title: {
            type: String
        },
        language: {
            type: String
        },
        audio: {
            type: String
        },
        audio_length: {
            type: Number
        },
        author: {
            type: String
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
            type: [ Schema.Types.ObjectId ], 
            ref: 'Comment' 
        }
    }
);

module.exports = model('Podcast', podcastSchema);