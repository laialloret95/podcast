const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema(
    {
      podcastID: {type: [ Schema.Types.ObjectId ]},
      usersID: {type: [ Schema.Types.ObjectId ]}
    },
    { timestamps: true }
);

module.exports = model('Favorites', favoritesSchema);