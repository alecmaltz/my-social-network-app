const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/my-social-network-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", err => {
  console.error("Database connection error:", err);
});

// Use the userRoutes in your application
app.use("/api/users", userRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
