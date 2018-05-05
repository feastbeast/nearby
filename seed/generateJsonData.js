const fs = require('fs');
const faker = require('faker');
// const array = require('./imageUrls.json');

(function generateJsonData() {
  const numEntries = process.argv[2] || 10000002;
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

  let counter = 0;
  const stream = fs.createWriteStream('data.json', { encoding: 'utf8' });
  stream.write('[\n');

  const item = function getItemObject() {
    // const start = Math.abs((counter % array.length) - 5);
    // var photoArr = array.slice(start, start + 5);

    // 6 random restaurants for near by suggestion of each restaurant;
    const nearbyArr = [];
    for (let i = 0; i < 6; i += 1) {
      nearbyArr.push(Math.floor(Math.random() * (numEntries)) + 1);
    }

    return {
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
  };

  const addItems = function addObjectToWriteStream() {
    let ok = true;
    while (counter < numEntries && ok) {
      counter += 1;
      const obj = item();
      if (counter === numEntries - 1) {
        stream.write(`${JSON.stringify(obj)}\n]`, () => {
          // console.log('Stream complete.');
        });
      } else {
        ok = stream.write(`${JSON.stringify(obj)}, \n`);
      }
    }
    if (counter < numEntries) {
      stream.once('drain', addItems);
    }
  };

  addItems();
}());

