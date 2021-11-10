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
      type: DataTypes.STRING,
      allowNull: false,
    },
    ageRange: {
      type: DataTypes.STRING,
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
  return GigRole;
};
