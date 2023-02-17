const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/ProductController");

router.get("/", getAllProducts);
router.get("/:productId", getProductById);

module.exports = router;
