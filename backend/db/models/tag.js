'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.ActingGig, {
      through: "ActingGigTag",
      as: "actingGigs",
      foreignKey: "tagId"
    })
  };

  // Tag.tagExists = async function () => {
  //   const tagExists = await Tag.query()
  // }
  return Tag;
};
