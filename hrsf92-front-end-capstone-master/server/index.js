const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(1234, function () { console.log('Apateez app listening on port 1234!') });