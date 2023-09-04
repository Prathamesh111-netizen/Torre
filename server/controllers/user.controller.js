const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      username: req.body.username,
      passwordHash: passwordHash,
    });

    // save the user
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user by id
exports.getUserById = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // take username and password from req.body
    const { username, password } = req.body;
    // find user with username
    const user = await User.findOne({ username: username });
    // if user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    // if user found, compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    // if password does not match, return error
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // if password matches, return success message
    // set cookie
    const privateKey = process.env.PRIVATE_KEY;
    const userinfo = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      privateKey
    );

    res.cookie("userinfo", userinfo, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30 * 1000,
      sameSite: "none",
    });
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.userId;
    let user = await User.findById(userId);

    // find usernames of favorited users
    const favoriteUserIds = user.favoriteUsers.map((favoriteUser) => {
      return favoriteUser.userId;
    });
    const favoriteUsers = await User.find({ _id: { $in: favoriteUserIds } });
    const favoriteUsernames = favoriteUsers.map((favoriteUser) => {
      return favoriteUser.username;
    });

    user = user.toObject();
    user.favoriteUsers = favoriteUsernames;

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
