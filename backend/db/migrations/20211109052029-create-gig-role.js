'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GigRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gigId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ActingGigs',
          key: 'id',
        },
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Male or Female'),
        allowNull: false,
      },
      ageRange: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT(),
        allowNull: false,
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
    return queryInterface.dropTable('GigRoles');
  }
};
