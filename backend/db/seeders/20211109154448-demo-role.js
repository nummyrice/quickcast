'use strict';
const { faker } = require('@faker-js/faker');
const genderSelect = ['Male', 'Female', 'Male or Female'];
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
    const roles = Array(48).fill(0).map((role, i) => {
      return {
        gigId: Math.ceil(Math.random() * 11),
        title: faker.name.jobTitle(),
        gender: genderSelect[Math.floor(Math.random() * 3)],
        ageRange: [Math.ceil(Math.random() * (100 - 18)) + 18, Math.ceil(Math.random() * (100 - 18)) + 18],
        description: faker.lorem.text(100),
      }
    })
   return queryInterface.bulkInsert('GigRoles', roles, {});
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
