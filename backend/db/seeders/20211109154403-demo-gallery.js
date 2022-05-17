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
    const gallerySeeds = Array(41).fill(0).map((_, i) => {
      if (i === 0) return 0;
      return {
        userId: Math.ceil(i / 4),
        title: "I'm amazing",
        photoUrl: example_photos[Math.floor(Math.random() * 10)],
        order: i % 4,
      }
    })
    gallerySeeds.shift()
     return queryInterface.bulkInsert('PortfolioGalleries', gallerySeeds, {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('PortfolioGalleries', null, {});
  }
};
