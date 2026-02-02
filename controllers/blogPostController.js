const BlogPost = require("../models/BlogPost");
const serverMessage = require("../utils/serverMessage");

// @desc    Get all blog posts
// @route   GET /api/blogposts
// @access  Public
exports.getBlogPosts = async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.findAll({
      order: [["publishedAt", "DESC"]],
    });
    return serverMessage(res, "BLOG_POSTS_RETRIEVED", blogPosts);
  } catch (error) {
    console.error(error);
    return serverMessage(res, "BLOG_POSTS_RETRIEVAL_ERROR", error.message);
  }
};

// @desc    Get a single blog post by slug
// @route   GET /api/blogposts/:slug
// @access  Public
exports.getBlogPostBySlug = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findOne({
      where: { slug: req.params.slug },
    });
    if (!blogPost) {
      return serverMessage(res, "BLOG_POST_NOT_FOUND");
    }
    return serverMessage(res, "BLOG_POST_RETRIEVED", blogPost);
  } catch (error) {
    return serverMessage(res, "BLOG_POST_RETRIEVAL_ERROR", error.message);
  }
};

// @desc    Create a blog post
// @route   POST /api/blogposts
// @access  Private
exports.createBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.create(req.body);
    return serverMessage(res, "BLOG_POST_CREATED", blogPost);
  } catch (error) {
    return serverMessage(res, "BLOG_POST_CREATE_ERROR", error.message);
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogposts/:id
// @access  Private
exports.updateBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      return serverMessage(res, "BLOG_POST_NOT_FOUND");
    }
    await blogPost.update(req.body);
    return serverMessage(res, "BLOG_POST_UPDATED", blogPost);
  } catch (error) {
    return serverMessage(res, "BLOG_POST_UPDATE_ERROR", error.message);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogposts/:id
// @access  Private
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      return serverMessage(res, "BLOG_POST_NOT_FOUND");
    }
    await blogPost.destroy();
    return serverMessage(res, "BLOG_POST_DELETED");
  } catch (error) {
    return serverMessage(res, "BLOG_POST_DELETE_ERROR", error.message);
  }
};
