const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
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
    photoLocation: {
    type: String
    },
    friendsList: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    ]
});

// Hash the password before saving
userSchema.pre("save", async function(next) {
    try {
    // Only hash the password if it's modified or newly created
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
    } catch (error) {
    return next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
    try {
    return await bcrypt.compare(password, this.password);
    } catch (error) {
    throw new Error(error);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
