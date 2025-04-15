const User = require("../../modules/user/user.schema");

const sendMail = require("../../shared/utils/sendEmail");
const { generateToken } = require("../../shared/utils/token");
const bcrypt = require("bcrypt");
const crypto = require("crypto");



const signUp = async (userData) => {
  const { name, phone, email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = new User({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  await newUser.save();
  const token = await generateToken(newUser._id)
  return { token, email: newUser.email, name: newUser.name,phone:newUser.phone }; 
};

/**
 * Login user
 */
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return { token,phone:user.phone,email: user.email, name: user.name  };
};

/**
 * Forgot Password - Send verification code
 */
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate a random verification code
  const verificationCode = crypto.randomInt(1000, 9999).toString();

  // Save the code in the user document
  user.verificationCode = verificationCode;
  await user.save();

  // Send email with the code
  await sendMail(user.email, `Your verification code is: ${verificationCode}`);

  return { message: "Verification code sent to email" };
};

/**
 * Check Verification Code
 */
const checkCode = async (email, code) => {
  const user = await User.findOne({ email });

  if (!user || user.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  user.isVerified = true ;
  await user.save() ;

  return { message: "Code verified successfully", email: user.email };
};

/**
 * Change Password using verification code
 */
const changePassword = async (email, newPassword) => {
  const user = await User.findOne({ email });

  if (!user || !user.isVerified ) {
    throw new Error("User not found");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.verificationCode = null; // Clear verification code after successful change
  user.isVerified=false;
  await user.save();

  return { message: "Password updated successfully" };
};

module.exports = {
  signUp,
  login,
  forgotPassword,
  checkCode,
  changePassword,
};
