const express = require("express");
const router = express.Router();
const { filterSchools } = require("./school.controller");
const { listSchools } = require("./school.controller");

router.get("/filter", filterSchools);
router.get("/", listSchools);

module.exports = router;