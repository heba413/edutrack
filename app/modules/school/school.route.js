const express = require("express");
const router = express.Router();
const { filterSchools } = require("./school.controller");
const { listSchools } = require("./school.controller");
const schoolController = require("./school.controller");
const { protect } = require("../../shared/middleware/schoolAuth");

//filter route
router.get("/filter", filterSchools);

//school listing route (home screen)
router.get("/", listSchools);

router.post("/s-signup", schoolController.s_signup);
router.post("/s-login", schoolController.s_login);
router.post("/s-forgot-password", schoolController.s_forgotPassword);
router.post("/s-check-code", schoolController.s_checkCode);
router.post("/s-change-password", schoolController.s_changePassword);

// profile routes
router.get("/s-getProfile", protect, schoolController.s_getProfile);
router.put("/s-updateProfile", protect, schoolController.s_updateProfile);
router.post("/s-logout", protect, schoolController.s_logout);

// search
router.get("/searchSchools", protect, schoolController.searchSchools);


module.exports = router;