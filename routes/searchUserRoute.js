const express = require("express");
const router = express.Router();
const searchUserController = require("../controller/searchUserController");
router.post("/", searchUserController.searchUser);
module.exports = router;
