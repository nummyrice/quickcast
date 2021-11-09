'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('ActorPortfolios', [{
     userId: 4,
     firstName: faker.name.firstName(),
     lastName: faker.name.lastName(),
     age: Math.ceil(Math.random() * (100 - 18) + 18),
     phoneNumber: faker.phone.phoneNumber(),
     dateOfBirth: faker.date.past(),
     biography: faker.lorem.text(Math.ceil(Math.random(500))),
     profilePhoto: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
     website: 'https://cloudinary.com/documentation/node_integration',
     location: faker.address.zipCode(),
   },{
    userId: 3,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.ceil(Math.random() * (100 - 18) + 18),
    phoneNumber: faker.phone.phoneNumber(),
    dateOfBirth: faker.date.past(),
    biography: faker.lorem.text(Math.ceil(Math.random(500))),
    profilePhoto: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: 'https://cloudinary.com/documentation/node_integration',
    location: faker.address.zipCode(),
  },{
    userId: 2,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.ceil(Math.random() * (100 - 18) + 18),
    phoneNumber: faker.phone.phoneNumber(),
    dateOfBirth: faker.date.past(),
    biography: faker.lorem.text(Math.ceil(Math.random(500))),
    profilePhoto: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: 'https://cloudinary.com/documentation/node_integration',
    location: faker.address.zipCode(),
  },{
    userId: 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.ceil(Math.random() * (100 - 18) + 18),
    phoneNumber: faker.phone.phoneNumber(),
    dateOfBirth: faker.date.past(),
    biography: faker.lorem.text(Math.ceil(Math.random(500))),
    profilePhoto: 'https://res.cloudinary.com/quickcast/image/upload/v1636418399/sample.jpg',
    website: 'https://cloudinary.com/documentation/node_integration',
    location: faker.address.zipCode(),
  },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('PeopActorPortfoliosle', null, {});
  }
};
