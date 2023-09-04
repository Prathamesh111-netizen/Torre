const User = require("../models/user.model");

const getQuery = async (req, res) => {
  // store the query in the database

  // get the query from the database

  // return the query

  try {
    const q = req.query.q;

    const userId = req.userId;

    // Find the user by their ID
    const user = await User.findById(userId);

    // check if the user has already searched for this query
    // if so, remove it from the list of recent queries
    const recentQuery = user.recentQueries.find((query) => query.query === q);
    if (recentQuery) {
      user.recentQueries.pull(recentQuery._id);
    }

    // Add the recent query to the user's list of recent queries
    user.recentQueries.unshift({ query: q });

    // Ensure that only the 10 most recent queries are kept
    if (user.recentQueries.length > 10) {
      user.recentQueries.pop(); // Remove the oldest query
    }

    user.save();

    // find the user with q in the username
    const users = await User.find({ username: { $regex: q, $options: "i" } });
    return res.status(200).json({ users: users, message: "Query successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuery };
