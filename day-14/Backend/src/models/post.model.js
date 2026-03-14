const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required for creating a post."]
    },
    user: {
        ref: "users",
        type: String,
        required: [true, "UserId is required for creating an post."]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel;