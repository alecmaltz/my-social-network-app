const express = require("express");
const { useState } = require("react");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const userRouter = require("../routes/userRouter");
require("dotenv").config();

 
const app = express();
const router = express.Router();

app.use("/api/users", userRouter);

  // Set up the storage for uploaded files
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const userId = req.body.email;
      const ext = path.extname(file.originalname);
      cb(null, `${userId}${ext}`);
    }
  });

  // Create the multer upload instance
  const upload = multer({ storage });

  const validateUserCredentials = async (email, password) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return false;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error validating credentials:", error);
      return false;
    }
  };

  router.post("/register", upload.single("picture"), UserController.registerUser);

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const isValidCredentials = await validateUserCredentials(email, password);

      if (!isValidCredentials) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Retrieve the user ID from the User model
      const user = await User.findOne({ email });
      const userId = user._id; // Assuming the user ID is stored in the _id field

      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      // Redirect the user to their page with the dynamically updated user ID
      res.redirect(`/api/users/${userId}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/:id", authMiddleware.authenticateToken, UserController.getUserById);

  router.put("/:id", authMiddleware.authenticateToken, UserController.updateUser);

  router.delete(
    "/:id",
    authMiddleware.authenticateToken,
    UserController.deleteUser
  );

  router.get("/check-login", authMiddleware.authenticateToken, (req, res) => {
    res.sendStatus(200);
  });


module.exports = router;
