'use strict'
// const bcrypt = require('bcrypt');

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
        notEmpty: true,
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
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
        isEmail: true
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
    freezeTableName: true,
    validate: {
      isUserMinor() {
        const age = ( ( Date.now() - Date.parse(this.birthdate) ) / 31536000000 );
        if ( age < 18 && !this.parentEmail ) {
          throw new Error('Si vous êtes mineur, vous devez fournir l\'email de vos responsables.');
        }
      }
    }
  });

  User.associate = models => {
    User.hasMany(models.Post, {foreignKey: {name: 'user_id', allowNull: false}});
    User.hasMany(models.Comment, {foreignKey: {name: 'user_id', allowNull: false}});
    User.belongsToMany(models.Subject, {through: models.SubjectFollows});
    User.hasMany(models.SubjectFollows, {foreignKey: {name: 'UserId', allowNull: false}});
    User.belongsToMany(models.Post, {through: models.Like});
    User.hasMany(models.Like, {foreignKey: {name: 'UserId', allowNull: false}});
    User.hasMany(models.Message);
    User.belongsToMany(models.Conversation, {through: models.Participant});
    User.hasMany(models.Participant);
  }

  
  // User.create({
  //     user_name: process.env.ANONYME_NAME,
  //     email: process.env.ANONYME_EMAIL,
  //     birthdate: '1970-01-01',
  //     password: bcrypt.hashSync(process.env.ANONYME_PASSWORD, 10)
  //   })
  //   .then(() => console.log('created'))
  
  return User;
};