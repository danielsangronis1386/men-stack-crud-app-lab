// models/Design.js

const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: String,
  isPublished: Boolean
});

const Design = mongoose.model("Design", designSchema);

module.exports = Design;
