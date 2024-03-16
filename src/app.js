const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
require('dotenv').config();

// Import routes with descriptive names
const authRouter = require('./routes/auth.routes'); // Use Router for consistency
const businessRouter = require('./routes/business.routes');
const reviewRouter = require('./routes/review.routes');

const app = express();

// Connect to database (assuming asynchronous connection)
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1); // Exit process on connection failure
  });

app.use(express.json());
app.use(cors());

// Mount routes with clear prefixes
app.use('/api/auth', authRouter);
app.use('/api/businesses', businessRouter);
app.use('/api/reviews', reviewRouter);

// Error handling middleware (improved message)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' }); // More specific message
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});



module.exports = app;
