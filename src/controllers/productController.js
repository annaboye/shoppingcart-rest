const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const totalProductsInDataBase = await Product.countDocuments();

    return res.json({
      data: products,
      meta: {
        total: totalProductsInDataBase,
        count: products.length,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("oops sorry..");
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).send("that product does not exist");
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send("oops sorry..");
  }
};
