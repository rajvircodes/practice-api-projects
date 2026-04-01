const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const protect = require('../middleware/authMiddleware')

// generate JWT token

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, //payload - data inside token
    process.env.JWT_SECRET, //secret key to sign in
    { expiresIn: "7d" }, // token expires in 7 days
  );
};

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1.check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "Email already registered!",
      });
    }

    // 2.hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3.Create and save new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4.generate token and send response
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Account crated successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/auth/login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // 3. Generate token & send response
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// GET /api/auth/dashboard 

router.get('/dashboard', protect, async (req, res)=>{
  try {
    const user = await User.findById(req.userId).select('-password')
    res.status(200).json({
      message:`Welcome back! ${user.name}`,
      user:user
    })



  } catch (error) {
    res.status(500).json({message:'Server error', error:error.message})
  }
})

module.exports = router;
