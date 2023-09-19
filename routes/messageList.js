const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");
router.get("/", messageController.handleMeaasge);
module.exports = router;
