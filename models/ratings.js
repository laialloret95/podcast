const { Schema, model } = require('mongoose');

const ratingsSchema = new Schema(
  {
    podcastID: { 
      type: Schema.Types.ObjectId, 
      ref: 'Podcast' 
    },
    userID: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    rating: {
      type: Number
    }
  },
    { timestamps: true }
);

module.exports = model('Ratings', ratingsSchema);