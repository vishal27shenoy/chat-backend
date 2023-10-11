const express = require("express");
const router = express.Router();
const addUserController = require("../controller/addUserController");
router.post("/", addUserController.addUser);
module.exports = router;
