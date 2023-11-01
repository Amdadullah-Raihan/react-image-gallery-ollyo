// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  isFeatured: Boolean,
  createdAt: { type: Date, default: Date.now }, // Use Date.now to set the default value
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', imageSchema);
