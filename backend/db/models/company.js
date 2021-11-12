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
      allowNull: false,
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
  return Company;
};
