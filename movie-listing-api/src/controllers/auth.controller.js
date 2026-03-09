// Authentication controller
// handles user registration and login

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  try {
    // 1.get user data
    const { name, email, password } = req.body;
    // 2.check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    }

    // 3.hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5.generate token
    const token = generateToken(user._id);

    // 6. send response
    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {

    try {
         // 1. get credentials
  const { email, password } = req.body;

  // 2. find user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // 3. compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }

// 4. generate token

const token = generateToken(user._id);

res.status(200).json({
    message:"User login successfully!",
    token, 
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
    }
})
    } catch (error) {
        next(error)
    }

};

