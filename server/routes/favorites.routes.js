const FavoriteController = require("../controllers/favourites.controller");
const checkAuth = require("../middleware/auth");
const express = require("express");

const router = express.Router();

router
  .use("/", checkAuth)
  .get(FavoriteController.getFavorites)
  .delete("/:userId", FavoriteController.removeFromFavorite)
  .post("/:userId", FavoriteController.addToFavorite);

module.exports = router;
