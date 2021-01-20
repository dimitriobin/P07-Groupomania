'use strict'
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
      // Model attributes are defined here
      users: {
        type: DataTypes.STRING,
        allowNull: false,
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