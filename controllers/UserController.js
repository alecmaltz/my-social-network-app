const User = require("../models/User");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, city, state } = req.body;
  const pictureLocation = req.file ? req.file.filename : null; // Get the uploaded file's filename

  try {
    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      city,
      state,
      photoLocation: pictureLocation
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Other controller functions...

module.exports = {
  registerUser
  // Other exported functions...
};
