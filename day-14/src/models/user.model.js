const { Mongoose, default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists."],
        require: [true, "Username is required."]
    },
    email: {
        type: String,
        unique: [true, "User is already exists with this email"],
        require: [true, "Email is required"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/vishalnaidu/default-avatar-profile-icon-social-600nw-1906669723.webp"
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;