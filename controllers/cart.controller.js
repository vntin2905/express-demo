// const db = require("../db");
// const Session = require('../models/session.model')
// module.exports.addToCart = async function(req,res){
//     const productId = req.params.productId;
//     const sessionId = req.signedCookies.sessionId;

//     if(!sessionId){
//         res.redirect('/products');
//         return;
//     }
//     // let count = db.get('sessions').find({id: sessionId}).get('cart.'+productId,0).value();
//     // db.get('sessions').find({id: sessionId}).set('cart.' + productId,count+1).write();
//     // res.redirect('/products');
//     // let cart = await Session.findOne({sessionId});
//     let cart = await Session.findOne({sessionId});

//     if (cart){
//         // session exitsts for sessionId
//         let itemIndex = cart.cart.findIndex(p=> p.id === productId);
//         if (itemIndex > -1){
//             let productItem = cart.cart[itemIndex];
//             let count = productItem.quantity;
//             productItem.quantity = count+1;
//             cart.cart[itemIndex] = productItem;
//         }
//         else{
//             cart.cart.push({id: productId,quantity: 1});
//         }
//         cart = await cart.save();
//         return         res.redirect('/products');

//     }
//     else{
//         const newCart = await Session.create({
//             sessionId,
//             cart: [{
//                 id: productId,
//                 quantity: 1
//             }]
//         })
//         return         res.redirect('/products');

//     }
// }
const db = require("../db");
const Session = require('../models/session.model')
const User = require('../models/user.model');
module.exports.addToCart = async function(req,res){
    const productId = req.params.productId;
    const sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        if (!req.signedCookies.userId){
            res.redirect('/products');
            return;
        }
        else{
            let cart = await User.findOne({_id: req.signedCookies.userId})
            if (cart){
                // session exitsts for sessionId
                let itemIndex = cart.cart.findIndex(p=> p.id === productId);
                if (itemIndex > -1){
                    let productItem = cart.cart[itemIndex];
                    let count = productItem.quantity;
                    productItem.quantity = count+1;
                    cart.cart[itemIndex] = productItem;
                }
                else{
                    cart.cart.push({id: productId,quantity: 1});
                }
                cart = await cart.save();
                return         res.redirect('/products');
        
            }
            else{
                const newCart = await User.create({
                    userId,
                    cart: [{
                        id: productId,
                        quantity: 1
                    }]
                })
                return         res.redirect('/products');
            }
        }
    }
    // let count = db.get('sessions').find({id: sessionId}).get('cart.'+productId,0).value();
    // db.get('sessions').find({id: sessionId}).set('cart.' + productId,count+1).write();
    // res.redirect('/products');
    // let cart = await Session.findOne({sessionId});
    else{
        if(!req.signedCookies.userId){
            let cart = await Session.findOne({sessionId});

    if (cart){
        // session exitsts for sessionId
        let itemIndex = cart.cart.findIndex(p=> p.id === productId);
        if (itemIndex > -1){
            let productItem = cart.cart[itemIndex];
            let count = productItem.quantity;
            productItem.quantity = count+1;
            cart.cart[itemIndex] = productItem;
        }
        else{
            cart.cart.push({id: productId,quantity: 1});
        }
        cart = await cart.save();
        return         res.redirect('/products');

    }
    else{
        const newCart = await Session.create({
            sessionId,
            cart: [{
                id: productId,
                quantity: 1
            }]
        })
        return         res.redirect('/products');
    }
        }

    }
}