const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    location: { 
      type: String, 
      required: true 
    },
    educationLevels: { 
      type: [String], 
      enum: ["Pre-School", "Primary School", "Middle School", "High School"],
      required: true 
    },
    curriculum: { 
      type: String, 
      enum: ["American", "National", "British"],
      required: true 
    },
    languages: {
      type: String,
      enum: ["English", "German", "French"],
      required: true
    },
    feesRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },  
   

},
{ timestamps: true }
)



const School = mongoose.model("School", SchoolSchema);

module.exports = School;