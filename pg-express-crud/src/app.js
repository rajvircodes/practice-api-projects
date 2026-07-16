const express = require("express");
const app = express();
const productRoutes = require("./routes/product.routes");
const { Category } = require("./models/category.model");
const Product = require("./models/Product");

Category.hasMany(Product, {
  foreignKey: "categoryId",
  onDelete: "CASCADE", // If a category is deleted, delete all products in it
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
});
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world from backend!");
});

app.use("/api/products/", productRoutes);

module.exports = app;
