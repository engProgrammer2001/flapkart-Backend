const express = require("express");

const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to e-commerce api - node ", status: true });
});

// auth router
const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);

// user router
const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters);

// product router
const productRouter = require("./routes/product.routes.js");
app.use("/api/proudcts", productRouter);

const adminProductRouter = require("./routes/adminProduct.routes.js");
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./routes/cart.route.js");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.routes.js");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders", orderRouter);

const adminOrderRouter = require("./routes/adminOrder.route.js");
app.use("/api/admin/orders", adminOrderRouter);


const reviewRouter = require("./routes/review.route.js");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating-route.js");
app.use("/api/ratings", ratingRouter);

const paymentRouter = require("./routes/payment.routes.js");
app.use("/api/payments", paymentRouter);

module.exports = app;
