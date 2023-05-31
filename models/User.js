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
        },
    ],
    headline: {
        type: String,
    },
    bio: {
        type: String,
    }
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

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });

    if (!user) {
    throw new Error("Invalid credentials");
    }

  // Compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
    }

    return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;