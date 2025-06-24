// server.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();


//  MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Connection event listener
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});

//  MODELS
const Design = require('./models/Design');


//  ROUTES

// Home route to test that server is working
app.get('/test', (req, res) => {
  res.send('Graphic Design Server is Running');
});

// GET / - landing page
app.get('/', async (req, res) => {
  res.render('index.ejs');
});
// GET /designs/new - form to create a new design
app.get('/designs/new', (req, res) => {
  res.render('designs/new.ejs');
});

// POST /designs
app.post('/designs', async (req, res) => {
  if (req.body.isPublished === 'on') {
    req.body.isPublished = true;
  } else {
    req.body.isPublished = false;
  }

  try {
    await Design.create(req.body);
    res.redirect('/designs/new');
  } catch (err) {
    console.error('Error creating design:', err);
    res.send('Something went wrong!');
  }
});
// ----- Index Route (GET /designs) -----
app.get('/designs', async (req, res) => {
  try {
    const allDesigns = await Design.find();
    res.render('designs/index.ejs', { designs: allDesigns });
  } catch (err) {
    console.error('Error fetching designs:', err);
    res.send('Problem loading designs');
  }
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
