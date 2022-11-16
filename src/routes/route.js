const express = require('express');
const router = express.Router();

const AuthorController = require("../controllers/authorController")
const BlogController = require("../controllers/blogController")



router.post("/createdAuther/authors", AuthorController.createdAuthor)
router.post("/createdBlog", BlogController.createdBlog )
router.get("/getblogdata", BlogController.getBlogs )

router.put("/blogs/:blogId",BlogController.updateblog )

router.delete("/blogs/:blogId",BlogController.deleteBlog )

router.delete("/blogs", BlogController.deleteBlogbyquery)

module.exports = router;