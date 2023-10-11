const express = require("express");
const router = express.Router();
const getuserContactController = require("../controller/getUserContactController");
router.post("/", getuserContactController.getContact);
module.exports = router;
