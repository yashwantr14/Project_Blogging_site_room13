const express = require('express');
const MW = require("../middleware/middle")
const router = express.Router();
const AuthorController = require("../controllers/authorController")
const BlogController = require("../controllers/blogController")



router.post("/authors", AuthorController.createdAuthor)
router.post("/login", AuthorController.login )
router.post("/blogs",  MW.authentication, BlogController.createdBlog )
router.get("/blogs", MW.authentication,  BlogController.getBlogs )
router.put("/blogs/:blogId", MW.authentication ,MW.authorization, BlogController.updateblog )
router.delete("/blogs/:blogId", MW.authentication , MW.authorization, BlogController.deleteBlog )
router.delete("/blogs", MW.authentication, MW.authorization, BlogController.deleteBlogbyquery)



module.exports = router;