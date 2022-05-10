'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActingGigTag = sequelize.define('ActingGigTag', {
    actingGigId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  ActingGigTag.associate = function(models) {
    // associations can be defined here
    ActingGigTag.belongsTo(models.ActingGig, {
      foreignKey: 'id'
    })

    ActingGigTag.belongsTo(models.Tag, {
      foreignKey: 'id'
    })
  };
  return ActingGigTag;
};
