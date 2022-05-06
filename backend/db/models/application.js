'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    applicantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
    Application.belongsTo(models.User, {
      foreignKey: 'id'
    })

    Application.belongsTo(models.Company, {
      foreignKey: 'id'
    })

    Application.belongsTo(models.GigRole, {
      foreignKey: 'id',
      as: 'roleDetails'
    })

    Application.addScope('withRoleDetails', {
      include: [{
        model: models.GigRole,
        as: 'roleDetails'
      }]
    })
  };
  return Application;
};
