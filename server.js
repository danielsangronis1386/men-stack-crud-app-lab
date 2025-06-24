// server.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();


//  MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

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
//  Index Route (GET /designs) 
app.get('/designs', async (req, res) => {
  try {
    const allDesigns = await Design.find();
    res.render('designs/index.ejs', { designs: allDesigns });
  } catch (err) {
    console.error('Error fetching designs:', err);
    res.send('Problem loading designs');
  }
});
// Show Route (GET /designs/:id) 
app.get('/designs/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    res.render('designs/show.ejs', { design });
  } catch (err) {
    console.error('Error fetching single design:', err);
    res.send('Design not found');
  }
});

//  Edit Route (GET /designs/:designId/edit) 
app.get('/designs/:designId/edit', async (req, res) => {
  try {
    const foundDesign = await Design.findById(req.params.designId);
    res.render('designs/edit.ejs', { design: foundDesign });
  } catch (err) {
    console.error('Error loading edit form:', err);
    res.send('Could not load the edit page');
  }
});

// ----- Update Route (PUT /designs/:designId) -----
app.put('/designs/:designId', async (req, res) => {
  // Handle checkbox value
  if (req.body.isPublished === 'on') {
    req.body.isPublished = true;
  } else {
    req.body.isPublished = false;
  }

  try {
    // Update the design by ID
    await Design.findByIdAndUpdate(req.params.designId, req.body);
    res.redirect(`/designs/${req.params.designId}`);
  } catch (err) {
    console.error('Error updating design:', err);
    res.send('Update failed');
  }
});





app.listen(3000, () => {
  console.log('Listening on port 3000');
});
