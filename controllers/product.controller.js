// const db = require('../db');
const Product = require('../models/product.model');

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
        let page = req.query.page || 1;
        const perPage = 8;
        const start = (page-1)*perPage;
        const end = (page-1)*perPage + perPage;
        const totalPageOfProducts = await products.length/perPage;
        res.render('products/index',{
            products: products.slice(start,end),
            page,
            totalPageOfProducts
        })
    },
    
}