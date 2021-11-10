'use strict';
module.exports = (sequelize, DataTypes) => {
  const PortfolioGallery = sequelize.define('PortfolioGallery', {
    title: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {});
  PortfolioGallery.associate = function(models) {
    // associations can be defined here
  };
  return PortfolioGallery;
};