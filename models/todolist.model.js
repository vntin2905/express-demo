const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
    name: String,
    status: Boolean
});

const Todolist = mongoose.model('Todolist',todolistSchema,'todolist');
module.exports = Todolist;