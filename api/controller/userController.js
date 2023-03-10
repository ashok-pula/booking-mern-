const { User } = require("../models/User");
const createError = require("../utils/error");

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, isAdmin, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "no user found with the id"));
    const { password, isAdmin, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    let usersArray = [];
    for (let i = 0; i < users.length; i++) {
      const { password, isAdmin, ...others } = users[i]._doc;
      usersArray.push(others);
    }
    res.status(200).json(usersArray);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
};
