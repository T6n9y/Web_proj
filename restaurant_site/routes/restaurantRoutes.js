const express = require('express');
const db = require('../db/restaurants');
const { check, validationResult } = require('express-validator');
const authenticate = require('../middleware/authMiddleware'); // Import the auth middleware
const router = express.Router();

// POST /api/restaurants (Secure Route)
router.post('/api/restaurants', authenticate, async (req, res) => {
  try {
    const newRestaurant = await db.addNewRestaurant(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/restaurants (Public Route)
router.get('/api/restaurants', [
  check('page').isInt({ min: 1 }).optional(),
  check('perPage').isInt({ min: 1 }).optional(),
  check('borough').isString().optional(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { page = 1, perPage = 5, borough } = req.query;

  try {
    const restaurants = await db.getAllRestaurants(parseInt(page), parseInt(perPage), borough);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/restaurants/:id (Public Route)
router.get('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await db.getRestaurantById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/restaurants/:id (Secure Route)
router.put('/api/restaurants/:id', authenticate, async (req, res) => {
  try {
    const updatedRestaurant = await db.updateRestaurantById(req.body, req.params.id);
    if (!updatedRestaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/restaurants/:id (Secure Route)
router.delete('/api/restaurants/:id', authenticate, async (req, res) => {
  try {
    const deletedRestaurant = await db.deleteRestaurantById(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
