'use strict';
const faker = require('faker')
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

    const seedCompanies = Array(10).fill(0).map((_, i) => {
      return {
        name: faker.company.companyName(),
        userId: i+1,
        phoneNumber: faker.phone.phoneNumber(),
        details: faker.lorem.text(Math.ceil(Math.random * 500)),
        image: example_photos[Math.floor(Math.random() * 10)],
        website: faker.internet.url()
      }
    })
  return queryInterface.bulkInsert('Companies', seedCompanies, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Companies', null, {});
  }
};
