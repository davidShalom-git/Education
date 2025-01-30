const mongoose = require('mongoose');

const auth = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Auth', auth);