const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { protect } = require('../middleware/authMiddleware');

// Get comments for a blog post (only approved for public, all for admin)
router.get('/post/:blogPostId', async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const { all } = req.query; // ?all=true for admin to see all comments

    const whereClause = { blogPostId, parentId: null };
    if (!all) {
      whereClause.status = 'approved';
    }

    const comments = await Comment.findAll({
      where: whereClause,
      include: [
        {
          model: Comment,
          as: 'replies',
          where: all ? {} : { status: 'approved' },
          required: false,
          order: [['createdAt', 'ASC']],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      error: false,
      status: 200,
      message: 'Comments retrieved successfully',
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Get all comments (admin)
router.get('/', protect, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json({
      error: false,
      status: 200,
      message: 'All comments retrieved successfully',
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Create a new comment (public)
router.post('/', async (req, res) => {
  try {
    const { blogPostId, parentId, authorName, authorEmail, content } = req.body;

    if (!blogPostId || !authorName || !authorEmail || !content) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: 'blogPostId, authorName, authorEmail and content are required',
      });
    }

    const comment = await Comment.create({
      blogPostId,
      parentId: parentId || null,
      authorName,
      authorEmail,
      content,
      status: 'pending', // Comments need approval
    });

    res.status(201).json({
      error: false,
      status: 201,
      message: 'Comment submitted successfully and awaiting moderation',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Update comment status (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: 'Comment not found',
      });
    }

    comment.status = status;
    await comment.save();

    res.json({
      error: false,
      status: 200,
      message: 'Comment updated successfully',
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Delete comment (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: 'Comment not found',
      });
    }

    // Delete all replies first
    await Comment.destroy({ where: { parentId: id } });
    await comment.destroy();

    res.json({
      error: false,
      status: 200,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

module.exports = router;
