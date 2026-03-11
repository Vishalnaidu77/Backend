const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const  userController  = require("../controllers/user.controller")

const userRouter = express.Router()

// Follow User  /api/users/follow/:username
userRouter.post("/follow/:username", identifyUser,  userController.followUserController)

// Unfollow User /api/users/unfollow/:username
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

module.exports = userRouter