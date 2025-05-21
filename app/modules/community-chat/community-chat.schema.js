const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deleted: { type: Boolean, default: false } // Soft delete flag
  }],
  messages: [messageSchema],
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CommunityChat', chatSchema);