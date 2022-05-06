'use strict';

module.exports = (sequelize, DataTypes) => {
  const ActingGig = sequelize.define('ActingGig', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rehearsalProductionDates: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    compensationDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gigType: {
      type: DataTypes.ENUM('Commercials', 'Theatre', 'Performing Arts', 'TV & Video', 'Voiceover', 'Stunts', 'Other'),
      allowNull: false,
      defaultValue: 'TV & Video'
    },
  },
   {});
  ActingGig.associate = function(models) {
    // associations can be defined here
    ActingGig.belongsTo(models.Company, {
      foreignKey: 'companyId',
    });
    ActingGig.hasMany(models.GigRole, {
      foreignKey: 'gigId',
      onDelete: 'cascade',
      hooks: true,
      as: 'gigRoles'
    });
    ActingGig.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    ActingGig.belongsToMany(models.Tag, {
      through: "ActingGigTag",
      as: 'tags',
      foreignKey: "actingGigId",
      onDelete: 'cascade',
      hooks: true
    })
    ActingGig.addScope('withTags', {
      include:[{
        model: models.Tag,
        as: 'tags',
        attributes: {
          include: ['name', 'id']
        }
      }]
    })

    ActingGig.addScope('userGigRoles', {
      attributes:{
        exclude:[
          'description',
          'rehearsalProductionDates',
          'compensationDetails',
          'location',
          'gigType',
          'createdAt',
          'updatedAt'
        ]
      },
      include:[{
        model: models.GigRole,
        as: 'gigRoles'
      }]
    })
    // get all gigs
      // get list of roles for each
    ActingGig.addScope('getAttachedRoles', {
      where: {

      },
      include:[{
        model: models.GigRole,
        as: 'gigRoles'
      }]
    })
  };

  ActingGig.prototype.updateDetails = async function (userId, companyId, title, description, rehearsalProductionDates, compensationDetails, location, gigType) {
    if (userId) this.userId = userId;
    if (companyId) this.companyId = companyId;
    if (title) this.title = title;
    if (description) this.description = description;
    if (rehearsalProductionDates) this.rehearsalProductionDates = rehearsalProductionDates;
    if (compensationDetails) this.compensationDetails = compensationDetails;
    if (location) this.location = location;
    if (gigType) this.gigType = gigType
    return await this.save();
  }
  return ActingGig;
};
