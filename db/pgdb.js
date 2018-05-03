var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://postgres:postgres@database:5432/fec'; //for docker
var connectionString = 'postgres://postgres:postgres@localhost:5432/apateez_nearby'; //for local
var db = pgp(connectionString);

var findOne = function(id, callback) {
  db.any('SELECT * FROM restaurants WHERE place_id = $1', id)
  .then((data) => {
    callback(null, data)
  })
  .catch((err) => {
    callback(err);
  });
}

var findMany = function(ids, callback) {
  db.any("SELECT * FROM restaurants WHERE place_id IN ($1:list)", [ids])
  .then((data) => {
    callback(null, data)
  })
  .catch((err) => {
    callback(err);
  });
}

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
  findOne: findOne,
  findMany: findMany
}