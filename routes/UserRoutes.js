const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.post("/register", UserController.registerUser);
// Define other user-related routes as needed

module.exports = router;
