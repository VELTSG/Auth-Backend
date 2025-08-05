const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const rateLimiter = require('../utils/rateLimiter');

router.post('/register', registerUser);
router.post('/login', rateLimiter, loginUser);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out bro no worries' });
});

module.exports = router;
