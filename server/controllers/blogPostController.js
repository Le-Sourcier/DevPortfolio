const BlogPost = require('../models/BlogPost');

// @desc    Get all blog posts
// @route   GET /api/blogposts
// @access  Public
exports.getBlogPosts = async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.findAll({ order: [['publishedAt', 'DESC']] });
    res.status(200).json({ success: true, data: blogPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single blog post by slug
// @route   GET /api/blogposts/:slug
// @access  Public
exports.getBlogPostBySlug = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findOne({ where: { slug: req.params.slug } });
    if (!blogPost) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: blogPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a blog post
// @route   POST /api/blogposts
// @access  Private
exports.createBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: blogPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogposts/:id
// @access  Private
exports.updateBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    await blogPost.update(req.body);
    res.status(200).json({ success: true, data: blogPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogposts/:id
// @access  Private
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    await blogPost.destroy();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
