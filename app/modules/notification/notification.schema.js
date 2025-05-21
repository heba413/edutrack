const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  // userId: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: "User", 
  //   required: true 
  // },

  recipient: {
    kind: { type: String, enum: ['User', 'School'], required: true },
    item: { type: mongoose.Schema.Types.ObjectId, refPath: 'recipient.kind', required: true }
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  type: { 
    type: String, 
    enum: ["announcement", "alert", "reminder"], 
    default: "alert" 
  },
  link: { type: String } // Optional deep link (e.g., "/schools/123")
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);