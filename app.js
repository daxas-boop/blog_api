require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

// Connect to DB
const mongoDB = process.env.MONGO_DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://yourapp.com',
  })
);

app.use('/comments', routes.commentRoutes);
app.use('/posts', routes.postRoutes);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

app.listen(3000);
