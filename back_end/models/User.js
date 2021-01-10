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
        allowNull: false,
        validate: {
          isDate: true
        }
    },
    parentEmail: {
      type: DataTypes.STRING,
      validate: {
        isUserMinor(value) {
          const age = ( ( Date.now() - Date.parse(this.birthdate) ) / 31536000000 );
          if ( age < 18 && !value ) {
            throw new Error('Si vous êtes mineur, vous devez fournir l\'email de vos responsables.');
          }
        }
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
    User.belongsToMany(models.Post, {through: models.Like});
    User.hasMany(models.Like, {foreignKey: {name: 'UserId', allowNull: false}});
    User.hasMany(models.Message, {foreignKey: {name: 'userId', allowNull: false}});
    User.hasMany(models.Conversation, { as: 'userOne', foreignKey: {name: 'userOneId', allowNull: false}});
    User.hasMany(models.Conversation, { as: 'userTwo', foreignKey: {name: 'userTwoId', allowNull: false}});
  }


  
  return User;
};