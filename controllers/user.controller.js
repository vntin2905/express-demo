// const db = require('../db');
const User = require('../models/user.model');
const shortid = require('shortid');
module.exports = {
    async index(req,res){
        const users = await User.find();
        res.render('users/index',{
            users
        })
    },
    async search(req,res){
        const users = await User.find();
        let q = req.query.q;
    let matchedUsers = users.filter((user)=>{
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers,
        query: q
    })
    },
    create(req,res){
        res.render('users/create');
    },
    async get(req,res){
        const id = req.params.id;
        const users = await User.findOne({id: id});
        const user = users;
        res.render('users/view',{
            user
        });
    },
    postCreate(req,res){
        req.body.id = shortid.generate();
        req.body.avatar = req.file.path.split('\\').slice(1).join('/');
        const newUser = new User(req.body);
        newUser.save();
        // db.get('users').push(req.body).write();
        res.redirect('/users');
    }
}