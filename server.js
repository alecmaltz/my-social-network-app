const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const path = require("path");
const UserController = require("./controllers/UserController");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors({ origins: ["http://localhost:3000"] }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  next();
});

app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.post("/api/users/register", UserController.registerUser);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/userRouter");

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", err => {
  console.error("Database connection error:", err);
});

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
