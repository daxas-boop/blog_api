require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routes = require('./routes');

const app = express();

// Connect to database
require('./config/database');

// Passport auth
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/comments', routes.commentRoutes);
app.use('/posts', routes.postRoutes);

app.use((err, req, res) => {
  if (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

app.listen(3000);
