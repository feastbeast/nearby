const fs = require('fs');
const faker = require('faker');
const array = require('./imageUrls.json');


(function() {
  const numEntries = 10000000;
  const ratingChoices = [3, 3.5, 4, 4.5, 5];
  var types = [
    "Liquor store",
    "Night club",
    "Bar",
    "Store",
    "Restaurant",
    "Food",
    "Point of interest",
    "Establishment"
  ];
  var photoArr = [
    'https://loremflickr.com/320/320/food', 
    'https://loremflickr.com/320/320/restaurant', 
    'https://loremflickr.com/320/320/dining', 
    'https://loremflickr.com/320/320/dessert',
    'https://loremflickr.com/320/320/lunch',
    'https://loremflickr.com/320/320/dinner',
  ].toString();

  var counter = 0;
  var stream = fs.createWriteStream('postgresData.csv', {encoding: 'utf8'});
  stream.write('place_id,name,google_rating,zagat_rating,photos,neighborhood,price_level,types,nearby\n');

  var row = function(counter) {
    // 6 random restaurants for near by suggestion of each restaurant;
    var nearbyArr = [];
    for (var i = 0; i < 6; i ++) {
      nearbyArr.push(Math.floor(Math.random() * (numEntries)) + 1);
    }  
    return `"${counter.toString()}","${faker.company.companyName()}",${ratingChoices[Math.floor(Math.random() * ratingChoices.length)]},${ratingChoices[Math.floor(Math.random() * ratingChoices.length)]},"{${photoArr}}","${faker.address.city()}",${Math.floor(Math.random() * 4) + 1},"${types[Math.floor(Math.random() * types.length)]}","{${nearbyArr}}"\n`
  }

  var addItems = function() {
    let ok = true;
    while (counter < numEntries && ok) {
      counter++;
      const item = row(counter);
      if (counter === numEntries - 1) {
        stream.write(item, () => {
          console.log('Stream complete.');
        });
      } else {
        ok = stream.write(item);
      }
    }
    if (counter < numEntries) {
      stream.once('drain', addItems);
    }
  }

  addItems();
})();
