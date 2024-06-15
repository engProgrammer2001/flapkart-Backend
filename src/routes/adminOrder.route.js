const express = require("express");
const router = express.Router();
 
const authenticate = require("../middleware/authenticate.js");
const adminOrderController = require("../controller/adminOrder.controller.js");


router.get("/",authenticate, adminOrderController.getAllOrders  );
router.put("/:orderId/confirmed",authenticate,adminOrderController.confirmedOrders);
router.put("/:orderId/ship",authenticate,adminOrderController.shippOrders);
router.put("/:orderId/deliver",authenticate,adminOrderController.deliverOrders);
router.put("/:orderId/cancel",authenticate,adminOrderController.canelledOrders);
router.delete("/:orderId/delete",authenticate,adminOrderController.deleteOrders);

module.exports = router;
