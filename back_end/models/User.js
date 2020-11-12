'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Model attributes are defined here
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    freezeTableName: true
  });

  User.associate = models => {
    User.hasMany(models.Post, {foreignKey: {name: 'user_id', allowNull: false}});
    User.hasMany(models.Comment, {foreignKey: {name: 'user_id', allowNull: false}});
  }
  
  return User;
};