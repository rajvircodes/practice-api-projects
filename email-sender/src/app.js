const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.evn.USER,
    pass: process.env.PASS,
  },
});

const mailOptions = {
  from: process.env.FROM,
  to: process.env.TO,
  subject: "Hello world",
  text: "Hello brother How are you!",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail sent:", info.response);
  }
});
