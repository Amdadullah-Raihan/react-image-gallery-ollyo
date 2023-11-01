// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const Image = require('../models/images');

// Get all images => /api/v1/images
router.get('/', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images' });
  }
});

// Add a new image => /api/v1/images/new
router.post('/new', async (req, res) => {
  try {
    const newImage = new Image(req.body);
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ error: 'Error adding image' });
  }
});

// Delete an image => /api/v1/images/:id
router.delete('/:id', async (req, res) => {
  try {
    await Image.findByIdAndRemove(req.params.id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting image' });
  }
});

// Update the feature status of an image => /api/v1/images/:id
router.put('/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(image);
  } catch (error) {
    res.status(400).json({ error: 'Error updating image' });
  }
});

module.exports = router;
