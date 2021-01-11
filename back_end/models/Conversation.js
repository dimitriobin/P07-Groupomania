'use strict'
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
      // Model attributes are defined here
      users: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      freezeTableName: true
    });

    Conversation.associate = models => {
      Conversation.hasMany(models.Message, {foreignKey: {name: 'conversationId', allowNull: false}});
    };

  return Conversation;
};