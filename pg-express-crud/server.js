const express = require("express");
require("dotenv").config();
const sequelize = require("./database");
const Product = require("./Product");

const app = express();

app.use(express.json());

// Sync database / connect database
sequelize
  .sync({ alter: true })
  .then(() => console.log("PostgreSQL database is connected and synced!"))
  .catch((err) => console.error("Database sync error!", err));

//   Health checker

app.get("/", (req, res) => {
  console.log("Hello world from backend!");
  res.send("hello world from backend!");
});

// 1.CREATE (POST)
app.post("/product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2.READ ALL (GET)

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. READ ONE (GET)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4.UPDATE (PUT)

app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE (DELETE)

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
