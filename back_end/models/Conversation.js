'use strict'
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
      // Model attributes are defined here
    }, {
      freezeTableName: true
    });

    Conversation.associate = models => {
      Conversation.hasMany(models.Message, {foreignKey: {name: 'conversationId', allowNull: false}});
      Conversation.belongsTo(models.User, { as: 'userOne', foreignKey: {name: 'userOneId', allowNull: false}});
      Conversation.belongsTo(models.User, { as: 'userTwo', foreignKey: {name: 'userTwoId', allowNull: false}});
    };

  return Conversation;
};