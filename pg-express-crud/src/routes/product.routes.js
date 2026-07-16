const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createCategory,
  getCateProducts,
} = require("../controllers/product.controller");

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/cat", getCateProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/category", createCategory);
module.exports = router;
