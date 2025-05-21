const SchoolNotification = require('./school-notification.schema');

class SchoolNotificationService {
  static async createApplicationNotification(schoolId, applicantId, applicationId) {
    return await SchoolNotification.create({
      schoolId,
      applicantId,
      applicationId,
      message: 'New application received'
    });
  }

  static async getSchoolNotifications(schoolId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    return await SchoolNotification.find({ schoolId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('applicantId', 'name email') // Populate applicant details
      .populate('applicationId', 'status appliedAt'); // Populate application details
  }

  static async markAsRead(notificationId) {
    return await SchoolNotification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
  }

  static async getUnreadCount(schoolId) {
    return await SchoolNotification.countDocuments({
      schoolId,
      isRead: false
    });
  }
}

module.exports = SchoolNotificationService;