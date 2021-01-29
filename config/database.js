const mongoose = require('mongoose');

require('dotenv').config();

const mongoDB = process.env.MONGO_DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Database connected');
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
