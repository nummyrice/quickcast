'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
    },
    image:{
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    }
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    Company.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Company.hasMany(models.ActingGig, {
      foreignKey: 'companyId',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  Company.prototype.updateDetails = async function (name, phoneNumber, details, website, imageUrl) {
    if (name) this.name = name;
    if (phoneNumber) this.phoneNumber = phoneNumber;
    if (details) this.details = details;
    if (website) this.website = website;
    if (imageUrl.companyPhoto) this.image = imageUrl.companyPhoto;
    return await this.save();
  }
  return Company;
};
