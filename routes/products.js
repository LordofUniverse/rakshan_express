import express from "express";
// const express = require("express");

import Product from "../models/Product.js";
// const Product = require("../models/Product.js");

var router = express.Router();

router.post("/create" , async (req,res,next) => { 
    if (req.user != undefined && req.user.isAdmin) {
         await Product.create(req.body) // name : ,description : ,price : 
         return res.send(true)
    }
    return res.send("Dont have permission")
})

router.post("/archive" , async (req,res,next) => { 
    console.log("in");
    if (req.user.isAdmin) { 
         await Product.updateOne({ name : req.body.name} , {"$set" : {
             isActive : false 
         }}) // name : ,description : ,price : 
         console.log(false);
         return res.send(true)
    }
    return res.send("Dont have permission")
})

    
    router.post("/activate" , async (req,res,next) => { 
        if (req.user.isAdmin) { 
            console.log(req.body.name);
            await Product.updateOne({ name : req.body.name} , {$set : {
                isActive : true 
            }}) // name : ,description : ,price : 
            console.log(true);
            return res.send(true)
        }
    return res.send("Dont have permission")
})



router.post("/update" , async (req,res,next) => { 
    if (req.user.isAdmin) {
        console.log(req.body);
         await Product.findOneAndUpdate({ "name" : req.body.name }, { "$set" : req.body }) // name : ,description : ,price : 
         return res.send(true)
    }
    return res.send("Dont have permission")
})

router.get("/getProduct",async (req,res) => { 
    let data = await Product.findOne({ name : req.body.name }) 
    return res.send( data )
})

router.get("/activeProducts",async (req,res) => { 
    let data = await Product.find({ isActive : true }) 
    return res.send( data )
})

router.get("/allProducts",async (req,res) => { 
    let data = await Product.find({}) 
    return res.send( data )
})





export default router;
// module.exports = router; 