const { products } = require("./products");
const Product = require("../src/models/Product");
const mongoose = require("mongoose");
require("dotenv").config();

const seedProductsDb = async () => {
  let conn;

  try {
    mongoose.set("strictQuery", false);
    conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);

    console.log("Clearing database..");
    await Product.deleteMany();

    console.log("Adding data..");

    await Product.create(products);

    console.log("Database successfully populated with data...");
  } catch (error) {
    // Log eny eventual errors to Terminal
    console.error(error);
  } finally {
    // Disconnect from database
    if (conn) conn.disconnect();
    // End Node process
    process.exit(0);
  }
};

seedProductsDb();
