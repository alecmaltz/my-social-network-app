const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const path = require("path");

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

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
