const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
       content: {
           type: String,
           required: true
       },
       author: Schema.Types.ObjectId
    },
    { timestamps: true }
);

module.exports = model('Comment', commentSchema);