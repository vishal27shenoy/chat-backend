const express = require("express");
const router = express.Router();
const getAllUser = require("../controller/getAllUser");
router.get("/", getAllUser.getAllUser);
module.exports = router;
