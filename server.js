
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');


 


const path = require('path');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per window
});

// Mount routes
app.use('/api/users', userRoutes);
app.use(express.static(path.join(__dirname, 'client')));
app.use(limiter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'register.html'));
});


app.get('/test', (req, res) => {
  res.send('API is running...');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
