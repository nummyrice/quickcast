'use strict';
const { faker } = require('@faker-js/faker');
const example_photos = [
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.42.17+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.40.43+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.41.00+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.41.10+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.41.29+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.41.38+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.41.52+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.42.02+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.42.10+PM.png',
  'https://quickcast-app.s3.us-west-1.amazonaws.com/Screen+Shot+2022-05-10+at+1.42.17+PM.png'
]
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

      const userSeeds = Array(10).fill(0).map((_, i) => {
        return {
          userId: i+1,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phoneNumber: faker.phone.phoneNumber('###-###-###'),
          dateOfBirth: faker.date.between('1960-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),
          biography: faker.lorem.text(Math.ceil(Math.random(500))),
          profilePhoto: example_photos(Math.ceil(Math.random() * 9)),
          website: faker.internet.url(),
          location: faker.address.zipCode(),
        }
      })
   return queryInterface.bulkInsert('ActorPortfolios', userSeeds, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('ActorPortfolios', null, {});
  }
};
