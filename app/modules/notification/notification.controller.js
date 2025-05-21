const notificationService = require("./notification.service");

// Get all notifications for the current user
const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user._id);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get school notification
const getSchoolNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      'recipient.kind': 'School',
      'recipient.item': req.params.schoolId
    }).sort('-createdAt');
    
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark notification as read
const readNotification = async (req, res) => {
  try {
    const updated = await notificationService.markAsRead(
      req.params.id,
      req.user._id
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotification(req.params.id, req.user._id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getNotifications,
  getSchoolNotifications,
  readNotification,
  deleteNotification
};