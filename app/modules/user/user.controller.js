const authService = require("./user.service");
const User = require("./user.schema");
const School = require("../school/school.schema");

const signUp = async (req, res) => {
  try {
    const result = await authService.signUp(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkCode = async (req, res) => {
  try {
    const result = await authService.checkCode(req.body.email, req.body.code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await authService.changePassword(req.body.email, req.body.newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await authService.updateProfile(req.user._id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const result = await authService.logout(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ ADD: Favorite a school
const favoriteSchool = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const schoolId = req.params.schoolId;

    if (!user.favorites.includes(schoolId)) {
      user.favorites.push(schoolId);
      await user.save();
    }

    res.status(200).json({ msg: "School added to favorites." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ ADD: Get all favorite schools
const getFavoriteSchools = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  login,
  forgotPassword,
  checkCode,
  changePassword,
  getProfile,
  updateProfile,
  logout,
  favoriteSchool,       
  getFavoriteSchools    
};