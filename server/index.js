// const newrelic = require('newrelic');

const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');

const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../db/pgdb.js'));
const redis = require('redis');

const client = redis.createClient({ host: '13.56.210.26', port: 6379, pass: 'password' });

client.on('error', (err) => {
  console.log('Error: ', err);
});

client.on('connect', () => {
  console.log('Redis connected!');
});

app.use(cors());

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


const getRestaurantNearby = (req, res) => {
  const placeId = req.params.id;
  const results = {};
  db.findOneAsync(placeId)
    .then((data) => {
      if (!data[0]) return new Promise((resolve, reject) => reject(new Error('Data with id not found')));
      const nearbyArr = data[0].nearby;
      results[0] = data[0];
      return db.findManyAsync(nearbyArr);
    })
    .then((nearbyData) => {
      results[1] = nearbyData;
      client.setex(placeId, 3600, JSON.stringify(results));
      res.status(200).send(results);
    })
    .catch((err) => {
      console.log('POSTGRES ERROR: ', err);
      res.status(400).end();
    });
};

const getCache = (req, res) => {
  const placeId = req.params.id;
  client.get(placeId, (err, data) => {
    if (err) res.status(500).send();
    if (data) {
      res.status(200).send(data);
    } else {
      getRestaurantNearby(req, res);
    }
  });
};

app.get('/api/restaurants/:id/nearby', getCache);

app.get('/loaderio-28097ab73558e7ac2f49962ccbb60d66/', (req, res) => {
  res.send('loaderio-28097ab73558e7ac2f49962ccbb60d66');
});

app.listen(3004, () => console.log('Apateez app listening on port 3004!'));
