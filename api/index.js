const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.js");
const hotelRouter = require("./routes/hotel.js");
const userRouter = require("./routes/user.js");
const roomRouter = require("./routes/room.js");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb is conncected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 5000, () => console.log("server is running"));
