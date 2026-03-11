const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller");
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

// POST /api/posts [protected]
// req.body = { caption, imageFile }

// /api/posts/
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)


// GET /api/posts/ [Protected]
postRouter.get("/", identifyUser, postController.getPostController)


// GET api/posts/details/:postid
// Returns detail avout specific post with the id. also check whether the post belongs to the user that requres comes from
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

// /api/posts/likes/:postid
postRouter.post("/likes/:postid", identifyUser, postController.likedPostController)
module.exports = postRouter;