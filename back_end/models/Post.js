'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
      // Model attributes are defined here
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image_url: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      }
    }, {
      freezeTableName: true
    });

    Post.associate = models => {
      Post.belongsTo(models.User, {foreignKey: {name: 'user_id', allowNull: false}});
      Post.belongsTo(models.Subject, {foreignKey: {name: 'subject_id', allowNull: false}});
      Post.hasMany(models.Comment, {foreignKey: {name: 'post_id', allowNull: false}});
      Post.belongsToMany(models.User, {through: models.Like});
      Post.hasMany(models.Like, {foreignKey: {name: 'PostId', allowNull: false}});
    };

  return Post;
};