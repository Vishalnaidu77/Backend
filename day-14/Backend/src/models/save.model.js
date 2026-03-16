const mongoose = require("mongoose")

const saveSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "users"
    },
    caption: {
        type: String,
        ref: "posts"
    },
    imageUrl: {
        type: String,
        ref: "posts"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const saveModel = mongoose.model("savepost", saveSchema)

module.exports = saveModel;