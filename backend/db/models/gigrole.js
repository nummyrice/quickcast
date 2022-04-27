'use strict';

module.exports = (sequelize, DataTypes) => {
  const GigRole = sequelize.define('GigRole', {
    gigId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Male or Female'),
      allowNull: false,
    },
    ageRange: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  GigRole.associate = function(models) {
    // associations can be defined here
    GigRole.belongsTo(models.ActingGig, {
      foreignKey: 'gigId'
    });
  };

  GigRole.prototype.updateDetails = async function (gigId, title, description, gender, ageRange) {
    if (gigId) this.gigId = gigId;
    if (title) this.title = title;
    if (description) this.description = description;
    if (gender) this.gender = gender;
    if (ageRange) this.ageRange = ageRange;
    return await this.save();
  }

  return GigRole;
};
