const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});
router.get('/me', authMiddleware, async (req,res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;
