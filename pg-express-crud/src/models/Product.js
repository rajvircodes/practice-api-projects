const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Product;
