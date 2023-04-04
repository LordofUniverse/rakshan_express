import mongoose from 'mongoose';
// const mongoose = require("mongoose");
import express from 'express';

const prodSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, "Name is required"]
	},
	description : {
		type : String,
		required : [true, "Description is required"]
	},
	price : {
		type : Number,
		required : [true, "Price is required"]
	},
	isActive : {
		type : Boolean,
		default : true
	},
	createdOn : {
		type : Date,
		default : new Date()
	},
	orders : [
		{
			orderId : {
				type : String,
				required : [true, "Order ID is required"]
			}
		}
	]
})

const Product =  mongoose.model("Product", prodSchema);
export default Product;
// module.exports = Product 