const mongoose = require("mongoose");

// import mongoose from mongoose ;

const reviewsSchema = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const Reviews = mongoose.model("reviews", reviewsSchema);



module.exports = Reviews;
