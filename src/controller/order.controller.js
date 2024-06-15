const orderService = require("../services/orderService.js");

// self code 
// const createOrder = async (req, res) => {
//   const user = req.user;
//   try {
//     let createdOrder = await orderService.createOrder(user, req.body);
//     res.status(201).send(createdOrder);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };


// new code 
const createOrder = async (req, res) => {
  const user = req.user;
  console.log("userr ",user,"req.body data is : ",req.body)
  try {
    let createdOrder = await orderService.createOrder(user, req.body);

    console.log("order ", createdOrder);

    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// self code 
// const findOrderById = async (req, res) => {
//   // console.log("findOrderById called : ", req.user,);
//   const user = req.user;
//   try {
//     let createdOrder = await orderService.createOrder(user, req.body);
//     return res.status(201).send(createdOrder);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };


// new code 
const findOrderById = async (req, res) => {
  // console.log("hii")
  const user = await req.user;
  // console.log("userr ",user,req.body)
  try {
    let order = await orderService.findOrderById(req.params.id);
    return res.status(201).send(order);

  } catch (error) {
    console.log("findOrderById error : ",error);
    return res.status(500).send(error.message);
  }
}

const OrderHistory = async (req, res) => {
  const user = await req.user;
  try {
    let createdOrder = await orderService.usersOrderHistory(user._id);
    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  OrderHistory,
};
