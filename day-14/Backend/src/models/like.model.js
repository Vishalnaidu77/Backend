const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    user: {
        type: String,
        ref: "users",
        required: true
    }
}, {
    timestamps: true
})

likeSchema.index({ user: 1, post: 1}, { unique: true })

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel