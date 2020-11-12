'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    // Model attributes are defined here
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    freezeTableName: true
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, {foreignKey: {name: 'user_id', allowNull: false}});
    Comment.belongsTo(models.Subject, {foreignKey: {name: 'subject_id', allowNull: false}});
    Comment.belongsTo(models.Post, {foreignKey: {name: 'post_id', allowNull: false}});
  };

  return Comment;
};