const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} = require("../controller/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

//create Room

router.post("/:hotelId", verifyAdmin, createRoom);

//update Room
router.put("/:id", verifyAdmin, updateRoom);

//delete Room
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//get a Room
router.get("/find/:id", getRoom);

//get all Rooms
router.get("/", getAllRooms);

router.put("/availability/:id", updateRoomAvailability);
module.exports = router;
