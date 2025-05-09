const jwt = require("jsonwebtoken");
const User = require("../../modules/user/user.schema");
const { verifyToken } = require("../utils/token");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "No token provided, authorization denied." });
    }

    const decoded = verifyToken(token);
    console.log(decoded," bhej");
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ msg: "User not found." });
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token." });
  }
};

module.exports = { protect };