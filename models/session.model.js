const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: String,
    cart: [
        {
            id: String,
            quantity: Number
        }
    ]
});

const Session = mongoose.model('Session',sessionSchema,'sessions');
module.exports = Session;