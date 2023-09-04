const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const isLoggedIn = require("../middleware/isLoggedIn");
const checkAuth = require("../middleware/auth");

router.post("/", userController.login);
router.get("/", checkAuth, userController.getUser);
router.post("/signup", userController.signup);
router.get("/isLoggedIn", isLoggedIn);
router.get("/:username", userController.getUserById);

module.exports = router;
