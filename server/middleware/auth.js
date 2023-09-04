const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const token = req.cookies.userinfo;
    console.log(req.cookies);
    const decoded = jwt.verify(token, privateKey);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = checkAuth;
