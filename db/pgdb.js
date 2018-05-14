const Promise = require('bluebird');

const options = {
  promiseLib: Promise,
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

module.exports = {
  findOne,
  findMany,
};
