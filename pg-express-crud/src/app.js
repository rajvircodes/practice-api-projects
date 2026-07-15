const express = require("express");
const app = express();
const productRoutes = require("./routes/product.routes");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world from backend!");
});

app.use("/api/products/", productRoutes);

module.exports = app;
