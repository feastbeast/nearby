const promise = require('bluebird');

const options = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(options);

const connectionString = 'postgres://postgres:postgres@localhost:5432/apateez_nearby'; // for local
const db = pgp(connectionString);

const findOne = function findRestaurantWithId(id, callback) {
  db.any('SELECT * FROM restaurants WHERE place_id = $1', id)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};

const findMany = function findRestaurantsWithIds(ids, callback) {
  db.any('SELECT * FROM restaurants WHERE place_id IN ($1:list)', [ids])
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};

// var getRoomReviews = function(req, res, next) {
//   db.any('SELECT * FROM restaurants WHERE room_id = $1', req.params.id)
//   .then((data) => {
//     res.status(200)
//     .json(data);
//   })
//   .catch((err) => {
//     return next(err);
//   });
// }


module.exports = {
  findOne,
  findMany,
};
