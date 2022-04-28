'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActorPortfolio = sequelize.define('ActorPortfolio', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    profilePhoto: {
      type: DataTypes.STRING,
    },
    website: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {});
  ActorPortfolio.associate = function(models) {
    // associations can be defined here
    ActorPortfolio.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };

  ActorPortfolio.prototype.updateDetails = async function (data) {
    if (data.userId) this.userId = data.userId;
    if (data.firstName) this.firstName = data.firstName;
    if (data.lastName) this.lastName = data.lastName;
    if (data.phoneNumber) this.phoneNumber = data.phoneNumber;
    if (data.dateOfBirth) this.dateOfBirth = data.dateOfBirth;
    if (data.biography) this.biography = data.biography;
    if (data.profilePhoto) this.profilePhoto = data.profilePhoto;
    if (data.website) this.website = data.website;
    if (data.location) this.location = data.location
    await this.save()
    return this;
  }

  return ActorPortfolio;
};
