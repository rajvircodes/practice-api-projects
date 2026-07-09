const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello world from express ❤️",
  });
});

router.post("/", (req, res) => {
  const { name, message } = req.body;
  console.log(name, message);

  return res.json({ message: "Thanks for feedback!" });
});

module.exports = router;
