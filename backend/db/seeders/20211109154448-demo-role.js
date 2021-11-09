'use strict';
const faker = require('faker');
const genderSelect = ['Male', 'Female', 'Male or Female'];
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */

   return queryInterface.bulkInsert('GigRoles', [{
     gigId: Math.ceil(Math.random() * 11),
     title: faker.name.title(),
     gender: genderSelect[Math.floor(Math.random() * 3)],
     ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
     description: faker.lorem.text(Math.ceil(Math.random() * 100)),
   },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },{
    gigId: Math.ceil(Math.random() * 11),
    title: faker.name.title(),
    gender: genderSelect[Math.floor(Math.random() * 3)],
    ageRange: [Math.ceil(Math.random() * (100 - 18) - 18), Math.ceil(Math.random() * (100 - 18) - 18)],
    description: faker.lorem.text(Math.ceil(Math.random() * 100)),
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('GigRoles', null, {});
  }
};
