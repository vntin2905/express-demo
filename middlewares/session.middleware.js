// // const shortid = require('shortid')
// // const db = require('../db')
// // module.exports = function(req,res,next){
// //     if (!req.signedCookies.sessionId){
// //         let sessionId = shortid.generate();
// //         res.cookie('sessionId',sessionId,{
// //             signed: true
// //         })
// //         db.get('sessions').push({id: sessionId}).write();
// //     }
// //     let sessionCart = db.get('sessions').find({id: req.signedCookies.sessionId}).get('cart').value();
// //     let total = 0;
// //     for (let key in sessionCart){
// //         // let total = 0;
// //         total += sessionCart[key];
// //     }
// //     res.locals.total = total;
// //     next();
// // }
// const shortid = require('shortid')
// const Session = require('../models/session.model')
// module.exports = async function(req,res,next){
//     if (!req.signedCookies.sessionId){
//         let sessionId = shortid.generate();
//         res.cookie('sessionId',sessionId,{
//             signed: true
//         })
//         const newSession = new Session({sessionId});
//         newSession.save();
//         // db.get('sessions').push({id: sessionId}).write();
//     }
//     const session = await Session.find();
//     let total = 0;
//     for(let value of session){
//         total = value.cart.reduce((sum,cur)=>{return sum+=cur.quantity},0);
//     }

//     // let total = sessionCart.reduce((sum,cur)=>{return sum+=cur.quantity},0); 
//     // console.log(total)
//     // let sessionCart = db.get('sessions').find({id: req.signedCookies.sessionId}).get('cart').value();
//     // let total = 0;
//     // for (let key in sessionCart){
//     //     // let total = 0;
//     //     total += sessionCart[key];
//     // }
//     // res.locals.total = total;
    
// //     for(let value of sessionCart){
// // total += value.quantity;
// //     }
//     res.locals.total = total;
//     next();
// }
// const shortid = require('shortid')
// const db = require('../db')
// module.exports = function(req,res,next){
//     if (!req.signedCookies.sessionId){
//         let sessionId = shortid.generate();
//         res.cookie('sessionId',sessionId,{
//             signed: true
//         })
//         db.get('sessions').push({id: sessionId}).write();
//     }
//     let sessionCart = db.get('sessions').find({id: req.signedCookies.sessionId}).get('cart').value();
//     let total = 0;
//     for (let key in sessionCart){
//         // let total = 0;
//         total += sessionCart[key];
//     }
//     res.locals.total = total;
//     next();
// }
const shortid = require('shortid')
const Session = require('../models/session.model')
const User = require('../models/user.model')
module.exports = async function(req,res,next){
    if (!req.signedCookies.sessionId){
        if (!req.signedCookies.userId){

            let sessionId = shortid.generate();
            res.cookie('sessionId',sessionId,{
                signed: true
            })
            const newSession = new Session({sessionId});
            newSession.save();
        }
        else{
            let total = 0;
            const user = await User.findOne({_id: req.signedCookies.userId})
            const userCart = user.cart;
            for(let value of userCart){
                total += value.quantity;
            }
            res.locals.total = total;
        }
        // next();
        // db.get('sessions').push({id: sessionId}).write();
    }
    else{
        const session = await Session.findOne({sessionId: req.signedCookies.sessionId});
        let total = 0;
        if (!req.signedCookies.userId){
            for(let value of session.cart){
                total += value.quantity;
            }
        }
        else{
            const sessionCart = session.cart;
            let user = await User.findOne({_id: req.signedCookies.userId})
            const userCart = user.cart;
            userCart.push(...sessionCart);
            // for(let value of userCart){
            //     total += value.quantity;
            // }
            // console.log(total)
            // for (let value of sessionCart){
            //     session.deleteMany(value);
            // }
            user = user.save();
            res.clearCookie('sessionId');
        }
        res.locals.total = total;
        // next();
    }
    // const session = await Session.findOne({sessionId});
    // let total = 0;
    // for(let value in session.cart){
    //     total += value.quantity;
    // }

    // let total = sessionCart.reduce((sum,cur)=>{return sum+=cur.quantity},0); 
    // console.log(total)
    // let sessionCart = db.get('sessions').find({id: req.signedCookies.sessionId}).get('cart').value();
    // let total = 0;
    // for (let key in sessionCart){
    //     // let total = 0;
    //     total += sessionCart[key];
    // }
    // res.locals.total = total;
    
//     for(let value of sessionCart){
// total += value.quantity;
//     }
res.locals.userId = req.signedCookies.userId;
    next();
}