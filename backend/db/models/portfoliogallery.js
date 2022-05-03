'use strict';
module.exports = (sequelize, DataTypes) => {
  const PortfolioGallery = sequelize.define('PortfolioGallery', {
    userId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  PortfolioGallery.associate = function(models) {
    // associations can be defined here
    PortfolioGallery.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };

  PortfolioGallery.prototype.updateDetails = async function (data) {
    if (data.userId) this.userId = data.userId;
    if (data.title) this.title = data.title;
    if (data.photoUrl) this.photoUrl = data.photoUrl;
    if (data.order) this.order = data.order;
    await this.save;
    return this;
  }
  return PortfolioGallery;
};
