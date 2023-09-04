const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/", userController.login);
router.post("/signup", userController.signup);
router.get("/:id", userController.getUserById);
// router.post("/login", userController.login);
// router.get("/:username", userController.getUserProfile);

// router.put("/profile", userController.updateProfile);
// router.get("/search", userController.search);
// router.post("/favorite", userController.addToFavorite);
// router.delete("/favorite", userController.removeFromFavorite);
// router.get("/favorite", userController.getFavorites);
// router.get("/recent", userController.getRecentSearches);

module.exports = router;
