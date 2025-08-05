const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  // console.log('Token:', token);

  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded user:', decoded);
    req.user = decoded; // You can access req.user in your protected routes
    next();
  } catch (err) {
    console.error('jwt Error:', err)
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
