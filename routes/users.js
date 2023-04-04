import express from "express";
// const express = require("express");

import User from "../models/User.js"
// const User = require("../models/User.js");

import Product from "../models/Product.js";
// const Product = require("../models/Product.js");

var router = express.Router();



router.get("/userDetails", async (req, res) => {
    if (req.user.isAdmin) { 
         await User.findOne({ email : req.user.email}) // name : ,description : ,price : 
         return res.send(data)
    }
    return res.send("Dont have permission")
})

router.get("/userorders", async (req, res) => {
    if (req.user.isAdmin) { 
        let ret = [];
        try {
            let data = await User.find({}) 
            await Promise.all(data.map(async ({ _id, email, password, isAdmin, mobileNo, orders, __v }) => {
                if (orders.length != 0) {
                    for (let ind = 0; ind < orders.length; ind++) {
                        let prod = orders[ind].products;
                        console.log(prod);
                        for (let inde = 0; inde < prod.length; inde++) {
                            let a = {
                                "email": email,
                                "order": prod[inde]
                            };

                            ret.push(a);
                        }
                    }
                }
            }));
         return res.send(ret);

        } catch {
    
            return res.send(false);
        
        } 
    }
    return res.send("Dont have permission")
})

router.get("/allusers", async (req, res) => {
    if (req.user.isAdmin) { 
        let data = await User.find({}) 
        return res.send( data )
    }
    return res.send("Dont have permission")
})

router.get("/isadmin", async (req, res) => {
    if (req.user.isAdmin) { 
         return res.send("true");
    }
    return res.send("false");
})

router.post("/makeadmin", async (req, res) => {
    console.log(req.body.email);
    if (req.user.isAdmin) { 
        await User.findOneAndUpdate({ "email" : req.body.email }, { "$set" : {isAdmin: true} })
        console.log("admin");
         return res.send("true");
    }
    return res.send("false");
})

router.post("/revokeadmin", async (req, res) => {
    console.log(req.body.email);
    console.log(req.user.email);
    if (req.user.isAdmin && req.user.email != req.body.email) { 
        await User.findOneAndUpdate({ "email" : req.body.email }, { "$set" : {isAdmin: false} })
        console.log("not admin");
         return res.send("true");
    }
    return res.send("false");
})

router.post("/createOrder", async (req,res) => {
    let products = req.body ;
    let total = 0 
    console.log(products);
    try {

        let data = await Promise.all(products.map(async ({ productName, quantity }) => {
            try {
                console.log(productName);
                console.log(quantity);
                await Product.findOne({ name : productName }).then((res) => { 
                    console.log(res);
                    console.log(res.price);
                    total += res.price * quantity 
                })
                return total;
            } catch(error) {
               return { error };
            }
        }));

        console.log(total);
        User.updateOne({ email : req.user.email } , { "$push" : { 
            orders : { products : products , totalAmount : total }
        }}).then(() => {
            return res.send(true);
        })

        // products.map(({ productName, quantity })=> {
        //     console.log(productName);
        //     console.log(quantity);
        //     await Product.findOne({ name : productName }).then((res) => { 
        //         console.log(res);
        //         console.log(res.price);
        //         total += res.price * quantity 
        //     })
        // }).then(() => {
        //     console.log(total);
        //     User.updateOne({ email : req.user.email } , { "$push" : { 
        //         orders : { products : products , totalAmount : total }
        //     }}).then(() => {
        //         return res.send(true);
        //     })
        // })

    } catch {
    
        return res.send(false);
    
    }
})


export default router;
// module.exports = router;