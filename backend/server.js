const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const connectDB = require("./config/db")
const cors = require('cors');

const app = express();
// ✅ Enable CORS before routes
app.use(cors({
  origin: 'http://localhost:5173',  // or '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json()); 


// Import routes -> All Router Whatever we Have
const authRoutes = require('./routes/authRoutes'); 

// Attach routes to a base path
app.use('/api/auth', authRoutes);


// Test route
app.get('/', (req, res) => res.send('Server is running!'));

// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
