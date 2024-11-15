const express = require('express');
const router = express.Router();
const Saas = require('../models/saas');

// Get all SaaS tools
router.get('/', async (req, res) => {
  try {
    const saasTools = await Saas.find();
    res.json(saasTools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get random SaaS tool
router.get('/random', async (req, res) => {
  try {
    const count = await Saas.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomSaas = await Saas.findOne().skip(random);
    res.json(randomSaas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get SaaS tool by category
router.get('/category/:category', async (req, res) => {
  try {
    const saasTools = await Saas.find({ category: req.params.category });
    res.json(saasTools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new SaaS tool
router.post('/', async (req, res) => {
  const saas = new Saas({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    website: req.body.website,
    pricing: req.body.pricing,
    features: req.body.features,
    rating: req.body.rating
  });

  try {
    const newSaas = await saas.save();
    res.status(201).json(newSaas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
