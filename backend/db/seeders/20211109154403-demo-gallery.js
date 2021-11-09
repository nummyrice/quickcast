'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkInsert('PortfolioGalleries', [{
       userId: 1,
       title: 'test',
       photoUrl: 'test',
       order: 1,
     }, {
      userId: 1,
      title: 'test',
      photoUrl: 'test',
      order: 2,
    },{
      userId: 1,
      title: 'test',
      photoUrl: 'test',
      order: 3,
    },{
      userId: 1,
      title: 'test',
      photoUrl: 'test',
      order: 4,
    },{
      userId: 2,
      title: 'test',
      photoUrl: 'test',
      order: 1,
    },{
      userId: 2,
      title: 'test',
      photoUrl: 'test',
      order: 2,
    },{
      userId: 3,
      title: 'test',
      photoUrl: 'test',
      order: 1,
    },{
      userId: 3,
      title: 'test',
      photoUrl: 'test',
      order: 2,
    },{
      userId: 4,
      title: 'test',
      photoUrl: 'test',
      order: 1,
    },], {});
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
