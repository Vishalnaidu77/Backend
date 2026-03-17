const mongoose = require("mongoose")

const saveSchema = new mongoose.Schema({
    saveUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    postUserUsername: String,
    postUserProfileImage: String,
    caption: String,
    imageUrl: String,
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