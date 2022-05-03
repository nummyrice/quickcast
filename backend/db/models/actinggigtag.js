'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActingGigTag = sequelize.define('ActingGigTag', {
    actingGigId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  ActingGigTag.associate = function(models) {
    // associations can be defined here
  };
  return ActingGigTag;
};
