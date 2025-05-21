const mongoose = require('mongoose');

const schoolNotificationSchema = new mongoose.Schema({
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'School', 
    required: true 
  },
  applicantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  applicationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application', 
    required: true 
  },
  message: { 
    type: String, 
    default: 'New application received' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('SchoolNotification', schoolNotificationSchema);