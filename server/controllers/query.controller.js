const User = require("../models/user.model");

const getQuery = async (req, res) => {
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

    // find the user with q in the username, return 10 results
    const users = await User.find({ username: { $regex: q, $options: "i" } });
    const responseusers = users.slice(0, Math.min(users.length, 10));
    // remove recent queries from the response
    let r=[];
    responseusers.forEach((user) => {
      r.push({ username: user.username, _id: user._id });
    });
    console.log(responseusers);
    
    return res.status(200).json({ users: r, message: "Query successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const recentQueries = (req, res) => {
  try{
    const userId = req.userId;
    User.findById(userId)
    .then((user) => {
      return res.status(200).json({ recentQueries: user.recentQueries });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getQuery , recentQueries};
