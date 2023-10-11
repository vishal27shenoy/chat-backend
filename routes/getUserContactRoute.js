const express = require("express");
const router = express.Router();
const getuserContactController = require("../controller/getUserContactController");
router.get("/", getuserContactController.getContact);
module.exports = router;
