const CommunityChat = require('./community-chat.schema');

class CommunityChatService {
  // Create a new chat
  static async createChat(title, creatorId, isPublic = true) {
    const chat = new CommunityChat({
      title,
      creator: creatorId,
      participants: [{ user: creatorId, deleted: false }],
      isPublic
    });
    return await chat.save();
  }

  // Join an existing chat
  static async joinChat(chatId, userId) {
    return await CommunityChat.findByIdAndUpdate(
      chatId,
      { $addToSet: { participants: { user: userId, deleted: false } } },
      { new: true }
    );
  }

  // Soft delete chat for a user
  static async deleteChatForUser(chatId, userId) {
    return await CommunityChat.findOneAndUpdate(
      { _id: chatId, 'participants.user': userId },
      { $set: { 'participants.$.deleted': true } },
      { new: true }
    );
  }

  // Get all visible chats for a user (excluding soft-deleted ones)
  static async getUserChats(userId) {
    return await CommunityChat.find({
      'participants.user': userId,
      'participants.deleted': false
    }).populate('creator', 'name email');
  }

  // Send a message to a chat
  static async sendMessage(chatId, senderId, content) {
    return await CommunityChat.findByIdAndUpdate(
      chatId,
      { $push: { messages: { sender: senderId, content } } },
      { new: true }
    );
  }
}

module.exports = CommunityChatService;