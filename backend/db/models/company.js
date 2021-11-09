'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    userId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    details: DataTypes.TEXT,
    image: DataTypes.STRING,
    website: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};