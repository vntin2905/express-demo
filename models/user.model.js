const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    avatar: String,
    cart: [
        {
            id: String,
            quantity: Number
    }
    ]
});

const User = mongoose.model('User',userSchema,'users');
module.exports = User;