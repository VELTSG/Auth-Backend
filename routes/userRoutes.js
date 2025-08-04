const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});


module.exports = router;
