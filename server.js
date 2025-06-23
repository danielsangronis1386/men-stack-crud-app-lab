// server.js
const express = require('express');

const app = express();

// Home route to test that server is working
app.get('/test', (req, res) => {
  res.send('Graphic Design Server is Running');
});
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
