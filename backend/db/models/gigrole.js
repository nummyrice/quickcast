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
      foreignKey: 'gigId',
      as: 'gig'
    });

    GigRole.hasMany(models.Application, {
      foreignKey: 'roleId',
      as: 'applicants',
      onDelete: 'cascade',
      hooks: true
    })

    GigRole.addScope('includeApplicants', {
      include: [{
        model: models.Application,
        as: 'applicants'
      }]
    })

    GigRole.addScope('includeApplicantIds', {
      include:[ {
        model: models.Application,
        as: 'applicants',
        attributes: {
          exclude: [
            'id',
            'companyId',
            'status',
            'createdAt',
            'updatedAt',
            'roleId'
          ]
        }
      },
      {
        model: models.ActingGig,
        as: 'gig',
        attributes: {
          exclude: [
            'id',
            'userId',
            'title',
            'description',
            'rehearsalProductionDates',
            'compensationDetails',
            'location',
            'gigType',
            'createdAt',
            'updatedAt'
          ]
        }
      }]
    })
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
