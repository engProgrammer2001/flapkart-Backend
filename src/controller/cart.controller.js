const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const cartService = require("../services/cart.service.js");

// Function to find user cart
const findUserCart = async (req, res) => {
  try {
    const user = await req.user;
    const cart = await cartService.findUserCart(user.id);

    res.status(200).json(cart);
  } catch (error) {
    // Handle error here and send appropriate response
    res.status(500).json({ message: "Failed to get user cart.", error: error.message });
  }
}

// self code 
const addItemToCart = async (req, res) => {
  // console.log("addItemToCart called",  req.body);
  try {
    const user = await req.user;
    const product = await cartService.addCartItem(user._id.toString(), req.body);
    res.status(202).json(product);
    // console.log("product is : ", product);
  } catch (error) {
    console.log("addItemToCart error : ",error);
    // Handle error here and send appropriate response
    res.status(500).json({ message: "Failed to add item to cart.", error: error.message });
  }
}



// Function to add item to cart By jay sir
// const addItemToCart = async (req, res) => {
//   const productId = req.body.productId;
//   try {
//     // const product = await cartService.addCartItem(productId);
//     const product = await Product.findOne({ _id: productId });
//     // console.log("product is___ ", product);
//     return res.status(201).send(product);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
//   // try {
//   //   console.log("addItemToCart called");  // Debug logging
//   //   const user = req.user;
//   //   await cartService.addCartItem(user._id.toString(), req.body);
//   //   res.status(202).json({ message: "Item Added To Cart Successfully", status: true });
//   // } catch (error) {
//   //   console.error('Error in addItemToCart:', error);  // Debug logging
//   //   res.status(500).json({ message: "Failed to add item to cart.", error: error.message });
//   // }
// };

module.exports = { findUserCart, addItemToCart };
