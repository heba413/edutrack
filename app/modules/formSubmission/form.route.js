const express = require("express");
const router = express.Router();
const { submitForm, getFormsBySchool } = require("./form.controller");
const { protect } = require("../../shared/middleware/auth");
const { protect: schoolProtect } = require("../../shared/middleware/schoolAuth");
const { uploadpdf } = require("../../shared/middleware/uploads");

// Route to submit a form (authenticated user)
router.post("/submit", protect, uploadpdf().array('pdfs'), submitForm);

// Route to get all forms by school (authenticated school)
router.get("/mydata", schoolProtect, getFormsBySchool);

module.exports = router;