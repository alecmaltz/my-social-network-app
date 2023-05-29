const express = require("express");
const multer = require("multer");
const path = require("path");
const UserController = require("../controllers/UserController");

const router = express.Router();

// Set up the storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const userId = req.body.email; // You can use any unique identifier for the filename, such as the email
    const ext = path.extname(file.originalname);
    cb(null, `${userId}${ext}`); // Set the filename as the user ID with the original file extension
  }
});

// Create the multer upload instance
const upload = multer({ storage });

// Handle user registration with file upload
router.post("/register", upload.single("picture"), (req, res) => {
  const { firstName, lastName, email, password, city, state } = req.body;
  const pictureLocation = req.file ? req.file.filename : null; // Get the uploaded file's filename

  // Save the user and pictureLocation to the database
  // ...

  res.status(200).json({ message: "Registration successful" });
});

// Other routes and handlers...

module.exports = router;
