const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createHotel = async (req, res) => {
  try {
    // console.log(req.body);
    const newHotel = new Hotel(req.body);
    const hotel = await newHotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    next(err);
  }
};
const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(err);
  }
};
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel deleted successfully");
  } catch (error) {
    next(error);
  }
};
const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const getAllHotels = async (req, res, next) => {
  // console.log("iam route");

  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit || 4);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  // console.log("iam route");
  try {
    const cities = req.query?.cities.split(",");
    // console.log(cities);
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    // const hotels = await Hotel.find();
    res.status(200).json(list);
    // console.log(list);
  } catch (error) {
    next(error);
  }
};
const countByType = async (req, res, next) => {
  // console.log("iam route");
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  countByCity,
  countByType,
  getHotelRooms,
};
