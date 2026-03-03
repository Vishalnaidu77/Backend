const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller");
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })


// POST /api/posts [protected]
// req.body = { caption, imageFile }

// /api/posts/
postRouter.post("/", upload.single("image"), postController.createPostController)


// GET /api/posts/ [Protected]
postRouter.get("/", postController.getPostController)


// GET api/posts/details/:postid
// Returns detail avout specific post with the id. also check whether the post belongs to the user that requres comes from
postRouter.get("/details/:postId", postController.getPostDetailsController)

module.exports = postRouter;