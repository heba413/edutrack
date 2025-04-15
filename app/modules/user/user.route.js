const express = require("express");
const router = express.Router();
const authController = require("./user.controller");
const { uploadFile } = require("../../shared/middleware/uploads");

router.post("/signup",authController.signUp);

router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);

router.post("/check-code", authController.checkCode);

router.post("/change-password", authController.changePassword);

module.exports = router; 
