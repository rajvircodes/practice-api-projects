const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully!", conn.connection.host);
  } catch (error) {
    console.log("ERROR:- mongodb connection error", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
