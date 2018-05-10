const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: String,
  place_id: { type: String, unique: true },
  google_rating: Number,
  zagat_rating: Number,
  photos: [String],
  neighborhood: String,
  price_level: Number,
  types: String,
  nearby: [String],
});

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

// findOne will retrieve the restaurant associated with the given id
function findOne(id, callback) {
  RestaurantModel.find({ place_id: id }, callback);
}

// retrieve many restaurants
function findMany(ids, callback) {
  RestaurantModel.find({ place_id: { $in: ids } }, callback);
}

exports.RestaurantModel = RestaurantModel;

module.exports = {
  findOne,
  findMany,
};
