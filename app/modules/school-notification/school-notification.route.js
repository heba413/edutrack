const express = require('express');
const router = express.Router();
const SchoolNotificationController = require('./school-notification.controller');
const { schoolAuth } = require('../../shared/middleware/schoolAuth');

// Get notifications for a school
router.get('/:schoolId', schoolAuth, SchoolNotificationController.getNotifications);

// Mark notification as read
router.patch('/:notificationId/read', schoolAuth, SchoolNotificationController.markNotificationAsRead);

module.exports = router;