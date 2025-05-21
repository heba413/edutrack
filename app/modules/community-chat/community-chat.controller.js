const CommunityChatService = require('./community-chat.service');

class CommunityChatController {
  // Create a new chat
  static async createChat(req, res) {
    try {
      const { title, isPublic } = req.body;
      const chat = await CommunityChatService.createChat(title, req.user._id, isPublic);
      res.status(201).json({ success: true, data: chat });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Join a chat
  static async joinChat(req, res) {
    try {
      const { chatId } = req.params;
      const chat = await CommunityChatService.joinChat(chatId, req.user._id);
      res.json({ success: true, data: chat });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Soft delete for user
  static async deleteChat(req, res) {
    try {
      const { chatId } = req.params;
      const chat = await CommunityChatService.deleteChatForUser(chatId, req.user._id);
      res.json({ success: true, data: chat, message: "Chat already deleted for user" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get user's chats
  static async getChats(req, res) {
    try {
      const chats = await CommunityChatService.getUserChats(req.user._id);
      res.json({ success: true, data: chats });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Send message
  static async sendMessage(req, res) {
    try {
      const { chatId } = req.params;
      const { content } = req.body;
      const chat = await CommunityChatService.sendMessage(chatId, req.user._id, content);
      res.json({ success: true, data: chat });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = CommunityChatController;