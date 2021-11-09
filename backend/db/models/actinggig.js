'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActingGig = sequelize.define('ActingGig', {
    userId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    rehearsalProductionDates: DataTypes.TEXT,
    compensationDetails: DataTypes.TEXT,
    location: DataTypes.TEXT,
    gigType: DataTypes.STRING,
    tagIds: DataTypes.INTEGER
  }, {});
  ActingGig.associate = function(models) {
    // associations can be defined here
  };
  return ActingGig;
};