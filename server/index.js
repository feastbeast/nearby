const newrelic = require('newrelic');

const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');

const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../db/pgdb.js'));
// const redis = Promise.promisifyAll(require('redis'));
const redis = require('redis');

const client = redis.createClient({"host": '52.53.190.7', "port": 6379, "pass": "password"});

client.on('error', (err) => {
  console.log('Error: ', err);
});

client.on('connect', () => {
  console.log('Redis connected!');
});

// client.setAsync('1', JSON.stringify(x)).then(() => redis.print);
// client.getAsync('1').then(function(result) {
//   console.log('GET result ->', result)
// });

app.use(cors());

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


const getRestaurantNearby = (req, res) => {
  // console.log('DB 0');
  const placeId = req.params.id;
  const results = {};
  db.findOneAsync(placeId)
    .then((data) => {
      // console.log('DB 1');
      if (!data[0]) return new Promise((resolve, reject) => reject(new Error('Data with id not found')));
      const nearbyArr = data[0].nearby;
      results[0] = data[0];
      return db.findManyAsync(nearbyArr);
    })
    .then((nearbyData) => {
      // console.log('DB 2');
      results[1] = nearbyData;
      client.set(placeId, JSON.stringify(results), 'EX', 6000);
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log('POSTGRES ERROR: ', err);
      res.status(400).end();
    });
};

const getCache = (req, res) => {
  // console.log('HELLO 1');
  const placeId = req.params.id;
  client.get(placeId, (err, data) => {
    if (err) res.status(500).send();
    // console.log('HELLO 2');
    if (data) {
      // console.log('HELLO 4');
      res.status(200).send(data);
    } else {
      // console.log('HELLO 3');
      getRestaurantNearby(req, res);
    }
  });
};

app.get('/api/restaurants/:id/nearby', getCache);

app.listen(3004, () => console.log('Apateez app listening on port 3004!'));
