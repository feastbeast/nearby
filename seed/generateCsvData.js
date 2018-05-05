const fs = require('fs');
const faker = require('faker');
// const array = require('./imageUrls.json');

(function generateCsvData() {
  const numEntries = 10000000;
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
  ].toString();

  let counter = 0;
  const stream = fs.createWriteStream('postgresData.csv', { encoding: 'utf8' });
  stream.write('place_id,name,google_rating,zagat_rating,photos,neighborhood,price_level,types,nearby\n');

  const row = function getRowOfData() {
    // 6 random restaurants for near by suggestion of each restaurant;
    const nearbyArr = [];
    for (let i = 0; i < 6; i += 1) {
      nearbyArr.push(Math.floor(Math.random() * (numEntries)) + 1);
    }
    return `"${counter.toString()}","${faker.company.companyName()}",${ratingChoices[Math.floor(Math.random() * ratingChoices.length)]},${ratingChoices[Math.floor(Math.random() * ratingChoices.length)]},"{${photoArr}}","${faker.address.city()}",${Math.floor(Math.random() * 4) + 1},"${types[Math.floor(Math.random() * types.length)]}","{${nearbyArr}}"\n`;
  };

  const addItems = function addItemToWriteStream() {
    let ok = true;
    while (counter < numEntries && ok) {
      counter += 1;
      const item = row();
      if (counter === numEntries - 1) {
        stream.write(item, () => {
          // console.log('Stream complete.');
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
}());
