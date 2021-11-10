'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ActingGigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id'
        },
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT(2000),
        allowNull: false,
      },
      rehearsalProductionDates: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      compensationDetails: {
        type: Sequelize.TEXT(500),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      gigType: {
        type: Sequelize.ENUM('Film', 'Theatre', 'TV & Video', 'Commercials', 'Modeling', 'Performing Arts', 'Voiceover', 'Other'),
        allowNull: false,
      },
      tagIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ActingGigs');
  }
};
