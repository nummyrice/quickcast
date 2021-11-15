'use strict';
const faker = require('faker');
const gigType = ['Film', 'Theatre', 'TV & Video', 'Commercials', 'Modeling', 'Performing Arts', 'Voiceover', 'Other'];
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('ActingGigs', [{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
     userId: Math.ceil(Math.random() * 4),
     companyId: Math.ceil(Math.random() * 6),
     title: faker.name.title(),
     description: faker.lorem.text(Math.ceil(Math.random * 500)),
     rehearsalProductionDates: [faker.date.soon()],
     compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
     location: faker.address.zipCode(),
     gigType: gigType[Math.ceil(Math.random() * 7)],

   },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },{
    userId: Math.ceil(Math.random() * 4),
    companyId: Math.ceil(Math.random() * 6),
    title: faker.name.title(),
    description: faker.lorem.text(Math.ceil(Math.random * 500)),
    rehearsalProductionDates: [faker.date.soon()],
    compensationDetails: faker.lorem.text(Math.ceil(Math.random * 500)),
    location: faker.address.zipCode(),
    gigType: gigType[Math.ceil(Math.random() * 7)],

  },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('ActingGigs', null, {});
  }
};
