const FavoriteController = require("../controllers/favourites.controller");
const checkAuth = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router.delete("/:userId",checkAuth,  FavoriteController.removeFromFavorite)

router.post("/:userId", checkAuth, FavoriteController.addToFavorite)

router.get("/", checkAuth, FavoriteController.getFavorites)

module.exports = router;
