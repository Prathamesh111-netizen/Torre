const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res) => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const token = req.cookies.userinfo;
    console.log(req.cookies);
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
       res.status(200).json({ isLoggedIn: false, message: err.message });
      }
      else{
        res.status(200).json({ isLoggedIn: true, message: "User is logged in" });
      }
    });
  } catch (err) {
    res.status(200).json({ isLoggedIn: false, message: err.message });
  }
};

module.exports = isLoggedIn;
