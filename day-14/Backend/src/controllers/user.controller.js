const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res){
    const username = req.user.username
    const followeeUsername = req.params.username

    const isUserExist = await userModel.findOne({ username: followeeUsername })
    if(!isUserExist){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isAlreadyFollowed = await followModel.findOne({
        follower: username,
        followee: followeeUsername
    })

    if(isAlreadyFollowed){
        return res.status(200).json({
            message: `You already follow ${followeeUsername}`,
            follow: isAlreadyFollowed
        })
    }

    if(username === followeeUsername){
        return res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const followRecord = await followModel.create({
        follower: username,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        followRecord
    })
}

async function unfollowUserController(req, res){
    const username = req.user.username
    const followeeUsername = req.params.username

    const isNotFollowed = await followModel.findOne({
        follower: username,
        followee: followeeUsername
    })

    if(!isNotFollowed){
        return res.status(200).json({
            message: `You're not follow ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isNotFollowed._id)

    res.status(200).json({
        message: `You're unfollowing ${followeeUsername}`
    })
}

async function getUsersController(req, res){
    const currUser = req.user

    if(!currUser){
        return res.status(401).json({
            message: "Unauthorized user, login first"
        })
    }

    const users = await userModel.find()

    res.status(200).json({
        message: "Users fetch successfully",
        users
    })
}

async function getRequestAcceptedController(req, res){
    const username = req.user.username
    const followerUsername = req.params.username

    const loginUser = await userModel.findOne({ username })

    if(!loginUser){
        return res.status(401).json({
            message: "Unauthorized User."
        })
    }

    const follower = await followModel.findOne({
        follower: followerUsername,
        followee: username
    })

    if(!follower){
        return res.status(404).json({
            message: "Request not found"
        })
    }

    const followerUser = await userModel.findOne({ username: followerUsername })

    if(!followerUser){
        return res.status(404).json({
            message: "Follower user not found"
        })
    }

    await followModel.findByIdAndUpdate(follower._id, {
        status: "accepted"
    })
    
    const user = await userModel.findOneAndUpdate(
        { username },
        {
            $addToSet: {
                followers: followerUser
            }
        },
        { new: true }
    )

    await userModel.findOneAndUpdate(
        { username: followerUsername },
        {
            $addToSet: {
                following: loginUser
            }
        }
    )

    res.status(200).json({
        message: "Request accepted",
        user
    })

}

async function getRequestRejectedController(req, res) {
    const username = req.user.username
    const followerUsername = req.params.username

    const loginUser = await followModel.findOne({ followee: username})

    if(!loginUser){
        return res.status(404).json({
            message: "Unauthorized user"
        })
    }

    const user = await followModel.findOne({ follower: followerUsername})

    if(!user){
        return res.status(404).json({
            message: "Request not found"
        })
    }

    await followModel.findByIdAndUpdate(user._id, {
        status: "rejected"
    })

    res.status(200).json({
        message: "Request rejected",
        user
    })
}



module.exports = {
    followUserController,
    unfollowUserController,
    getUsersController,
    getRequestAcceptedController,
    getRequestRejectedController
}