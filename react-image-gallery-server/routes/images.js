// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const Image = require('../models/images');

// Get all images => /api/v1/images
router.get('/', async (req, res) => {
  const order = parseInt(req.query.sorting);
  try {
    const images = await Image.find().sort({createdAt: order});
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images' });
  }
});

// Add a new image => /api/v1/images/new
router.post('/new', async (req, res) => {
  try {
    const newImage = new Image(req.body);
    
    // Find the existing featured image and update it to not be featured
    if (newImage.isFeatured) {
      const existingFeaturedImage = await Image.findOne({ isFeatured: true });
      if (existingFeaturedImage) {
        existingFeaturedImage.isFeatured = false;
        await existingFeaturedImage.save();
      }
    }
    
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ error: 'Error adding image' });
  }
});


// Delete selected images => /api/v1/images/delete
router.post('/delete', async (req, res) => {
  try {
    const { imageIds } = req.body;
    await Image.deleteMany({ _id: { $in: imageIds } });
    res.json({
        success: true,
         message: 'Images deleted'
        });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting images' });
  }
});

// Make an image featured => /api/v1/images/:id/make-featured
router.put('/:id/make-featured', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the currently featured image and set isFeatured to false
    const currentlyFeaturedImage = await Image.findOne({ isFeatured: true });

    if (currentlyFeaturedImage) {
      currentlyFeaturedImage.isFeatured = false;
      await currentlyFeaturedImage.save();
    }

    // Update the selected image as featured
    const updatedImage = await Image.findByIdAndUpdate(id, { isFeatured: true }, { new: true });
    
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: 'Error making the image featured' });
  }
});


module.exports = router;
