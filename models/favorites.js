const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema(
    {
      podcastID: {type: [ Schema.Types.ObjectId ], ref: 'Podcast'},
      usersID: {type: [ Schema.Types.ObjectId ], ref: 'User'}
    },
    { timestamps: true }
);

module.exports = model('Favorites', favoritesSchema);