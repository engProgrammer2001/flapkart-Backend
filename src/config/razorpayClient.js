const Razorpay = require("razorpay");
require("dotenv").config();

const apiKey = process.env.RAZORPAY_API_KEY;
const apiSecret = process.env.RAZORPAY_API_SECRET_KEY;


const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});


module.exports = razorpay;
