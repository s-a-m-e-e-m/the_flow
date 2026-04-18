const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "this username is already taken"],
        required: true
    },

    email: {
        type: String,
        unique: [true, "a account with this email id already exists"],
        required: true
    },

    password: {
        type: String,
        required: true
    },

    wishlist: {
        type: [String]
    },

    inventory: {
        type: [String]
    },

    targetRole: {
        type: String,
        required: true
    },

    careerRoadmap: {
        type: Object
    }
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;