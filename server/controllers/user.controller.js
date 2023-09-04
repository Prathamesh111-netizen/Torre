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
    const id = req.params.id;
    const user = await User.findById(id);
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
    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, privateKey);
    console.log(token);
    res.cookie("userinfo", token, { maxAge: 3600000, httpOnly: true });
    res.status(200).json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};