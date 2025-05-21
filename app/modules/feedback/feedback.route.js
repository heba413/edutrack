const express = require('express');
const router = express.Router();
const FeedbackController = require('./feedback.controller');
//const { auth, checkRole } = require('../../shared/middleware/auth');
const { protect } = require("../../shared/middleware/auth");

// User submission
router.post('/', protect, FeedbackController.submit);

// Admin view
//router.get('/', protect, checkRole('ADMIN'), FeedbackController.getAll);

module.exports = router;