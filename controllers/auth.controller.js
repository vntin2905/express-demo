// const db = require('../db');
const User = require('../models/user.model');
const shortid = require('shortid');
const md5 = require('md5');
module.exports = {
    login(req,res){
        res.render('auth/login')
    },
    async postLogin(req,res){
        const email = req.body.email;
        const hashedPassword = md5(req.body.password);
        const user = await User.findOne({email: email});
        if (!user){
            res.render('auth/login',{
                errors: [
                    'User does not exists.'
                ],
                values: req.body
            })
        }
        if (user.password !== hashedPassword){
            res.render('auth/login',{
                errors: [
                    'Password is invalid.'
                ],
                values: req.body
            })
        }
        res.cookie('userId',user._id,{
            signed: true
        });
        res.redirect('/users');
    },
    logout(req,res){
        res.clearCookie('userId');
        res.redirect('/users'); 
    }
}