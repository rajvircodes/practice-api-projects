// db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

// 1. Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
);

const connectDB = async () => {
  try {
    
    await sequelize.authenticate();
    console.log("PostgreSQL database connection established successfully!");


    await sequelize.sync({ alter: true });
    console.log("Database models synced successfully.");
  } catch (err) {
    console.error("Database connection/sync error:", err);
    process.exit(1); 
  }
};

module.exports = { sequelize, connectDB };
