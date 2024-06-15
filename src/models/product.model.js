const mongoose = require("mongoose");
// productModel.js

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  discountPersent: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  sizes: [{
    name:{type:String},
    quantity:{type:Number}
  }], 
  imageUrl: {
    type: String,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ratings',
    },
  ], 
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reviews',
    },
  ], 
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



// const productSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number, // Changed to Number assuming it's a price
//     required: true,
//   },
//   discountedPrice: {
//     type: Number, // Changed to Number assuming it's a price
//     required: true,
//   },
//   discountPersent: {
//     type: String,
//     default: "20%", // Default value if not provided
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   color: {
//     type: String,
//   },
//   sizes: [
//     {
//       name: { type: String },
//       quantity: { type: Number },
//     },
//   ],
//   imageUrl: {
//     type: String,
//     default:"https://m.media-amazon.com/images/I/314Rp+8XKWL._SX342_SY445_.jpg",
//   },
//   ratings: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ratings",
//     },
//   ],
//   reviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'reviews',
//     },
//   ],
//   numRatings: {
//     type: Number,
//     default: 0,
//   },
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "categories",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

const Product = mongoose.model("products", productSchema);

module.exports = Product;



