const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: 'Too many login attempts. Try again later.' },
  handler: (req, res, next, options) => {
    // console.log(`⚠️ Rate limit hit from IP: ${req.ip}`);
    res.status(429).json(options.message);
  }
});

module.exports = rateLimiter;
