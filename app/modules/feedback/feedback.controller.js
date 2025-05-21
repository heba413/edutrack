const FeedbackService = require('./feedback.service');

class FeedbackController {
  // Submit feedback
  static async submit(req, res) {
    try {
      const { message } = req.body;
      if (!message) throw new Error('Message cannot be empty');
      
      const feedback = await FeedbackService.submitFeedback(
        req.user._id, 
        message
      );
      
      res.status(201).json({ 
        success: true,
        message: 'Feedback submitted successfully'
      });
    } catch (error) {
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // Get all (Admin)
  static async getAll(req, res) {
    try {
      const feedback = await FeedbackService.getAll();
      res.json({ success: true, data: feedback });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Server error' 
      });
    }
  }
}

module.exports = FeedbackController;