const Notification = require("./notification.schema");

// Create a notification
const createNotification = async (userId, title, message, type = "alert", link = null) => {
  return await Notification.create({ userId, title, message, type, link });
};

// Get all notifications for a user (unread first)
const getUserNotifications = async (userId) => {
  return await Notification.find({ userId })
    .sort({ isRead: 1, createdAt: -1 }); // Unread first, then newest
};

// Mark as read
const markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
};

// Delete a notification
const deleteNotification = async (notificationId, userId) => {
  return await Notification.findOneAndDelete({ _id: notificationId, userId });
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification
};