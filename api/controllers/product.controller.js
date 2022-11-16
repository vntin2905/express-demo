// const db = require('../db');
const Product = require('../../models/product.model');

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
        const products = await Product.find();
       res.json(products);    
    },
    async getById(req,res){
        const id = req.params.id;
        const product = await Product.findOne({_id: id});
        res.json(product);
    }
    ,
    async create(req,res){
        const product = await Product.create(req.body);
        res.json(product);
    },
    async update(req,res){
        const id = req.params.id;
        const product = await Product.findOneAndUpdate({_id: id},req.body);
        res.json(product);
    },
    async delete(req,res){
        const id = req.params.id;
        const product = await Product.deleteOne({_id: id});
        res.json(product);
    }
}