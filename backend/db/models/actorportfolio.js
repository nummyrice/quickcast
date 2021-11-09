'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActorPortfolio = sequelize.define('ActorPortfolio', {
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    biography: DataTypes.TEXT,
    profilePhoto: DataTypes.STRING,
    portfolioGalleryId: DataTypes.INTEGER,
    website: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  ActorPortfolio.associate = function(models) {
    // associations can be defined here
  };
  return ActorPortfolio;
};