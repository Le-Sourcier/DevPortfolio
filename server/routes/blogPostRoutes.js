const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogPostController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getBlogPosts)
  .post(protect, createBlogPost);

router.route('/:slug').get(getBlogPostBySlug);

router.route('/:id')
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

module.exports = router;
