const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
          type: String,
          required: [ true, 'Name is required.']
        },
        lastName: {
          type: String,
          required: [ true, 'Last name is required.']
        },
        email:{
          type: String,
          required: [ true, 'Email is required,'],
          match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
          unique: [ true, 'This email has already been registered.'],
          lowercase: true,
          trim: true
        },
        profilePicture: {
            Type: String,
            default: "../images/avatar-icon.png"
        },
        hashedPassword: {
          type: String,
          required: [ true, 'Password is required.']
        }
    },
    { timestamps: true }
);

module.exports = model('Users', userSchema);