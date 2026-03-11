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


module.exports = {
    followUserController,
    unfollowUserController
}