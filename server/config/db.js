const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((res) => console.log(`MongoDB Connected: ${res.connection.host}`))
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDB;
