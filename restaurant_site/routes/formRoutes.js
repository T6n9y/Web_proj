const express = require('express');
const db = require('../db/restaurants');
const router = express.Router();

router.get('/restaurants/form', (req, res) => {
  res.render('form', { results: null, error: null });
});

router.post('/restaurants/form', async (req, res) => {
  const { page, perPage, borough } = req.body;

  if (!page || !perPage || isNaN(page) || isNaN(perPage)) {
    return res.render('form', { results: null, error: 'Invalid input. Please enter valid numbers for page and perPage.' });
  }

  try {
    const restaurants = await db.getAllRestaurants(parseInt(page), parseInt(perPage), borough);
    res.render('form', { results: restaurants, error: null });
  } catch (error) {
    res.render('form', { results: null, error: 'Error fetching restaurants: ' + error.message });
  }
});

module.exports = router;
