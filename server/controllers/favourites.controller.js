const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addToFavorite = async (req, res) => {
  try {
    // const userId = "user_id"; // Replace with the user's ObjectId
    // read from cookie userinfo
    const userId = req.userId;

    const favoriteUser = {
      userId: req.params.userId, // Replace with the favorite user's ObjectId
    };

    // Find the user by their ID
    const user = await User.findById(userId);

    // Add the favorite user to the user's list of favorites
    const isFavoriteUserAlreadyAdded = user.favoriteUsers.some(
      (favUser) => favUser.userId.toString === favoriteUser
    );

    if (!isFavoriteUserAlreadyAdded)
      user.favoriteUsers.push(favoriteUser);
    else
      return res
        .status(400)
        .json({ message: "User already added to favorites" });
    user.save();
    res.status(200).json({ message: "User added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    // find all the users in the user's favoriteUsers array
    // and return them
    const favoriteUsers = await User.find({
      _id: { $in: user.favoriteUsers.map((favUser) => favUser.userId) },
    });

    res.status(200).json(favoriteUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFromFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const favoriteUserId = req.params.userId;
    const user = await User.findById(userId);
    const favoriteUser = user.favoriteUsers.find(
      (favUser) => favUser.userId.toString() === favoriteUserId
    );
    if (!favoriteUser)
      return res.status(400).json({ message: "User not found in favorites" });
    user.favoriteUsers.pull(favoriteUser);
    await user.save();
    res.status(200).json({ message: "User removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToFavorite,
  getFavorites,
  removeFromFavorite,
};
