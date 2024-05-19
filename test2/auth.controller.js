// controllers/auth.controller.js
const User = require('../models/user.model');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: 'Unable to login' });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error: 'Unable to logout' });
  }
};

// Logout user from all sessions
exports.logoutUserFromAllSessions = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error: 'Unable to logout' });
  }
};