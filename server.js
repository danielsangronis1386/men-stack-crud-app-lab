// server.js
const express = require('express');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs')

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
