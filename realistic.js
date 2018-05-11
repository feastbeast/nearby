// For normal distribution.
// function gaussianRand() {
//   var rand = 0;
//   for (var i = 0; i < 6; i += 1) {
//     rand += Math.random();
//   }
//   return rand / 6;
// }

function generateRandomId(userContext, events, done) {
  const randomNum = Math.random();
  if (randomNum < 0.68) {
    userContext.vars.randomId = Math.floor(randomNum * 10);
  } else {
    userContext.vars.randomId = Math.floor(randomNum * 10000000);
  }
  return done();
}

module.exports = {
  generateRandomId,
};
