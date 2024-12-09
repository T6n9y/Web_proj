const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  restaurant_id: String,
  name: String,
  borough: String,
  cuisine: String,
  address: {
    building: String,
    street: String,
    zipcode: String,
  },
});

module.exports = mongoose.model('Restaurant', RestaurantSchema,'restaurants');
