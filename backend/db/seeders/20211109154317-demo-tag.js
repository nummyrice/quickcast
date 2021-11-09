'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Tags', [{
     name: 'paid'
   },{
    name: 'unpaid'
  },{
    name: 'villain'
  },{
    name: 'with-animals'
  },{
    name: 'western'
  },{
    name: 'comedy'
  },{
    name: 'food'
  },{
    name: 'animals'
  },{
    name: 'artistic'
  },{
    name: 'urban'
  },{
    name: 'country'
  },{
    name: 'alcohol'
  },{
    name: 'smoking'
  },{
    name: 'costume'
  },{
    name: 'makeover'
  },{
    name: 'aquatic'
  },{
    name: 'mermaid'
  },{
    name: 'stunt'
  },{
    name: 'contract'
  },{
    name: 'cute'
  },{
    name: 'cool'
  },{
    name: 'stud'
  },{
    name: 'body-building'
  },{
    name: 'muscle'
  },{
    name: 'cold-audition'
  },{
    name: 'monologue'
  },{
    name: 'working-with-kids'
  },{
    name: 'british-accent'
  },{
    name: 'australian-accent'
  },{
    name: 'middle-eastern'
  },{
    name: 'red-hair'
  },{
    name: 'blond'
  },{
    name: 'blac-hair'
  },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tags', null, {});
  }
};
