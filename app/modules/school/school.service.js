const School = require("./school.schema");
const sendMail = require("../../shared/utils/sendEmail");
const { generateToken } = require("../../shared/utils/token");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const s_signup = async (schoolData) => {
  const {
    name,
    email,
    password,
    phone,
    location,
    educationLevels,
    curriculum,
    languages,
    feesRange,
  } = schoolData;

  const existingSchool = await School.findOne({ email });
  if (existingSchool) {
    throw new Error("School already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newSchool = new School({
    name,
    email,
    password: hashedPassword,
    phone,
    location,
    educationLevels,
    curriculum,
    languages,
    feesRange,
  });

  await newSchool.save();
  const token = await generateToken(newSchool._id);
  newSchool.token = token;
  await newSchool.save();

  return {
    token,
    email: newSchool.email,
    name: newSchool.name,
    phone: newSchool.phone,
  };
};

const s_login = async (email, password) => {
  console.log("from service", email, password);
  const school = await School.findOne({ email });
  console.log(school);
  if (!school) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, school.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  //console.log("from service",school._id)
  const token = generateToken(school._id);
  school.token = token;
  //console.log(school.token);
  //await school.save();
  return {
    token,
    phone: school.phone,
    email: school.email,
    name: school.name,
  };
};

const s_forgotPassword = async (email) => {
  const school = await School.findOne({ email });
  if (!school) {
    throw new Error("School not found");
  }

  const verificationCode = crypto.randomInt(1000, 9999).toString();
  school.verificationCode = verificationCode;
  await school.save({ validateBeforeSave: false });

  await sendMail(school.email, `Your verification code is: ${verificationCode}`);
  return { message: "Verification code sent to email" };
};

const s_checkCode = async (email, code) => {
  const school = await School.findOne({ email });

  if (!school || school.verificationCode !== code) {
    throw new Error("Invalid verification code");
  }

  school.isVerified = true;
  await school.save({ validateBeforeSave: false });

  return { message: "Code verified successfully", email: school.email };
};

const s_changePassword = async (email, newPassword) => {
  const school = await School.findOne({ email });

  if (!school || !school.isVerified) {
    throw new Error("School not found or not verified");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  school.password = hashedPassword;
  school.verificationCode = null;
  school.isVerified = false;
  await school.save({ validateBeforeSave: false });

  return { message: "Password updated successfully" };
};

const s_getProfile = async (schoolId) => {
  const school = await School.findById(schoolId).select("-password");
  if (!school) {
    throw new Error("School not found");
  }
  return school;
};

const s_updateProfile = async (schoolId, schoolData) => {
  const school = await School.findByIdAndUpdate(schoolId, schoolData, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!school) {
    throw new Error("School not found or update failed");
  }
  return school;
};

const s_logout = async (schoolId) => {
  const school = await School.findById(schoolId);
  if (!school) {
    throw new Error("School not found");
  }

  school.token = null;
  await school.save({ validateBeforeSave: false });

  return { message: `${school.name} logged out successfully` };
};

const searchSchools = async (query) => {
  const regex = new RegExp(query, "i");
  const schools = await School.find({ name: regex }).select("-password -token");
  return schools;
};

module.exports = {
  s_signup,
  s_login,
  s_forgotPassword,
  s_checkCode,
  s_changePassword,
  s_getProfile,
  s_updateProfile,
  s_logout,
  searchSchools,
};