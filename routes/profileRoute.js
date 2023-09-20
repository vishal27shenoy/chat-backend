const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
router.put("/", profileController.handleProfile);
module.exports = router;
