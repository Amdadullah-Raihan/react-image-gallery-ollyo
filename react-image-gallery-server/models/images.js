// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  isFeatured: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now }, // Use Date.now to set the default value
  updatedAt: { type: Date, default: Date.now },
});

const Image =  mongoose.model('Image', imageSchema);

module.exports = Image;
