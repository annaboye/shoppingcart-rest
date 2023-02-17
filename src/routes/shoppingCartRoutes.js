const express = require("express");
const router = express.Router();
const {
  getAllShoppingCarts,
  getShoppingCartById,
  createNewShoppingCart,
  updateShoppingCartById,
  deleteShoppingCartById,
  deleteCartItemById,
} = require("../controllers/ShoppingCartController");

router.get("/", getAllShoppingCarts);
router.get("/:shoppingCartId", getShoppingCartById);
router.post("/", createNewShoppingCart);
router.put("/:shoppingCartId", updateShoppingCartById);
router.delete("/:shoppingCartId", deleteShoppingCartById);
router.delete("/:shoppingCartId/:productId", deleteCartItemById);

module.exports = router;
