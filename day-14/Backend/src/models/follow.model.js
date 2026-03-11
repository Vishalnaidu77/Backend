const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        ref: "users",
        required: true
    },
    followee: {
        type: String,
        ref: "users",
        required: true 
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: [ "pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted or rejected"
        }
    }
}, { timestamps: true })

followSchema.index({ follower: 1, followee: 1}, { unique: true})

const followModel = mongoose.model("follow", followSchema)

module.exports = followModel