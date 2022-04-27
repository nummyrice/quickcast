'use strict';

const company = require("./company");

module.exports = (sequelize, DataTypes) => {
  const ActingGig = sequelize.define('ActingGig', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rehearsalProductionDates: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    compensationDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gigType: {
      type: DataTypes.ENUM('Commercials', 'Theatre', 'Performing Arts', 'TV & Video', 'Voiceover', 'Stunts', 'Other'),
      allowNull: false,
      defaultValue: 'TV & Video'
    },
  }, {});
  ActingGig.associate = function(models) {
    // associations can be defined here
    ActingGig.belongsTo(models.Company, {
      foreignKey: 'companyId',
    });
    ActingGig.hasMany(models.GigRole, {
      foreignKey: 'gigId',
      onDelete: 'cascade',
      hooks: true,
    });
    ActingGig.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    ActingGig.belongsToMany(models.Tag, {
      through: "ActingGigTag",
      as: 'tags',
      foreignKey: "actingGigId"
    })
  };
  return ActingGig;
};
