const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
require('dotenv').config();

const authRouter = require('./routes/auth.routes');
const businessRouter = require('./routes/business.routes');
const reviewRouter = require('./routes/review.routes');

const app = express();

connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1); 
  });

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/businesses', businessRouter);
app.use('/api/reviews', reviewRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});



module.exports = app;
