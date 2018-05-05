const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/pgdb.js');
const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-nearby';
const mongoUrl = 'mongodb://localhost/apateez-nearby';

mongoose.connect(mongoUrl);
// mongoose.connect(mongoUrlDocker);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/restaurants/', express.static(path.join(__dirname, '../client/dist')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/api/restaurants/:id/nearby', (req, res) => {
  const placeId = req.params.id;

  // find recommended restaurants based on id
  const results = [];
  db.findOne(placeId, (errOne, dataOne) => {
    if (errOne) {
      res.status(500);
      console.log(errOne);
    } else {
      const nearbyArr = dataOne[0].nearby;
      results.push(dataOne[0]);

      db.findMany(nearbyArr, (errMany, dataMany) => {
        if (errMany) {
          res.status(500);
          console.log(errMany);
        } else {
          results.push(dataMany);
          res.status(200);
          res.send(results);
        }
      });
    }
  });
});

app.listen(3004, () => console.log('Apateez app listening on port 3004!'));
