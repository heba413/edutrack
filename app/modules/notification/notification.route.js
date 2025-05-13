const express = require("express");
const router = express.Router();
const { protect } = require("../../shared/middleware/notifyAuth");
const {
  getNotifications,
  readNotification,
  deleteNotification
} = require("./notification.controller");

// Protected routes 
router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, readNotification);
router.delete("/:id", protect, deleteNotification);


module.exports = router;