const School = require("./school.schema");

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

module.exports = { filterSchools, listSchools };