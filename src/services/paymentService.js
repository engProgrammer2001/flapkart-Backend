const { notify } = require("..");
const razorpay = require("../config/razorpayClient.js");
const orderService = require("../services/orderService.js");

// create payment link method
const createPaymentLink = async (orderId) => {
    // console.log("createPaymentLink called : ", orderId.order.totalDiscountedPrice);
  try {
    const order = await orderService.findOrderById(orderId);

    const paymentLinkRequest = {
      amount: order.totalPrice * 100,
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName, //order.shippAddress.name,
        contact: order.user.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:3000/payment/${orderId}`,
      callback_method: "get",
      // notes: {
      //     order_id: orderId
      // }
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    const resData = {
      paymentLinkId,
      payment_link_url,
    };

    return resData;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};



// update payment information
const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await orderService.findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();
    }

    const resData = {
      message: "Your Order is Placed Successfully",
      success: true,
    };
    return resData;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};



module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
