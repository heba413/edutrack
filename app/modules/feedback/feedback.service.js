const Feedback = require('./feedback.schema');

class FeedbackService {
  // Submit feedback (message only)
  static async submitFeedback(userId, message) {
    const feedback = new Feedback({ user: userId, message });
    return await feedback.save();
  }

  // Get all feedback (for admin dashboard)
  static async getAll() {
    return await Feedback.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
  }
}

module.exports = FeedbackService;