const express = require("express");
const multer = require("multer");
const path = require("path");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

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

// Define the registration route (excluded from authentication)
router.post("/register", upload.single("picture"), UserController.registerUser);

// Apply authentication middleware to all remaining routes
router.use(authMiddleware.authenticateToken);

// Define the login route (excluded from authentication)
router.post("/login", UserController.loginUser);

// Define the check-login route (requires authentication)
router.get("/check-login", authMiddleware.authenticateToken, UserController.checkLogin);

// Define the route for getting a user by ID
router.get("/:id", UserController.getUserById);

// Define the route for updating a user
router.put("/:id", UserController.updateUser);

// Define the route for deleting a user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
