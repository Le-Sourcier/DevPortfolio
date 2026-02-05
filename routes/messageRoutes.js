const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');

// Get all messages (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json({
      error: false,
      status: 200,
      message: 'Messages retrieved successfully',
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Get single message (admin only)
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: 'Message not found',
      });
    }

    // Mark as read if new
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    res.json({
      error: false,
      status: 200,
      message: 'Message retrieved successfully',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Create a new message (public - from contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, company, projectType, budget, timeline, message: msgContent } = req.body;

    if (!name || !email || !msgContent) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: 'name, email and message are required',
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      company: company || null,
      projectType: projectType || null,
      budget: budget || null,
      timeline: timeline || null,
      message: msgContent,
      status: 'new',
    });

    res.status(201).json({
      error: false,
      status: 201,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Update message status (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: 'Message not found',
      });
    }

    if (status) message.status = status;
    if (notes !== undefined) message.notes = notes;
    await message.save();

    res.json({
      error: false,
      status: 200,
      message: 'Message updated successfully',
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      status: 500,
      message: error.message,
    });
  }
});

// Delete message (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: 'Message not found',
      });
    }

    await message.destroy();

    res.json({
      error: false,
      status: 200,
      message: 'Message deleted successfully',
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
