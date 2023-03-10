const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return next(createError(400, "user already registered"));
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    const { password, isAdmin, ...others } = newUser._doc;
    res.status(201).json(others);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return next(createError(404, "password is not matching"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "3d" }
    );
    res.cookie("access_token", token, { httpOnly: true });
    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
