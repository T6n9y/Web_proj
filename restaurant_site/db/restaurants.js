const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

const db = {
  initialize: async (connectionString) => {
    try {
      await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connection established.');
    } catch (error) {
      console.error('Failed to connect to database:', error.message);
      throw error;
    }
  },

  addNewRestaurant: (data) => Restaurant.create(data),

  getAllRestaurants: async (page, perPage, borough) => {
    const filter = borough ? { borough } : {};
    const skip = (page - 1) * perPage;
    return Restaurant.find(filter).sort({ restaurant_id: 1 }).skip(skip).limit(perPage);
  },

  getRestaurantById: (id) => Restaurant.findById(id),

  updateRestaurantById: (data, id) => Restaurant.findByIdAndUpdate(id, data, { new: true }),

  deleteRestaurantById: (id) => Restaurant.findByIdAndDelete(id),
};

module.exports = db;
