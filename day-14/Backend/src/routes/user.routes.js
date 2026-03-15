const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const  userController  = require("../controllers/user.controller")

const userRouter = express.Router()

// Follow User  /api/users/follow/:username
userRouter.post("/follow/:username", identifyUser,  userController.followUserController)

// Unfollow User /api/users/unfollow/:username
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

// Get all user /api/users/get-users
userRouter.get("/get-users", identifyUser, userController.getUsersController)

// Request accepted /api/user/accepted/:username
userRouter.patch("/accepted/:username", identifyUser, userController.getRequestAcceptedController)

// Request rejected /api/users/rejected/:username
userRouter.patch("/rejected/:username", identifyUser, userController.getRequestRejectedController)

module.exports = userRouter