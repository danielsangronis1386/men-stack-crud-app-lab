// server.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Connection event listener
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});


// Home route to test that server is working
app.get('/test', (req, res) => {
  res.send('Graphic Design Server is Running');
});

// GET / - landing page
app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
