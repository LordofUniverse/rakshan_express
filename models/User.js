import mongoose from 'mongoose';
import express from 'express';
// const express = require("express");
// const mongoose = require("mongoose");
var router = express.Router();


const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	orders : [
	{
		products: [
			{ productName : {
				type: String,
				required: [true, "productName is required"]
			},
			quantity : {
				type : Number,
				required : [true, "quantity is required"]
			}
		}
		],
		totalAmount : {
			type : Number,
			required : [true, "totalAmount is required"]
		},
		purchasedOn : {
			type : Date,
			default : new Date(),
			required : [true, "purchased date is required"]
		}
	}
	],
	mobileNo : {
		type : String, 
		required : [true, "Mobile No is required"]
	},
})
const User = mongoose.model("User", userSchema);
export default User;
// module.exports = User;