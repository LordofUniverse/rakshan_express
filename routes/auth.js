import express from "express";
import bcrypt from "bcrypt"
import User from "../models/User.js"

// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../models/User.js");
// const authRouter = require("../auth.js");


import { createAccessToken } from "../auth.js";
// const createAccessToken = authRouter.createAccessToken;
var router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  let reqBody = req.body;
  console.log(reqBody);
  console.log(reqBody.email);
  let newUser = await User.create({
    email: reqBody.email,
    isAdmin : false ,
    // password: await bcrypt.hash(reqBody.password,  await bcrypt.genSalt(10)),
    password: reqBody.password,
    mobileNo : "9876543210"
  });

  return res.send(true);
});

// Route for user authentication(login)
router.post("/login", async (req, res) => {
  let reqBody = req.body;
  const result = await User.findOne({ email: reqBody.email })
  
  console.log( result ) 
    // const isPasswordCorrect = bcrypt.compare(reqBody.password, result.password);
    const isPasswordCorrect = reqBody.password == result.password;
    if (isPasswordCorrect) {
  return res.send({ access: createAccessToken(result) })
    } else {
      return res.send(false)
    }
      
});



export default router;
// module.exports = router;