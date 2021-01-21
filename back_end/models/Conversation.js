'use strict'
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
      // Model attributes are defined here
      users: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^\[(((['"]\d+['"]|\d+), {0,1})*)(['"]\d+['"]|\d+)]$/i,
        }
      },
    }, {
      freezeTableName: true
    });

    Conversation.associate = models => {
      Conversation.hasMany(models.Message);
      Conversation.belongsToMany(models.User, {through: models.Participant});
      Conversation.hasMany(models.Participant);
    };

  return Conversation;
};