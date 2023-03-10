const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controller/userController");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//update User
router.put("/:id", verifyUser, updateUser);

//delete User
router.delete("/:id", verifyUser, deleteUser);

//get a User
router.get("/find/:id", verifyUser, getUser);

//get all Users
router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
