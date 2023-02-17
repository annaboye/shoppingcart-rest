const Product = require("../models/Product");
const ShoppingCart = require("../models/ShoppingCart");

exports.getAllShoppingCarts = async (req, res) => {
  try {
    const shoppingCarts = await ShoppingCart.find();
    const totalShoppingCartsInDataBase = await ShoppingCart.countDocuments();
    return res.json({
      data: shoppingCarts,
      meta: {
        total: totalShoppingCartsInDataBase,
        count: shoppingCarts.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

exports.getShoppingCartById = async (req, res) => {
  try {
    const shoppingCartId = req.params.shoppingCartId;
    if (shoppingCartId.length != 24) {
      return res.status(400).send("Id must be a string of 24 hex characters");
    }

    const shoppingCart = await ShoppingCart.findById(shoppingCartId);

    if (!shoppingCart) return res.sendStatus(404);

    return res.json(shoppingCart);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.createNewShoppingCart = async (req, res) => {
  try {
    const newShoppingCart = await ShoppingCart.create({});

    return res

      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/shoppingcarts/${newShoppingCart._id}`
      )
      .status(201)
      .json(newShoppingCart);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};

exports.updateShoppingCartById = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const shoppingCartId = req.params.shoppingCartId;
  if (productId.length != 24 || shoppingCartId.length != 24) {
    return res.status(400).send("Id must be a string of 24  hex characters");
  }

  try {
    if (!productId && quantity) {
      return res.status(400).json({
        message: "You must provide a productid and quantity to update",
      });
    }

    let shoppingCartToUpdate = await ShoppingCart.findById(shoppingCartId);

    let productDetails = await Product.findById(productId);

    if (!productDetails) {
      return res.status(400).send("That product does not exist");
    }

    if (!shoppingCartToUpdate)
      return res.status(400).send("That cart does not exist");

    const productInCart = shoppingCartToUpdate.cartItems.find(
      ({ product }) => product == productId
    );

    if (productInCart) {
      productInCart.quantity += quantity;
      productInCart.totalItemPrice +=
        productDetails.unitPrice * productInCart.quantity;
      console.log(productInCart.product.unitPrice);
      if (productInCart.quantity <= 0) {
        let listindex = shoppingCartToUpdate.cartItems.indexOf(productInCart);
        shoppingCartToUpdate.cartItems.splice(listindex, 1);
      }
    }

    if (!productInCart && quantity > 0) {
      const newCartItem = {
        product: productId,
        quantity: quantity,
        totalItemPrice: Number(productDetails.unitPrice * quantity),
      };
      shoppingCartToUpdate.cartItems.push(newCartItem);
    }

    let sum = 0;

    for (let x of shoppingCartToUpdate.cartItems) {
      sum += x.totalItemPrice;
    }

    shoppingCartToUpdate.totalprice = sum;

    const updatedShoppingCart = await shoppingCartToUpdate.save();

    return res.json(updatedShoppingCart);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};

exports.deleteShoppingCartById = async (req, res) => {
  const shoppingCartId = req.params.shoppingCartId;
  if (shoppingCartId.length != 24) {
    return res.status(400).send("Id must be a string of 24 hex characters");
  }
  try {
    const shoppingCartToDelete = await ShoppingCart.findById(shoppingCartId);
    if (!shoppingCartToDelete)
      return res.status(400).send("That cart does not exist");

    await shoppingCartToDelete.delete();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};

exports.deleteCartItemById = async (req, res) => {
  const shoppingCartId = req.params.shoppingCartId;
  const productId = req.params.productId;
  if (productId.length != 24 || shoppingCartId.length != 24) {
    return res.status(400).send("Id must be a string of 24 characters");
  }

  try {
    let shoppingCartToUpdate = await ShoppingCart.findById(shoppingCartId);

    const productInCart = shoppingCartToUpdate.cartItems.find(
      ({ product }) => product == productId
    );

    let listindex = shoppingCartToUpdate.cartItems.indexOf(productInCart);
    shoppingCartToUpdate.cartItems.splice(listindex, 1);

    let sum = 0;

    for (let x of shoppingCartToUpdate.cartItems) {
      sum += x.totalItemPrice;
    }

    shoppingCartToUpdate.totalprice = sum;

    const updatedShoppingCart = await shoppingCartToUpdate.save();

    return res.json(updatedShoppingCart);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
