const express = require("express");
const app = express();
const productsRoutes = require("./products");
const messageRoutes = require("./message");
const cors = require("cors");

// built in middleware CORS
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// 1.Product routes
app.use("/products", productsRoutes);
// 2. message routes
app.use("/message", messageRoutes);

// Home routes
app.get("/", (req, res) => {
  res.send("Hello world from backend!");
});

// application listening...
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
