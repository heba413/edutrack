const mongoose = require("mongoose");

const FormSubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    studentName: String,
    age: Number,
    grade: String,
    currentSchool:String,
    message: String,
    documents: [String],
    parentName: String,
    parentEmail: String,
    ParentNumber: String,
    date: Date,
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormSubmission", FormSubmissionSchema);