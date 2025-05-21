const express = require("express");
const router = express.Router();
const { protect } = require("../../shared/middleware/auth");
const {
  getNotifications,
  getSchoolNotifications,
  readNotification,
  deleteNotification
} = require("./notification.controller");

// Protected routes 
router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, readNotification);
router.delete("/:id", protect, deleteNotification);
// school notification
router.get('/school/:schoolId', protect, getSchoolNotifications);

module.exports = router;