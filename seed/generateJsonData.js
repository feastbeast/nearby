const fs = require('fs');
const faker = require('faker');
const array = require('./imageUrls.json');


(function() {
  const numEntries = 10000002;
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
  const photoArr = [
    'https://loremflickr.com/320/320/food', 
    'https://loremflickr.com/320/320/restaurant', 
    'https://loremflickr.com/320/320/dining', 
    'https://loremflickr.com/320/320/dessert',
    'https://loremflickr.com/320/320/lunch',
    'https://loremflickr.com/320/320/dinner',
  ];

  var counter = 0;
  var stream = fs.createWriteStream('data.json', {encoding: 'utf8'});
  stream.write('[\n');

  var item = function(counter) {
    var start = Math.abs((counter % array.length) - 5);
    // var photoArr = array.slice(start, start + 5);
  
    // 6 random restaurants for near by suggestion of each restaurant;
    var nearbyArr = [];
    for (var i = 0; i < 6; i ++) {
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
      nearby: nearbyArr
    };
  }

  var addItems = function() {
    let ok = true;
    while (counter < numEntries && ok) {
      counter++;
      const obj = item(counter);
      if (counter === numEntries - 1) {
        stream.write(JSON.stringify(obj) + '\n]', () => {
          console.log('Stream complete.');
        });
      } else {
        ok = stream.write(JSON.stringify(obj) + ', \n');
      }
    }
    if (counter < numEntries) {
      stream.once('drain', addItems);
    }
  }

  addItems();
})();

  //   if (!stream.write('[')) {
  //     // Wait for it to drain then start writing data from where we left off
  //     stream.once('drain', function() {
  //       counter++;
  //       if (counter + 1 === numEntries) {
  //         addItem();
  //       } else {
  //         stream.end(() => {
  //           console.log('ending');
  //         });
  //       }
  //       // 
  //     });
  //   }
  // };


  //////

//   for (let counter = 0; counter < numEntries; counter++) {
//     var start = Math.abs((counter % array.length) - 5);
//     var photoArr = array.slice(start, start + 5);
  
//     // 6 random restaurants for near by suggestion of each restaurant;
//     var nearbyArr = [];
//     for (var i = 0; i < 6; i ++) {
//       nearbyArr.push(Math.floor(Math.random() * (numEntries)) + 1);
//     }
  
//     var obj = {
//       name: faker.company.companyName,
//       place_id: counter,
//       google_rating: ratingChoices[Math.floor(Math.random() * ratingChoices.length)],
//       zagat_rating: ratingChoices[Math.floor(Math.random() * ratingChoices.length)],
//       photos: photoArr,
//       neighborhood: faker.address.city(),
//       price_level: Math.floor(Math.random() * 4) + 1,
//       types: types[Math.floor(Math.random() * types.length)],
//       nearby: nearbyArr
//     };

//     if (counter === numEntries - 1) {
//       stream.end(JSON.stringify(obj) + '\n]', () => {
//         console.log('Stream complete.');
//       });
//     } else {
//       stream.write(JSON.stringify(obj) + ', \n');
//     }
//   }
// })();
// createData();


  // if (!stream.write('[')) {
  //   // Wait for it to drain then start writing data from where we left off
  //   stream.once('drain', function() {
  //     console.log('draining');
  //     stream.end(() => {
  //       console.log('ending');
  //       
  //     });
  //     // 
  //   });
  // }

  //   // fs.appendFile('data.tsv', JSON.stringify(obj) + ',', (err) => {if (err) throw err});
  //   // console.log('The "data to append" was appended to file!');
  //   if (counter === 0) {
  //     fs.write('test');
  //     // fs.write(JSON.stringify(obj) + ']');
  //   } else {
  //     // fs.write(JSON.stringify(obj) + ',');
  //   }

  // }
  // stream.on('finish', () => {
  //   console.log('done');
  //   
  // });

/*
getting all image urls
  var stream = fs.createWriteStream('data.json', {encoding: 'utf8'});
  stream.write('[\n');
  // for (let i = 0; i < array.length; i++) {
  //   for (let j = 0; j < array[i].result.photos.length; j++) {
  //     var photo = array[i].result.photos[j];
  //     if (i === array.length - 1 && j === array[i].result.photos.length - 1) {
  //       stream.end(`"${photo.photo_reference}" \n]`);
  //     } else {
  //       stream.write(`"${photo.photo_reference}",\n`);
  //     }
  //   }
    
  // }

  */