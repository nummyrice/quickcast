'use strict';
module.exports = (sequelize, DataTypes) => {
  const GigRole = sequelize.define('GigRole', {
    gigId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    gender: DataTypes.STRING,
    ageRange: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  GigRole.associate = function(models) {
    // associations can be defined here
  };
  return GigRole;
};