// const db = require('../db');
const Todolist = require('../../models/todolist.model');

module.exports = {
    async index(req,res){
        // let page = req.query.page || 1;
        // const perPage = 8;
        // const start = (page-1)*perPage;
        // const end = (page-1)*perPage + perPage;
        // const totalPageOfProducts = (db.get('products').value()).length/perPage;
        // res.render('products/index',{
        //     products: db.get('products').value().slice(start,end),
        //     page,
        //     totalPageOfProducts
        // })
        const todolists = await Todolist.find();
       res.json(todolists);    
    },
    async getById(req,res){
        const id = req.params.id;
        const todolist = await Todolist.findOne({_id: id});
        res.json(todolist);
    }
    ,
    async create(req,res){
        const todolist = await Todolist.create(req.body);
        res.json(todolist);
    },
    async update(req,res){
        const id = req.params.id;
        const todolist = await Todolist.findOneAndUpdate({_id: id},req.body);
        res.json(todolist);
    },
    async delete(req,res){
        const id = req.params.id;
        const todolist = await Todolist.deleteOne({_id: id});
        res.json(todolist);
    }
}