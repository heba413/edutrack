const SchoolNotificationService = require('./school-notification.service');

class SchoolNotificationController {
  static async getNotifications(req, res) {
    try {
      const { schoolId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      
      const notifications = await SchoolNotificationService.getSchoolNotifications(
        schoolId, 
        parseInt(page), 
        parseInt(limit)
      );
      
      const unreadCount = await SchoolNotificationService.getUnreadCount(schoolId);
      
      res.json({
        success: true,
        data: notifications,
        unreadCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(unreadCount / limit)
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async markNotificationAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      const notification = await SchoolNotificationService.markAsRead(notificationId);
      
      res.json({ 
        success: true, 
        data: notification 
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = SchoolNotificationController;