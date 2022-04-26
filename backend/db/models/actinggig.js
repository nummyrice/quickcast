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
      type: DataTypes.ENUM(DataTypes.TEXT),
      allowNull: false,
    },
    tagIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
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
  };
  return ActingGig;
};
