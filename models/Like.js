'use strict'
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
      // Model attributes are defined here
    }, {
      freezeTableName: true
    });

    Like.associate = models => {
      Like.belongsTo(models.User, {foreignKey: {name: 'UserId', allowNull: false}});
      Like.belongsTo(models.Post, {foreignKey: {name: 'PostId', allowNull: false}});
    };

  return Like;
};