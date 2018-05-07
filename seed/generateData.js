const fs = require('fs');
const faker = require('faker');
// const array = require('./imageUrls.json');

/*
 * Constants for loading data
 */
const ratingChoices = [3, 3.5, 4, 4.5, 5];
const types = [
  'Liquor store',
  'Night club',
  'Bar',
  'Store',
  'Restaurant',
  'Food',
  'Point of interest',
  'Establishment',
];
const photoArr = [
  'https://loremflickr.com/320/320/food',
  'https://loremflickr.com/320/320/restaurant',
  'https://loremflickr.com/320/320/dining',
  'https://loremflickr.com/320/320/dessert',
  'https://loremflickr.com/320/320/lunch',
  'https://loremflickr.com/320/320/dinner',
];

const getRestaurantJson = function getJsonObject(counter, numEntries) {
  // const start = Math.abs((counter % array.length) - 5);
  // var photoArr = array.slice(start, start + 5);
  // 6 random restaurants for near by suggestion of each restaurant;
  const nearbyArr = [];
  for (let i = 0; i < 6; i += 1) {
    nearbyArr.push(Math.floor(Math.random() * (numEntries)) + 1);
  }
  const restaurant = {
    name: faker.company.companyName(),
    place_id: counter.toString(),
    google_rating: ratingChoices[Math.floor(Math.random() * ratingChoices.length)],
    zagat_rating: ratingChoices[Math.floor(Math.random() * ratingChoices.length)],
    photos: photoArr,
    neighborhood: faker.address.city(),
    price_level: Math.floor(Math.random() * 4) + 1,
    types: types[Math.floor(Math.random() * types.length)],
    nearby: nearbyArr,
  };
  if (counter === 1) {
    return JSON.stringify(restaurant);
  }
  return `,\n${JSON.stringify(restaurant)}`;
};

const getRestaurantCsv = function getRowOfData(counter, numEntries) {
  // 6 random restaurants for near by suggestion of each restaurant;
  const nearbyArr = [];
  for (let i = 0; i < 6; i += 1) {
    nearbyArr.push(Math.floor(Math.random() * (numEntries)) + 1);
  }
  let row = '';
  row += `"${counter.toString()}",`;
  row += `"${faker.company.companyName()}",`;
  row += `${ratingChoices[Math.floor(Math.random() * ratingChoices.length)]},`;
  row += `${ratingChoices[Math.floor(Math.random() * ratingChoices.length)]},`;
  row += `"{${photoArr}}","${faker.address.city()}",`;
  row += `${Math.floor(Math.random() * 4) + 1},`;
  row += `"${types[Math.floor(Math.random() * types.length)]}",`;
  row += `"{${nearbyArr}}"`;
  row += '\n';
  return row;
};

/*
 * Parses node process arguments to determines whether to
 * write a csv or json file.
 * If file type is not specified, writes json.
 * Default fileName is 'data/data.json' or 'data/data.csv'
 */
function configArgs(processArgs) {
  const params = [];
  params[1] = processArgs[1] || 10;
  if (processArgs[0] === 'csv') {
    params[0] = 'csv';
    params[2] = processArgs[2] || 'data';
    params[3] = getRestaurantCsv;
  } else {
    params[0] = 'json';
    params[2] = processArgs[2] || 'data';
    params[3] = getRestaurantJson;
  }
  return params;
}

function writeFile(fileType, numEntries, fileName, getChunk) {
  let counter = 0;
  const stream = fs.createWriteStream(`${fileName}.${fileType}`, { encoding: 'utf8' });
  if (fileType === 'json') stream.write('[\n');
  if (fileType === 'csv') stream.write('place_id,name,google_rating,zagat_rating,photos,neighborhood,price_level,types,nearby\n');

  const addItems = function addObjectToWriteStream() {
    let ok = true;
    while (counter < numEntries && ok) {
      counter += 1;
      const item = getChunk(counter, numEntries);
      if (counter === numEntries - 1) {
        stream.write(item, () => {
          // console.log('Stream complete.');
          if (fileType === 'json') {
            stream.end(']');
          } else {
            stream.end();
          }
        });
      } else {
        ok = stream.write(item);
      }
    }
    if (counter < numEntries) {
      stream.once('drain', addItems);
    }
  };

  addItems();
}

/*
 * Process arguments:
 * 2: file type of either 'csv' or 'json'. defaults to 'json'
 * 3: number of items to generate. defaults to 10
 * 4: file name. defaults to 'data/data' + filetype
 */
(function run() {
  const params = configArgs(process.argv.slice(2));
  writeFile(...params);
}());

module.exports = {
  getRestaurantJson,
  getRestaurantCsv,
  configArgs,
  writeFile,
};
