const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate.js");
const paymentController = require("../controller/payment.controller.js");

router.post("/:id", authenticate, paymentController.createPaymentLink);
router.get("/", authenticate, paymentController.updatePaymentInformation);

module.exports = router;
