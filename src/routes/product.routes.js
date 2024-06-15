const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

router.get("/",  productController.getAllProducts);
// router.get("/filterproduct",  productController.getAllProducts);
router.get("/id/:id", authenticate, productController.findProductById);
// router.get("/category/:category", authenticate, productController.findProductByCategory);

module.exports = router;
