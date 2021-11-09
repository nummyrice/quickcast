'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
  return queryInterface.bulkInsert('Companies', [{
     name: faker.company.companyName(),
     userId: Math.ceil(Math.random() * 4),
     phoneNumber: faker.phone.phoneNumber(),
     details: faker.lorem.text(Math.ceil(Math.random * 500)),
     image: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
     website: faker.internet.url(),
  },{
    name: faker.company.companyName(),
    userId: Math.ceil(Math.random() * 4),
    phoneNumber: faker.phone.phoneNumber(),
    details: faker.lorem.text(Math.ceil(Math.random * 500)),
    image: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: faker.internet.url(),
  },{
    name: faker.company.companyName(),
    userId: Math.ceil(Math.random() * 4),
    phoneNumber: faker.phone.phoneNumber(),
    details: faker.lorem.text(Math.ceil(Math.random * 500)),
    image: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: faker.internet.url(),
  },{
    name: faker.company.companyName(),
    userId: Math.ceil(Math.random() * 4),
    phoneNumber: faker.phone.phoneNumber(),
    details: faker.lorem.text(Math.ceil(Math.random * 500)),
    image: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: faker.internet.url(),
  },{
    name: faker.company.companyName(),
    userId: Math.ceil(Math.random() * 4),
    phoneNumber: faker.phone.phoneNumber(),
    details: faker.lorem.text(Math.ceil(Math.random * 500)),
    image: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: faker.internet.url(),
  },{
    name: faker.company.companyName(),
    userId: Math.ceil(Math.random() * 4),
    phoneNumber: faker.phone.phoneNumber(),
    details: faker.lorem.text(Math.ceil(Math.random * 500)),
    image: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: faker.internet.url(),
  },], {});
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
