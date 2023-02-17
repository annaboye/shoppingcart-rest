const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema(
  {
    totalprice: {
      type: Number,
      required: true,
      default: 0,
    },
    cartItems: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          quantity: {
            type: Number,
          },
          totalItemPrice: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
