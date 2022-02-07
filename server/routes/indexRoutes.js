const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.home);
router.get("/about", indexController.about);
router.get("/studio", indexController.studio);
router.get("/products", indexController.products);
router.get("/product/:id", indexController.productDetails);

module.exports = router;
