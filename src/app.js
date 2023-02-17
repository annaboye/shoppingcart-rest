require("dotenv").config();

const mongoose = require("mongoose");

const express = require("express");
const productRoutes = require("./routes/productRoutes");
const shoppingCartRoutes = require("./routes/shoppingCartRoutes");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);

  next();
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/shoppingcarts", shoppingCartRoutes);

const port = process.env.PORT || 5000;
async function run() {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
