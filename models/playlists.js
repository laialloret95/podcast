const { Schema, model } = require('mongoose');

const playlistSchema = new Schema(
    {
        userID: { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        },
        podcastIDs: {
            type: [ Schema.Types.ObjectId ], 
            ref: 'Podcast'
        },
        title: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = model('Playlist', playlistSchema);