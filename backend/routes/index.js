const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SaaSRoulette API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      saas: '/api/saas',
      categories: '/api/categories'
    }
  });
});

module.exports = router;
