const Razorpay = require("razorpay");

// apiKey = "rzp_test_ScksCwXv0Z15Xg"; // api key
// apiSecret = "NNlHXD9rvqsvDc"; // Merchant ID

apiKey = "rzp_test_vipRMmY0gmDGWN";
apiSecret = "uJ6VNWdrs2HNLkarJpcluDZV";


const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});


module.exports = razorpay;
