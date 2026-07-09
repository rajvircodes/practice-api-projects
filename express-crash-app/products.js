const express = require("express");
const router = express.Router();

// 1
router.get("/special", (req, res) => {
  const specialProduct = [
    {
      id: 1,
      name: "special",
    },
  ];

  res.json(specialProduct);
});

// 2
router.get("/:id", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 35000 },
    { id: 2, name: "phone", price: 16000 },
  ];

  const id = Number(req.params.id);

  console.log(id);

  const requestedProducts = products.find((product) => product.id === id);
  if (!requestedProducts) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.json(requestedProducts);
});

module.exports = router;
