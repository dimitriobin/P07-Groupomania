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
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    image_url: {
      type: DataTypes.STRING
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true
        }
    },
    parentEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        is: ['^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$']
      }
    },
    restricted: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    shareWithPartners: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contactable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  User.associate = models => {
    User.hasMany(models.Post, {foreignKey: {name: 'user_id', allowNull: false}});
    User.hasMany(models.Comment, {foreignKey: {name: 'user_id', allowNull: false}});
    User.belongsToMany(models.Subject, {through: 'subjectFollows'});
  }


  
  return User;
};