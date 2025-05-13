const School = require("./school.schema");
const schoolService = require("./school.service");

const filterSchools = async (req, res) => {
  try {
    const { location, educationLevels, curriculum, languages ,minFee, maxFee } = req.query;

    // Build filter 
    const filters = {};
    if (location) filters.location = location;
    if (educationLevels) filters.educationLevels = { $in: educationLevels.split(",") };
    if (curriculum) filters.curriculum = curriculum;
    if (languages) filters.languages = languages;
    if (minFee || maxFee) {
      filters["feesRange.min"] = { $gte: Number(minFee) || 0 };
      filters["feesRange.max"] = { $lte: Number(maxFee) || Infinity };
    }
    console.log(filters);

    const schools = await School.find(filters);
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schools (for home screen)
const listSchools = async (req, res) => {
    try {
      const schools = await School.find().select("name"); // Optimize payload
      res.status(200).json(schools);
    } catch (error) {
      res.status(500).json({ message: "Failed to load schools" });
    }
  };

  const s_signup = async (req, res) => {
    console.log("🔍 Incoming data:", req.body); // ✅ Move here
  
    try {
      const result = await schoolService.s_signup(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const result = await schoolService.s_login(email, password);
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_forgotPassword = async (req, res) => {
    try {
      const result = await schoolService.s_forgotPassword(req.body.email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_checkCode = async (req, res) => {
    try {
      const result = await schoolService.s_checkCode(req.body.email, req.body.code);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_changePassword = async (req, res) => {
    try {
      const result = await schoolService.s_changePassword(req.body.email, req.body.newPassword);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_getProfile = async (req, res) => {
    try {
      const school = await schoolService.s_getProfile(req.user._id);
      res.status(200).json(school);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_updateProfile = async (req, res) => {
    try {
      const updatedSchool = await schoolService.s_updateProfile(req.user._id, req.body);
      res.status(200).json(updatedSchool);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const s_logout = async (req, res) => {
    try {
      const result = await schoolService.s_logout(req.user._id); // or req.user._id
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const searchSchools = async (req, res) => {
    try {
      const result = await schoolService.searchSchools(req.query.q); // ?q=keyword
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = { 
  filterSchools, 
  listSchools,
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