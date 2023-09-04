const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/", userController.login);
router.post("/signup", userController.signup);
router.get("/:username", userController.getUserById);

module.exports = router;
