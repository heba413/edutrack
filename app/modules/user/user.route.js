const express = require("express");
const router = express.Router();
const authController = require("./user.controller");
const { uploadFile } = require("../../shared/middleware/uploads");
const { protect } = require("../../shared/middleware/auth");

router.post("/signup",authController.signUp);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);

router.post("/check-code", authController.checkCode);

router.post("/change-password", authController.changePassword);

//profile route
router.get("/getProfile", protect, authController.getProfile);

router.put("/updateProfile", protect, authController.updateProfile);

router.post("/logout", protect, authController.logout);

module.exports = router; 
