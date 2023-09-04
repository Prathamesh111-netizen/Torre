// signup and login user
// search user
// get user profile
// update user profile
// add to favorite
// remove from favorite
// get favorites
// save 10 recent searches
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/favorites", require("./routes/favorites.routes"));
app.use("/api/search", require("./routes/query.routes"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  connectDB();
  console.log("http://localhost:3000");
});
