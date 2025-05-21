const express = require('express');
const router = express.Router();
const CommunityChatController = require('./community-chat.controller');
//const { auth } = require('../../shared/middleware/auth');
const { protect } = require("../../shared/middleware/auth");

// Create a new chat
router.post('/', protect, CommunityChatController.createChat);

// Join a chat
router.post('/:chatId/join', protect, CommunityChatController.joinChat);

// Delete chat (soft delete for user)
router.delete('/:chatId', protect, CommunityChatController.deleteChat);

// Get user's chats
router.get('/', protect, CommunityChatController.getChats);

// Send message
router.post('/:chatId/messages', protect, CommunityChatController.sendMessage);

module.exports = router;