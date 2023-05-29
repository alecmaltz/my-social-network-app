const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true
    },
    lastName: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
    type: String,
    required: true
    },
    city: {
    type: String,
    required: true
    },
    state: {
    type: String,
    required: true
    },
    aboutMe: {
    type: String
    },
    friendsList: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ],
    photoLocation: {
    type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
