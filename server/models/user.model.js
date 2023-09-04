const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the RecentQuery schema
const recentQuerySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
  favoriteUsers: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      // You can add more information about the favorite user here if needed
      // username: String,
      // otherInfo: String,
    },
  ],
  recentQueries: [recentQuerySchema], // Array to store recent queries
});

// Define the toJSON method to exclude the passwordHash field when sending user objects
if (!userSchema.options.toJSON) userSchema.options.toJSON = {};
userSchema.options.toJSON.transform = (doc, ret) => {
    // delete the passwordHash property before returning the user object
    delete ret.passwordHash;
    return ret;
}

// Define the comparePassword method on the userSchema
userSchema.methods.comparePassword = function comparePassword(password) {
    // compare the hashed password of the user with the password supplied by the user
    return password === this.passwordHash;
};


// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
