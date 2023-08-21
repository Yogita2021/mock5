const express = require("express");
require("dotenv").config();
const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(201).json({ isError: true, msg: "User already exist" });
    }
    const hashpassword = bcrypt.hashSync(password, 8);
    const newuser = new User({ email, password: hashpassword });
    await newuser.save();
    res.status(200).json({
      isError: false,
      msg: "user registerd successful",
      user: newuser,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).json({ msg: "Please register" });
    }
    const passcheck = bcrypt.compareSync(password, user.password);
    if (!passcheck) {
      return res.status(201).json({ msg: "Invalid Credentials" });
    }
    const payload = { email, id: user._id };
    const token = jwt.sign(payload, process.env.secreteKey, {
      expiresIn: "8h",
    });
    res
      .status(200)
      .json({ msg: "Login Successful", isError: false, token: token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
module.exports = { userRouter };
