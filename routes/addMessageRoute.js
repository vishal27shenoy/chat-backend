const express = require("express");
const router = express.Router();
const addMessageDoc = require("../controller/addMessage");
router.post("/", addMessageDoc.addMeaasge);
module.exports = router;
