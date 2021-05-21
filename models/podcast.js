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
            type: String
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
            type: [ Schema.Types.ObjectId ], 
            ref: 'Ratings' 
        },
        comments: { 
            type: [ Schema.Types.ObjectId ], 
            ref: 'Comment' 
        },
        authorLowerCase: {
            type: String
        },
        titleLowerCase: {
            type: String
        },
        descriptionLowerCase: {
            type: String
        }
    }
);

module.exports = model('Podcast', podcastSchema);