const mongoose = require('mongoose');
const users = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
    },
    roles: {
        type: Array,
        required: true,
    },
    timestamp: {
        type: String,
        default: new Date()
    }
})
module.exports = mongoose.model('user', users)